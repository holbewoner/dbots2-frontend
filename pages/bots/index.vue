<template>
    <v-container fluid>
        <v-layout row wrap class="bot-list">
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <v-alert v-if="error" color="error" icon="warning" transition="scale-transition" v-model="error" v-text="error"></v-alert>
                <v-card>
                    <v-toolbar color="secondary">
                        <v-text-field hide-details single-line prepend-icon="search" v-model="search" :error="!!error" @input="debounceSearch()"></v-text-field>
                        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
                        <v-btn icon :disabled="loading" @click="debounceSearch()">
                            <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
                            <v-icon v-else>arrow_forward</v-icon>
                        </v-btn>
                        <v-btn v-if="refreshable" icon @click="debounceSearch()">
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
                                        <v-select prepend-icon="sort" label="Sort" :items="sortList" v-model="sort" multiple single-line bottom @input="debounceSearch()"></v-select>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-select prepend-icon="label_outline" label="Tags" :items="tagList" v-model="tags" multiple single-line bottom chips @input="debounceSearch()">
                                            <template slot="selection" slot-scope="selectedData">
                                                <v-chip close @input="selectedData.parent.selectItem(selectedData.item)" :selected="selectedData.selected" class="chip--select-multi" :key="selectedData.item.name">
                                                    <v-icon>{{ selectedData.item.icon }}</v-icon>
                                                    {{ selectedData.item.text }}
                                                </v-chip>
                                            </template>
                                            <template slot="item" slot-scope="itemData">
                                                <template>
                                                    <v-list-tile-avatar><v-icon>{{ itemData.item.icon }}</v-icon></v-list-tile-avatar>
                                                    <v-list-tile-content>{{ itemData.item.text }}</v-list-tile-content>
                                                </template>
                                            </template>
                                        </v-select>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-select prepend-icon="library_books" label="Library" :items="libraryList" v-model="library" single-line bottom auto clearable autocomplete @input="debounceSearch()"></v-select>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </v-menu>
                    </v-toolbar>
                </v-card>
            </v-flex>
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <v-card>
                    <section>
                        <bot-list-short :bots="bots" />
                    </section>
                </v-card>
            </v-flex>
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <v-card>
                    <v-card-text class="text-xs-center">
                        <v-pagination :length="totalPages" v-model="page" @input="searchBots(true)"></v-pagination>
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

// TODO: these tags should be moved into a separate component
const TAG_LIST = [
    { icon: "casino", text: "Fun", value: "fun" },
    { icon: "videogame_asset", text: "Games", value: "games" },
    { icon: "security", text: "Moderation", value: "moderation" },
    { icon: "music_note", text: "Music", value: "music" },
    { icon: "build", text: "Utility", value: "utility" },
    { icon: "bug_report", text: "Testing", value: "testing" }
]
const LIBRARY_LIST = "disco discord-rs discord.io discord.js Discord.Net discord.py Discord4J discordcr DiscordGo Discordia Discordie discordrb DSharpPlus Eris Javacord JDA Nostrum RestCord serenity SwiftDiscord Sword Custom".split(" ")

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
            if(this.tags && this.sort.length > 0) {
                query.tags = this.tags.join(",")
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

            // library: params.library || "",
            // limit: +params.limit || 20,
            // page: +params.page || 1,
            // search: params.search || "",
            // sort: params.sort ? params.sort.split(",") : [],
            // tags: params.tags ? params.tags.split(",") : [],
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
            tagList: TAG_LIST,
            libraryList: LIBRARY_LIST
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
            data.tags = query.tags.split(",")
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
