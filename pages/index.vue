<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <section>
                    <v-container class="hero">
                        <div class="text-xs-center">
                            <h1>Discord Bots</h1>
                            <p class="headline">Probably the neatest list of bots you&rsquo;ve seen.</p>
                        </div>
                    </v-container>
                </section>
            </v-flex>
        </v-layout>
        <v-layout row class="bot-lists">
            <v-flex xs12 md10 offset-md1>
                <v-layout row wrap>
                    <v-flex xs12 xl6>
                        <section>
                            <h6>Featured Bots</h6>

                            <bot-list-short :bots="featuredBots" />
                        </section>
                    </v-flex>
                    <v-flex xs12 xl6>
                        <section>
                            <h6>Most Liked Bots</h6>

                            <bot-list-short :bots="rankedBots" />
                        </section>
                    </v-flex>
                    <v-flex xs12 xl6>
                        <section>
                            <h6>Newest Bots</h6>

                            <bot-list-short :bots="newestBots" />
                        </section>
                    </v-flex>
                    <v-flex xs12 xl6>
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
import axios from 'axios'
import BotListShort from '~/components/bot-list-short.vue'

export default {
  components: {
      BotListShort
  },
  async asyncData({ params }) {
        const limit = 5;

        // TODO: come up with a better name for this route
        let allBots = await Promise.all([
            axios.get(`http://127.0.0.1:4001/api/v1/bots?featured=true&limit=${limit}`),
            axios.get(`http://127.0.0.1:4001/api/v1/bots?sort=-rating&limit=${limit}`),
            axios.get(`http://127.0.0.1:4001/api/v1/bots?sort=-date&limit=${limit}`),
            axios.get(`http://127.0.0.1:4001/api/v1/bots?sponsored=true&limit=${limit}`)
        ]);

        console.log({
            featuredBots: allBots[0].data,
            rankedBots: allBots[1].data,
            newestBots: allBots[2].data,
            sponsoredBots: allBots[3].data
        })

        return {
            featuredBots: allBots[0].data,
            rankedBots: allBots[1].data,
            newestBots: allBots[2].data,
            sponsoredBots: allBots[3].data
        }
    },
}
</script>

<style scoped>
@media (min-width: 1904px) {
    .bot-lists .flex.xl6 {
        padding-right: 1rem;
    }
}
.bot-lists section {
    margin-bottom: 1rem;
}
</style>
