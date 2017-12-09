<template>
    <v-container fluid>
        <!-- <v-layout row>
            <v-flex xs12 class="text-xs-center">
                <h2 class="display-3">Discord Bots</h2>
                <p class="headline">Probably the neatest list of bots you&rsquo;ve seen.</p>
            </v-flex>
        </v-layout> -->
        <v-layout row wrap class="bot-lists">
            <v-flex xs12 class="mb-3 mx-1 elevation-4">
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>
                            Discover bots for <v-btn outline :to="'/bots/?tags='+randomTag.value">{{ randomTag.text }}</v-btn>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="refreshRandomTag()" :disabled="loadingRandomTag">
                            <v-progress-circular v-if="loadingRandomTag" indeterminate></v-progress-circular>
                            <v-icon v-else>refresh</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-container fluid>
                        <v-layout row wrap>
                            <v-flex xs12 md4 v-for="bot in randomTaggedBots" :key="bot.id" class="px-1">
                                <v-card color="blue darken-2" class="elevation-4" dense>
                                    <v-card-title class="px-3 py-2">
                                        <h3 class="headline">{{ bot.name }}</h3>
                                        <v-spacer></v-spacer>
                                        <v-avatar v-if="bot.icon" size="64px">
                                            <img class="elevation-4" :src="'https://cdn.discordapp.com/app-icons/'+bot.id+'/'+bot.icon+'.jpg'" @error.once="onAvatarLoadError" />
                                        </v-avatar>
                                    </v-card-title>
                                    <v-card-text class="px-3 py-2">
                                        <span>{{ bot.tagline }}</span>
                                    </v-card-text>
                                    <v-card-actions class="px-3 py-2">
                                        <v-btn flat :to="'/bots/'+bot.id">View</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex xs12 class="mb-3 mx-1 elevation-4">
                <bot-list-grid :bots="featuredBots" title="Featured Bots" />
            </v-flex>
            <v-flex xs12 md6 class="mb-3">
                <bot-list-short class="mx-1" :bots="newestBots" title="Newest Bots" />
            </v-flex>
            <v-flex xs12 md6 class="mb-3">
                <bot-list-short class="mx-1" :bots="rankedBots" title="Most Popular Bots" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import BotListGrid from '~/components/bot-list-grid.vue'
import BotListShort from '~/components/bot-list-short.vue'
import { Tags } from '~/data/lists.js'

export default {
    async asyncData({ params }) {
        const limit = 4;

        var randomTag = Tags[Math.floor(Math.random() * Tags.length)]

        let allBots = await Promise.all([
            axios.get(`/bots?sort=-date&limit=${limit}`),
            axios.get(`/bots?sort=-rating&limit=${limit}`),
            axios.get(`/bots?featured=false&sort=random&tags=${randomTag.value}&limit=3`),
            axios.get(`/bots?featured=true&sort=random&limit=3`),
            // axios.get(`/bots?sponsored=true&limit=${limit}`)
        ]);

        return {
            newestBots: allBots[0].data,
            rankedBots: allBots[1].data,
            randomTaggedBots: allBots[2].data,
            featuredBots: allBots[3].data,
            // sponsoredBots: allBots[4].data,

            randomTag: randomTag,
            loadingRandomTag: false
        }
    },
    methods: {
        onAvatarLoadError(event) {
            event.target.src = "/defaulticon.jpg"
            event.target.style = `background-color:#f00;transform:rotate(${~~(Math.random() * 360)}deg)`
        },
        refreshRandomTag() {
            this.randomTag = Tags[Math.floor(Math.random() * Tags.length)]
            this.loadingRandomTag = true
            axios.get(`/bots?featured=false&sort=random&tags=${this.randomTag.value}&limit=3`).then((res) => {
                this.loadingRandomTag = false
                this.randomTaggedBots = res.data
            })
        }
    },
    components: {
        BotListGrid,
        BotListShort
    }
}
</script>

<style scoped>
@media (min-width: 1904px) {
    .bot-lists .flex.xl6 {
        padding-right: 1rem;
    }
}
.carousel {
    height: auto;
}
</style>
