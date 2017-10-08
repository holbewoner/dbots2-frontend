<template>
    <v-container fluid>
        <v-layout row class="mb-3">
            <v-flex class="pr-3 flex--no-grow">
                <v-badge color="green lighten-2" class="badge--status">
                    <span slot="badge"></span>
                    <v-avatar size="9rem">
                        <img v-bind:src="bot.avatar"/>
                    </v-avatar>
                </v-badge>
            </v-flex>
            <v-flex class="flex--grow">
                <v-layout column>
                    <v-flex>
                        <v-layout row wrap>
                            <v-flex>
                                <span class="display-2">Pollr</span>
                                <span class="title grey--text text--darken-2"> by abalabahaha#1234</span>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex>
                        <p>The world's best moderation bot.</p>
                    </v-flex>
                    <v-flex>
                        <v-btn append to="invite">Invite</v-btn>
                        <v-btn append to="stats">Stats</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex>
                <v-layout column>
                    <v-flex>
                        <v-layout row wrap class="flex--right">
                            <like-dislike-ratio v-bind:likes="bot.likes" v-bind:dislikes="bot.dislikes"></like-dislike-ratio>
                        </v-layout>
                    </v-flex>
                    <v-flex>
                        <v-layout row wrap class="flex--right">
                            <v-chip v-if="bot.source" class="blue lighten-3 chip--has-destination" @click="navigateTo(bot.source)">Open source</v-chip>
                            <v-chip class="blue-grey lighten-2">
                                <div class="avatar count blue-grey lighten-1">{{bot.guilds}}</div> guilds
                            </v-chip>
                        </v-layout>
                        <v-layout row wrap class="flex--right">
                            <v-chip small disabled v-for="tag in bot.tags" v-bind:key="tag" class="grey darken-2">
                                <v-avatar><v-icon>{{getTagIcon(tag)}}</v-icon></v-avatar> {{getTagName(tag)}}
                            </v-chip>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-divider class="mb-3" />
        <v-layout row wrap class="mb-3">
            <v-flex xs12>
                <div class="title">Hello there!</div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                <p class="headline">Commands</p>
            </v-flex>

            <v-flex xs12 md4 v-for="(category, name) in commands" v-bind:key="name" class="px-2">
                <v-card>
                    <v-list two-line>
                        <v-list-group>
                            <v-list-tile slot="item" @click="">
                                <v-list-tile-action v-if="category.icon">
                                    <v-icon>{{ category.icon }}</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ name }}</v-list-tile-title>
                                    <v-list-tile-sub-title v-if="category.description">{{ category.description }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-icon>keyboard_arrow_down</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-list-tile v-for="command in category.commands" v-bind:key="command.name" @click="">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ prefix + command.name }}</v-list-tile-title>
                                    <v-list-tile-sub-title v-if="command.description">{{ command.description }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-icon>info</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
        <v-speed-dial fixed bottom right hover>
            <v-btn slot="activator" fab>
                <v-icon>settings</v-icon>
                <v-icon>close</v-icon>
            </v-btn>
            <v-tooltip left v-for="link in links" v-bind:key="link.to">
                <v-btn fab small append v-bind:to="link.to" v-bind:class="link.class" slot="activator">
                    <v-icon v-text="link.icon">error_outline</v-icon>
                </v-btn>
                <span v-text="link.tooltip">Unknown</span>
            </v-tooltip>
        </v-speed-dial>
    </v-container>
</template>

<script>
import LikeDislikeRatio from '~/components/like-dislike-ratio.vue'

// TODO: these tags should be moved into a separate component
const tags = {
    fun: {icon: 'casino', name: 'Fun'},
    moderation: {icon: 'security', name: 'Moderation'},
    games: {icon: 'videogame_asset', name: 'Games'}
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
        }
    },
    data() {
        return {
            bot: {
                avatar: 'http://lorempixel.com/256/256/',
                online: true,
                likes: 75,
                dislikes: 25,
                source: 'https://github.com/abalabahaha/dbots2-frontend',
                guilds: 150,
                tags: ['fun', 'moderation', 'games']
            },
            links: [
                {to: 'report', class: 'red darken-2', tooltip: 'Report', icon: 'report'},
                {to: 'edit', tooltip: 'Edit', icon: 'mode_edit'},
                {to: 'comment', tooltip: 'Review', icon: 'mode_comment'}
            ],
            prefix: "!",
            commands: {
                'Fun': {
                    icon: 'casino',
                    commands: [
                        { name: 'roll', description: 'Roll some dice' },
                        { name: 'unroll', description: 'Unroll some dice' }
                    ]
                },
                'Moderation': {
                    icon: 'security',
                    description: 'Empower your mods!',
                    commands: [
                        { name: 'ban', description: 'Ban someone' },
                        { name: 'bun', description: 'Cook a bun' }
                    ]
                },
                'Games': {
                    icon: 'videogame_asset',
                    description: 'Distract your mods!',
                    commands: [
                        { name: 'guess', description: 'Guess that song!' },
                        { name: 'count', description: 'Play the counting game!' }
                    ]
                }
            }
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
.flex--right {
    justify-content: flex-end;
}
/*.flex--grow {
    flex-grow: 1;
}*/
.flex--no-grow {
    flex-grow: 0;
}
</style>
