<template>
    <v-container>
        <v-layout row>
            <v-flex class="pr-3 flex--no-grow">
                <v-badge color="green lighten-2" class="badge--status">
                    <span slot="badge"></span>
                    <v-avatar size="9rem">
                        <img v-if="bot.icon" :src="'https://cdn.discordapp.com/app-icons/'+bot.id+'/'+bot.icon+'.jpg'" />
                        <img v-else src="http://lorempixel.com/256/256/people" />
                    </v-avatar>
                </v-badge>
            </v-flex>
            <v-flex class="flex--grow">
                <v-layout column>
                    <v-flex>
                        <v-layout row wrap>
                            <v-flex>
                                <span class="display-2">{{bot.name}}</span>
                                <span class="title grey--text text--darken-2"> by <span v-for="owner in bot.owners">{{ owner.username }}#{{ owner.discriminator }}</span></span>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex>
                        <p v-html="bot.description_short">Unknown description</p>
                    </v-flex>
                    <v-flex>
                        <v-btn append to="invite">Invite</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex>
                <v-layout column class="flex--space-between">
                    <v-flex>
                        <v-layout row wrap class="flex--right">
                            <like-dislike-ratio :likes="bot.likes" :dislikes="bot.dislikes"></like-dislike-ratio>
                        </v-layout>
                    </v-flex>
                    <v-flex>
                        <v-layout row wrap class="flex--right">
                            <v-chip v-if="bot.source" class="blue lighten-3 chip--has-destination" @click="navigateTo(bot.source)">Open source</v-chip>
                            <v-chip class="blue-grey lighten-2">
                                <div class="avatar count blue-grey lighten-1">{{bot.stats.guild_count | numeral('0a')}}</div> guilds
                            </v-chip>
                        </v-layout>
                        <v-layout row wrap class="flex--right">
                            <v-chip small disabled v-for="tag in bot.tags" :key="tag" class="grey darken-2">
                                <v-avatar><v-icon>{{getTagIcon(tag)}}</v-icon></v-avatar> {{getTagName(tag)}}
                            </v-chip>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-tabs dark :scrollable="false">
            <v-tabs-bar>
                <v-tabs-item ripple href="#info">Info</v-tabs-item>
                <v-tabs-item ripple href="#commands">Commands</v-tabs-item>
                <v-tabs-item ripple href="#stats">Stats</v-tabs-item>
                <v-tabs-slider />
            </v-tabs-bar>
            <v-divider class="mb-3" />
            <v-tabs-items>
                <v-tabs-content id="info" v-html="parseDescription(bot.description)">
                </v-tabs-content>
                <v-tabs-content id="commands">
                    <v-layout row>
                        <v-flex xs12 md4 v-for="category in commands.categories" :key="category.name" class="px-2">
                            <v-card>
                                <v-list two-line>
                                    <v-list-group>
                                        <v-list-tile slot="item">
                                            <v-list-tile-action v-if="category.icon">
                                                <v-icon>{{category.icon}}</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-content>
                                                <v-list-tile-title>{{category.name}}</v-list-tile-title>
                                                <v-list-tile-sub-title v-if="category.description">{{category.description}}</v-list-tile-sub-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action>
                                                <v-icon>keyboard_arrow_down</v-icon>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                        <v-list-tile class="list--no-pad-left" v-for="command in category.commands" :key="command.name">
                                            <v-list-tile-action v-if="command.icon">
                                                <v-icon>{{command.icon}}</v-icon>
                                            </v-list-tile-action>
                                            <v-list-tile-content>
                                                <v-list-tile-title>{{activePrefix}}{{command.name}}</v-list-tile-title>
                                                <v-list-tile-sub-title v-if="command.description">{{command.description}}</v-list-tile-sub-title>
                                            </v-list-tile-content>
                                            <v-list-tile-action>
                                                <v-dialog width="600px">
                                                    <v-icon class="clickable" slot="activator">info</v-icon>
                                                    <v-card>
                                                        <v-card-title>
                                                            <span class="headline">{{activePrefix}}{{command.name}}</span>
                                                        </v-card-title>
                                                        <v-card-text>
                                                            {{command.description}}
                                                        </v-card-text>
                                                    </v-card>
                                                </v-dialog>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                    </v-list-group>
                                </v-list>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-tabs-content>
                <v-tabs-content id="stats">
                    <p class="display-3">TODO: stats</p>
                </v-tabs-content>
            </v-tabs-items>
        </v-tabs>

        <v-speed-dial fixed bottom right hover>
            <v-btn slot="activator" fab>
                <v-icon>settings</v-icon>
                <v-icon>close</v-icon>
            </v-btn>
            <v-tooltip left v-for="link in links" :key="link.to">
                <v-btn fab small append :to="link.to" :class="link.class" slot="activator">
                    <v-icon v-text="link.icon">error_outline</v-icon>
                </v-btn>
                <span v-text="link.tooltip">Unknown</span>
            </v-tooltip>
        </v-speed-dial>
    </v-container>
</template>

<script>
import marked from '~/plugins/marked'
import axios from 'axios'
import LikeDislikeRatio from '~/components/like-dislike-ratio.vue'

// TODO: these tags should be moved into a separate component
const tags = {
    fun: {icon: 'casino', name: 'Fun'},
    moderation: {icon: 'security', name: 'Moderation'},
    games: {icon: 'videogame_asset', name: 'Games'},
    testing: {icon: 'bug_report', name: 'Testing'}
}

// Handily stolen from stack overflow:
// https://stackoverflow.com/a/34890276/6878862
const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x)
        return rv
    }, {})
}

export default {
    methods: {
        navigateTo(url) {
            window.open(url);
        },
        getTagIcon(tag) {
            return (tags[tag] || {icon: 'error_outline', name: 'Unknown'}).icon
        },
        getTagName(tag) {
            return (tags[tag] || {icon: 'error_outline', name: 'Unknown'}).name
        },
        displayInfo(command) {
        },
        parseDescription(description) {
            if(!description) {
                return "No description given."
            }
            return marked(description)
        }
    },
    computed: {
        activePrefix() {
            return this.commands.prefixes[0]
        }
    },
    async asyncData({ params }) {
        let { data: bot } = await axios.get(`http://127.0.0.1:4001/api/v1/bots/${params.id}`)

        return {
            bot: bot,
            commands: bot.command_categories
        }
    },
    data() {
        return {
            scroll: 0,
            links: [
                {to: 'report', class: 'red darken-2', tooltip: 'Report', icon: 'report'},
                {to: 'edit', tooltip: 'Edit', icon: 'mode_edit'},
                {to: 'comment', tooltip: 'Review', icon: 'mode_comment'}
            ]
        }
    },
    validate ({ params }) {
        return /^[0-9]+$/.test(params.id)
    },
    components: {
        LikeDislikeRatio
    }
}
</script>

<style scoped>
.chip .avatar.count {
    border-radius: 16px;
    min-width: 32px;
    max-width: 80px;
    width: auto !important;

    padding: 0px 6px;
}
i.material-icons.icon.clickable {
    cursor: pointer;
}
</style>
