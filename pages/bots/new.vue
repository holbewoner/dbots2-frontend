<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 class="text-xs-center">
                <h2 class="display-3">Submit Bot</h2>
            </v-flex>
        </v-layout>
        <bot-form></bot-form>
    </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import BotForm from '~/components/bot-form'

export default {
    data() {
        return {
        }
    },
    components: {
        BotForm
    }
}
</script>
