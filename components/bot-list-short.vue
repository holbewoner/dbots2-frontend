<template>
    <v-card>
        <v-list class="pt-0 pb-0" three-line>
            <v-list-tile class="bot" avatar v-for="bot in bots" v-bind:key="bot.id" :to="'/bots/'+bot.id">
                <v-list-tile-avatar size="55px" class="pt-0 mr-3">
                    <img v-bind:src="'http:\/\/lorempixel.com/256/256/?c=' + bot.id" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <span>>{{bot.name}}</span>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                        <span class="author grey--text text--darken-1">By {{bot.author}}</span>
                    </v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{bot.description}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <like-dislike-ratio v-bind:ratio="bot.ratio"></like-dislike-ratio>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
import LikeDislikeRatio from '~/components/like-dislike-ratio.vue'

export default {
    name: 'bot-list-short',
    data() {
        // TODO: dynamic elements
        return {
            bots: [
                {id: 1234, name: 'Pollr', author: 'abalabahaha#9421', description: 'The world\'s best moderation bot.', starred: true, ratio: 95},
                {id: 5678, name: 'Slash', author: 'FiniteReality#5734', description: 'Also the world\'s best moderation bot.', starred: true, ratio: 94.9999999999},
                {id: 9012, name: 'R. Danny', author: 'Danny#0007', description: 'I am a robot.', starred: true, ratio: 80},
                {id: 3456, name: 'rowboat', author: 'b1nzy#1337', description: 'Gently, I guess.', starred: false, ratio: 40},
                {id: 4321, name: '(ﾉ◕ヮ◕)ﾉ✧･ﾟ*✧spoo.py✧*･ﾟ✧ヽ(◕ヮ◕)ﾉ', author: 'spoopy🍡#0567', description: 'A dank bot.', starred: false, ratio: 100}
            ]
        }
    },
    components: {
        LikeDislikeRatio
    }
}
</script>

<style scoped>
.list__tile__action {
    flex: 1 0 auto;
}
.list__tile--avatar .avatar .icon, .list__tile--avatar .avatar img {
    width: inherit;
    height: inherit;
}
</style>
