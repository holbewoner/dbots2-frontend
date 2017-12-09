<template>
    <v-container fluid>
        <v-layout row wrap class="bot-list">
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <v-card>
                    <v-toolbar class="elevation-6" color="secondary" dense>
                        <v-text-field hide-details single-line prepend-icon="search" placeholder="Text" v-model="search" :error="!!error" @input="debounceSearch"></v-text-field>
                        <v-btn icon :disabled="loading" @click="debounceSearch">
                            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
                            <v-icon v-else>arrow_forward</v-icon>
                        </v-btn>
                        <v-btn v-if="refreshable" icon @click="debounceSearch">
                            <v-icon>refresh</v-icon>
                        </v-btn>
                        <v-menu offset-x left origin="top right" :close-on-content-click="false" :nudge-width="250">
                            <v-btn icon slot="activator">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                            <v-card>
                                <v-card-title>
                                    <p class="title">Filters</p>
                                </v-card-title>
                                <v-list>
                                    <v-list-tile>
                                        <v-select prepend-icon="sort" label="Sort" :items="sortList" v-model="sort" multiple single-line bottom @input="debounceSearch"></v-select>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-select prepend-icon="library_books" label="Library" :items="libraryList" v-model="library" single-line bottom auto clearable autocomplete @input="debounceSearch"></v-select>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </v-menu>
                    </v-toolbar>
                    <div class="px-3">
                        <v-select prepend-icon="label" placeholder="Tags" :items="tagList" v-model="tags" @input="debounceSearch" autocomplete clearable chips deletable-chips dense :filter="filterTags" multi-line multiple return-object>
                            <template slot="selection" slot-scope="selectedData">
                                <v-chip class="chip--select-multi" close :selected="selectedData.selected" @input="selectedData.parent.selectItem(selectedData.item)" :key="selectedData.item.value || selectedData.item">
                                    <template>
                                        <v-avatar v-if="selectedData.item.icon">
                                            <v-icon>{{ selectedData.item.icon }}</v-icon>
                                        </v-avatar>
                                        {{ selectedData.item.text }}
                                    </template>
                                </v-chip>
                            </template>
                            <template slot="item" slot-scope="itemData">
                                <template>
                                    <v-list-tile-avatar>
                                        <v-icon v-if="itemData.item.icon">{{ itemData.item.icon }}</v-icon>
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="genTagListItemDataText(itemData)"></v-list-tile-title>
                                    </v-list-tile-content>
                                </template>
                            </template>
                        </v-select>
                    </div>
                </v-card>
                <v-alert v-if="error" color="error" icon="warning" transition="scale-transition" v-model="error" v-text="error"></v-alert>
            </v-flex>
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <bot-list-short :bots="bots" />
            </v-flex>
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <v-card>
                    <v-card-text class="text-xs-center">
                        <v-pagination :length="totalPages" v-model="page" @input="searchBots(true)" class="mb-3"></v-pagination>
                        <p>{{ totalBots }} results</p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Axios from 'axios'
import axios from '~/plugins/axios'
import BotListShort from '~/components/bot-list-short.vue'
import { Libraries, Tags } from '~/data/lists.js'

const defaultQuery = {
    limit: 20,
    page: 1
}

