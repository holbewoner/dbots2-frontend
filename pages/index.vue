<template>
    <v-container fluid>
        <v-layout row>
            <v-flex x16 xs12>
                <section>
                    <div class="text-xs-center">
                        <h1>Discord Bots</h1>
                        <p class="headline">Probably the neatest list of bots you&rsquo;ve seen.</p>
                    </div>
                </section>
            </v-flex>
        </v-layout>
        <v-layout row class="bot-lists">
            <v-flex x16 xs12 md10 offset-md1>
                <v-layout row wrap>
                    <v-flex x16 xs12 class="mb-3">
                        <section>
                            <h6>Featured Bots</h6>

                            <bot-list-short :bots="featuredBots" />
                        </section>
                    </v-flex>
                    <v-flex x16 xs12 class="mb-3">
                        <section>
                            <h6>Most Liked Bots</h6>

                            <bot-list-short :bots="rankedBots" />
                        </section>
                    </v-flex>
                    <v-flex x16 xs12 class="mb-3">
                        <section>
                            <h6>Newest Bots</h6>

                            <bot-list-short :bots="newestBots" />
                        </section>
                    </v-flex>
                    <v-flex x16 xs12 class="mb-3">
                        <section>
                            <h6>Sponsored Bots</h6>

                            <bot-list-short :bots="sponsoredBots" />
                        </section>
                    </v-flex>
                </v-layout>
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
