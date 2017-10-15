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
                            <h6>Spotlighted Bots</h6>

                            <bot-list-short :bots="bots" />
                        </section>
                    </v-flex>
                    <v-flex xs12 xl6>
                        <section>
                            <h6>Most Liked Bots</h6>

                            <bot-list-short :bots="bots" />
                        </section>
                    </v-flex>
                    <v-flex xs12 xl6>
                        <section>
                            <h6>Newest Bots</h6>

                            <bot-list-short :bots="bots" />
                        </section>
                    </v-flex>
                    <v-flex xs12 xl6>
                        <section>
                            <h6>Sponsored Bots (???)</h6>

                            <bot-list-short :bots="bots" />
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
        // TODO: come up with a better name for this route
        let {data: bots} = await axios.get(`http://dbots-20-backend.herokuapp.com/bots/?filter=top`)

        return {
            bots: bots
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
