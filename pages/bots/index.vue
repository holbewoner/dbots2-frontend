<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12>
                <p>search stuff to go here in the future</p>
            </v-flex>
        </v-layout>
        <v-layout row class="bot-list">
            <v-flex xs12 md10 offset-md1>
                <section>
                    <bot-list-short :bots="bots" />
                </section>
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
        let {data: bots} = await axios.get(`http://127.0.0.1:4001/api/v1/bots?limit=20`)

        return {
            bots: bots
        }
    },
}
</script>

<style scoped>
.bot-list section {
    margin-bottom: 1rem;
}
</style>
