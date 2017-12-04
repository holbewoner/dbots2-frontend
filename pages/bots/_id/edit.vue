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

// TODO: these tags should be moved into a separate component
const tags = {
    fun: {icon: 'casino', name: 'Fun'},
    games: {icon: 'videogame_asset', name: 'Games'},
    moderation: {icon: 'security', name: 'Moderation'},
    music: {icon: 'music_note', name: 'Music'},
    utility: {icon: 'build', name: 'Utility'},
    testing: {icon: 'bug_report', name: 'Testing'}
}

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
