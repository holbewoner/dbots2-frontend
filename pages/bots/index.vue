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
