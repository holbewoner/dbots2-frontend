<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 class="text-xs-center">
                <h2 class="display-3">Edit {{ bot.name }}</h2>
            </v-flex>
        </v-layout>
        <bot-form :bot="bot"></bot-form>
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
    async asyncData({ params }) {
        let { data: bot } = await axios.get(`/bots/${params.id}`)

        return {
            bot: bot
        }
    },
    components: {
        BotForm
    }
}
</script>
