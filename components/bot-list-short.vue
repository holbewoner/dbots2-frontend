<template>
    <v-card class="elevation-2">
        <v-card-title v-if="title">
            <h3 class="headline">{{ title }}</h3>
        </v-card-title>
        <v-divider v-if="title"></v-divider>
        <v-card-text v-if="!bots || !bots.length">
            No bots found
        </v-card-text>
        <v-list v-else two-line>
            <template v-for="(bot, index) in bots">
                <v-divider v-if="index > 0"></v-divider>
                <v-list-tile :key="bot.id" :to="botURLPrefix + bot.id" class="bot" avatar>
                    <v-list-tile-avatar class="" size="64px" style="min-width:64px">
                        <img v-if="bot.icon" class="elevation-2" :src="'https://cdn.discordapp.com/app-icons/'+bot.id+'/'+bot.icon+'.jpg'" @error.once="onAvatarLoadError" />
                        <img v-else class="elevation-2" src="https://lorempixel.com/256/256/people" />
                    </v-list-tile-avatar>
                    <v-list-tile-content class="pl-2">
                        <v-list-tile-title>
                            <span>{{ bot.name }}</span>
                        </v-list-tile-title>
                        <!-- <v-list-tile-sub-title>
                            <span class="author grey--text text--darken-1">By <span v-for="(owner, index) in bot.owners"><span v-if="index > 0">, </span>{{ owner.username }}#{{ owner.discriminator }}</span></span>
                        </v-list-tile-sub-title> -->
                        <v-list-tile-sub-title>{{ bot.tagline }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action v-if="ratings && bot.stats" class="hidden-xs-only pr-3">
                        <like-dislike-ratio :likes="bot.stats.likes" :dislikes="bot.stats.dislikes"></like-dislike-ratio>
                    </v-list-tile-action>
                </v-list-tile>
            </template>
        </v-list>
    </v-card>
</template>

<script>
import axios from 'axios'
import LikeDislikeRatio from '~/components/like-dislike-ratio.vue'

export default {
    name: 'bot-list-short',
    props: ['bots', 'ratings', 'title', 'unverified'],
    computed: {
        botURLPrefix() {
            return this.unverified ? "/unverified_bots/" : "/bots/";
        }
    },
    methods: {
        onAvatarLoadError(event) {
            event.target.src = "/defaulticon.jpg"
            event.target.style = `background-color:#f00;transform:rotate(${~~(Math.random() * 360)}deg)`
        }
    },
    components: {
        LikeDislikeRatio
    }
}
</script>

<style scoped>
.avatar--tile, .avatar--tile img {
    border-radius: 2px;
}
.list__tile__action {
    flex: 1 0 auto;
}
</style>
