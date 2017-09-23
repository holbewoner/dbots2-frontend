<template>
    <v-container>
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
            <v-flex xs8 offset-xs2>
                <section>
                    <h6>Newest Bots</h6>

                    <bot-list-short />
                </section>
                <section>
                    <h6>Most Favourited Bots</h6>

                    <bot-list-short />
                </section>
                <section>
                    <h6>Spotlighted Bots</h6>

                    <bot-list-short />
                </section>
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
.bot-lists section {
    padding-bottom: 1rem;
}
</style>
