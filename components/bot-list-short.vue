<template>
    <v-card>
        <v-list class="pt-0 pb-0" three-line>
            <v-list-tile class="bot" avatar v-for="bot in bots" v-bind:key="bot.id" :to="'/bots/'+bot.id">
                <v-list-tile-avatar size="55px" class="pt-0 mr-3">
                    <img :src="bot.avatar" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <span>{{bot.name}}</span>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                        <span class="author grey--text text--darken-1">By {{bot.author.name}}#{{bot.author.discrim}}</span>
                    </v-list-tile-sub-title>
                    <v-list-tile-sub-title>{{bot.description}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action class="hidden-xs-only pr-3">
                    <like-dislike-ratio v-bind:likes="bot.likes" v-bind:dislikes="bot.dislikes"></like-dislike-ratio>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
import axios from 'axios'
import LikeDislikeRatio from '~/components/like-dislike-ratio.vue'

export default {
    name: 'bot-list-short',
    props: ['bots'],
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
