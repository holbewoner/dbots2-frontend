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
                            <h1>Bot List</h1>
                            <p class="headline">A world-class list of bots.</p>
                        </div>
                    </v-container>
                </section>
            </v-flex>
        </v-layout>
        <v-layout row class="bot-list">
            <v-flex xs12 md10 offset-md1>
                <section>
                    <bot-list-short />
                </section>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import BotListShort from '~/components/bot-list-short.vue'

export default {
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
