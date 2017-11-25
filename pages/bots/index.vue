<template>
    <v-container fluid>
        <v-layout row wrap class="bot-list">
            <v-flex x16 xs12 md10 offset-md1 class="mb-3">
                <v-alert v-if="error" color="error" icon="warning" transition="scale-transition" v-model="error" v-text="error"></v-alert>
                <v-card>
                    <v-toolbar dark>
                        <v-text-field dark hide-details single-line prepend-icon="search" v-model="search" :error="!!error" @input="debounceSearch()"></v-text-field>
                        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
                        <v-btn icon :disabled="!!loading" @click="debounceSearch()">
                            <v-progress-circular v-if="loading > 1" indeterminate color="primary"></v-progress-circular>
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
                                            <template slot="selection" scope="selectedData">
                                                <v-chip close @input="selectedData.parent.selectItem(selectedData.item)" :selected="selectedData.selected" class="chip--select-multi" :key="selectedData.item.name">
                                                    <v-icon>{{ selectedData.item.icon }}</v-icon>
                                                    {{ selectedData.item.text }}
                                                </v-chip>
                                            </template>
                                            <template slot="item" scope="itemData">
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
            <v-flex x16 xs12 md10 offset-md1 class="mb-3">
                <v-card>
                <section>
                    <bot-list-short :bots="bots" />
                </section>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
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

export default {
    computed: {
        refreshable() {
            return this.sort && !!~this.sort.indexOf("random")
        }
    },
    methods: {
        debounceSearch() {
            if(this.inputDebounce) {
                clearTimeout(this.inputDebounce)
                this.inputDebounce = null
            }
            this.inputDebounce = setTimeout(() => this.searchBots(), 250)
        },
        searchBots() {
            if(this.loading) {
                return
            }

            var id = Date.now() + Math.random()
            this.loading = id
            axios.get(`/bots`, {
                params: {
                    library: this.library,
                    limit: this.limit,
                    page: this.page,
                    search: this.search,
                    sort: this.sort.join(","),
                    tags: this.tags.join(",")
                }
            }).then((res) => {
                this.error = null
                this.bots = res.data
            }).catch((err) => {
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
            }).then(() => {
                if(this.loading === id) {
                    this.loading = false
                }
            })
        }
    },
    data() {
        return {
            bots: null,
            error: null,
            loading: true,

            inputDebounce: setTimeout(() => this.loading = false, 1000),

            library: "",
            limit: 20,
            page: 1,
            search: "",
            sort: [],
            tags: [],

            sortList: [
                { text: "Date (newest)", value: "date" },
                { text: "Date (oldest)", value: "-date" },
                { text: "Name (A-Z)", value: "name" },
                { text: "Name (Z-A)", value: "-name" },
                { text: "Rating (highest)", value: "-rating" },
                { text: "Rating (lowest)", value: "rating" },
                { text: "Random", value: "random" }
            ],
            tagList: TAG_LIST,
            libraryList: "disco discord-rs discord.io discord.js Discord.Net discord.py Discord4J discordcr DiscordGo Discordia Discordie discordrb DSharpPlus Eris Javacord JDA Nostrum RestCord serenity SwiftDiscord Sword Custom".split(" ")
        }
    },
    async asyncData({ params }) {
        let {data: bots} = await axios.get(`/bots`, {
            params: {
                library: params.library,
                limit: params.limit,
                page: params.page,
                search: params.search,
                sort: params.sort,
                tags: params.tags
            }
        })

        return {
            bots: bots
        }
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