export default {
    computed: {
        refreshable() {
            return this.sort && !!~this.sort.indexOf("random")
        },
        totalPages() {
            return Math.max(Math.ceil(this.totalBots / this.limit), 1)
        }
    },
    methods: {
        buildQuery() {
            var query = {}
            if(this.library) {
                query.library = this.library
            }
            if(this.limit && this.limit !== defaultQuery.limit) {
                query.limit = this.limit
            }
            if(this.page && this.page !== defaultQuery.page) {
                query.page = this.page
            }
            if(this.search) {
                query.search = this.search
            }
            if(this.sort && this.sort.length > 0) {
                query.sort = this.sort.join(",")
            }
            if(this.tags && this.tags.length > 0) {
                query.tags = this.tags.filter((tag) => tag.value)
                    .map((tag) => (tag.value || tag)).join(",")
            }
            return query
        },
        debounceSearch() {
            if(this.inputDebounce) {
                clearTimeout(this.inputDebounce)
                this.inputDebounce = null
            }
            this.inputDebounce = setTimeout(() => this.searchBots(), 250)
        },
        filterTags(item, queryText, itemText) {
            if(!queryText) {
                return true
            }

            const text = (itemText || "").toString().toLowerCase()
            const query = (queryText || "").toString().toLowerCase()

            return !!~text.indexOf(query)
        },
        genTagListItemDataText(itemData) {
            return itemData.parent.genFiltered(itemData.item.text)
        },
        searchBots(force) {
            if(this.cancelSource) {
                console.log("Cancelling existing search")
                this.cancelSource.cancel("Searching again")
            }

            this.cancelSource = Axios.CancelToken.source();

            this.loading = true
            var query = this.buildQuery()
            axios.get(`/bots`, {
                params: query,
                cancelToken: this.cancelSource.token
            }).then((res) => {
                this.cancelSource = null
                this.error = null
                this.bots = res.data

                this.totalBots = +res.headers["x-total"] || 0
                this.loading = false

                // Bug in nuxt.js <= 1.0-rc11
                // Updating the route query will force-refresh asyncData()
                // This breaks things like pagination on /bots
                // https://github.com/nuxt/nuxt.js/issues/1255
                // TODO uncomment at next nuxt release
                // this.$router.push({
                //     query: query
                // })
            }).catch((err) => {
                this.cancelSource = null
                if(Axios.isCancel(err)) {
                    return
                }

                console.log(err && err.response && err.response.data || err)
                if(err.response && err.response.data && err.response.data.error) {
                    if(Array.isArray(err.response.data.error)) {
                        this.error = err.response.data.error.join(", ")
                    } else {
                        this.error = err.response.data.error
                    }
                } else {
                    this.error = "Unknown API error"
                }
                this.loading = false
            })
        }
    },
    data() {
        return {
            bots: null,
            error: null,
            loading: true,

            cancelSource: null,
            inputDebounce: setTimeout(() => this.loading = false, 1000),

            library: "",
            limit: 20,
            page: 1,
            search: "",
            sort: [],
            tags: [],

            totalBots: 0,

            sortList: [
                { text: "Date (newest)", value: "-date" },
                { text: "Date (oldest)", value: "date" },
                { text: "Name (A-Z)", value: "name" },
                { text: "Name (Z-A)", value: "-name" },
                { text: "Rating (highest)", value: "-rating" },
                { text: "Rating (lowest)", value: "rating" },
                { text: "Random", value: "random" }
            ],

            libraryList: Libraries,
            tagList: Tags
        }
    },
    async asyncData({ query }) {
        let res = await axios.get(`/bots`, {
            params: {
                library: query.library || undefined,
                limit: query.limit || undefined,
                page: query.page || undefined,
                search: query.search || undefined,
                sort: query.sort || undefined,
                tags: query.tags || undefined
            }
        })

        var data = {
            bots: res.data,

            totalBots: +res.headers["x-total"] || 0
        }
        if(query.library) {
            data.library = query.library
        }
        if(+query.limit) {
            data.limit = +query.limit
        }
        if(+query.page) {
            data.page = +query.page
        }
        if(query.search) {
            data.search = query.search
        }
        if(query.sort) {
            data.sort = query.sort.split(",")
        }
        if(query.tags) {
            data.tags = data.tags.concat(query.tags.split(",")
                .map((tagValue) => Tags.find((item) => item.value === tagValue))
                .filter((tag) => !!tag))
        }
        return data
    },
    components: {
        BotListShort
    }
}
</script>

<style scoped>
.bot-list section {
    margin-bottom: 1rem;
}
</style>
