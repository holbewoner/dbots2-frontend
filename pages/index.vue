<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12 class="text-xs-center">
                <h2 class="display-3">Discord Bots</h2>
                <p class="headline">Probably the neatest list of bots you&rsquo;ve seen.</p>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="bot-lists">
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <h6 class="title">Featured Bots</h6>

                <bot-list-short :bots="featuredBots" />
            </v-flex>
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <h6 class="title">Most Liked Bots</h6>

                <bot-list-short :bots="rankedBots" />
            </v-flex>
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <h6 class="title">Newest Bots</h6>

                <bot-list-short :bots="newestBots" />
            </v-flex>
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <h6 class="title">Sponsored Bots</h6>

                <bot-list-short :bots="sponsoredBots" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import BotListShort from '~/components/bot-list-short.vue'

export default {
    async asyncData({ params }) {
        const limit = 5;

        let allBots = await Promise.all([
            axios.get(`/bots?featured=true&limit=${limit}`),
            axios.get(`/bots?sort=-rating&limit=${limit}`),
            axios.get(`/bots?sort=-date&limit=${limit}`),
            axios.get(`/bots?sponsored=true&limit=${limit}`)
        ]);

        return {
            featuredBots: allBots[0].data,
            rankedBots: allBots[1].data,
            newestBots: allBots[2].data,
            sponsoredBots: allBots[3].data
        }
    },
    components: {
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
</style>
