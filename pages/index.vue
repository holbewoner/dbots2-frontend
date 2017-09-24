<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <section>
                    <v-container class="hero">
                        <div class="text-xs-center">
                            <br/> <!--temporary until i figure out how to CSS properly -->
                            <br/>
                            <br/>
                            <br/>
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
                            <h6>Newest Bots</h6>

                            <bot-list-short />
                        </section>
                    </v-flex>
                    <v-flex xs12 xl6>
                        <section>
                            <h6>Most Favourited Bots</h6>

                            <bot-list-short />
                        </section>
                    </v-flex>
                    <v-flex xs12 xl6>
                        <section>
                            <h6>Spotlighted Bots</h6>

                            <bot-list-short />
                        </section>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import BotListShort from '../components/bot-list-short.vue'

export default {
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
.bot-lists section {
    padding-bottom: 1rem;
}
</style>
