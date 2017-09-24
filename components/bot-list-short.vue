<template>
    <v-card>
        <v-list class="pt-0 pb-0" three-line>
            <v-list-tile class="bot" avatar v-for="bot in bots" v-bind:key="bot.id" :to="'/bots/'+bot.id">
                <v-list-tile-avatar size="55px" class="pt-0 mr-3">
                    <img v-bind:src="'http:\/\/lorempixel.com/256/256/?c=' + bot.id" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <span v-text="bot.name">Unknown</span>
                        <span class="grey--text text--darken-1"> by <span v-text="bot.author">Unknown</span></span>
                    </v-list-tile-title>
                    <v-list-tile-sub-title v-text="bot.description">
                        Unknown
                    </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action-text>
                    <like-dislike-ratio v-bind:ratio="bot.ratio"></like-dislike-ratio>
                    <v-icon v-html="bot.starred ? 'star' : 'star_border'">star_border</v-icon>
                </v-list-tile-action-text>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
import LikeDislikeRatio from './like-dislike-ratio.vue'

export default {
    name: 'bot-list-short',
    data() {
        // TODO: dynamic elements
        return {
            bots: [
                {id: 1234, name: 'Pollr', author: 'Abalabahaha#1234', description: 'A bad moderation logging bot which does not work', starred: false, ratio: 10},
                {id: 5678, name: 'Slash', author: 'FiniteReality#3210', description: 'Better than Pollr', starred: true, ratio: 50},
                {id: 9012, name: 'R. Danny', author: 'Danny#0007', description: 'I am a robot.', starred: true, ratio: 80},
                {id: 3456, name: 'rowboat', author: 'b1nzy#1337', description: 'Gently, I guess.', starred: false, ratio: 40}
            ]
        }
    },
    components: {
        LikeDislikeRatio
    }
}
</script>

<style>
.list__tile--avatar .avatar .icon, .list__tile--avatar .avatar img {
    width: inherit;
    height: inherit;
}
.bot .ratio {
    width: 5rem;
    display: inline-block;
    margin: 0;
    padding: 0 0.5rem;
}
</style>