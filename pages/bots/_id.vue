<template>
    <div>
        <v-container>
            <v-layout row class="mb-3">
                <v-flex class="pr-3 flex--no-grow">
                    <v-avatar size="9rem">
                        <img src="http://lorempixel.com/256/256/"/>
                    </v-avatar>
                </v-flex>
                <v-flex xs12 md11>
                    <v-layout column>
                        <v-flex>
                            <v-layout row wrap>
                                <v-flex>
                                    <span class="display-2">Pollr</span>
                                    <span class="title grey--text text--darken-2"> by abalabahaha#1234</span>
                                </v-flex>
                                <v-flex>
                                    <div class="right">
                                        <v-btn>Invite</v-btn>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex>
                            <p>The world's best moderation bot.</p>
                        </v-flex>
                        <v-flex>
                            <div class="bottom">
                                <v-chip class="blue lighten-3">Open-Source</v-chip>
                                <v-chip class="blue-grey lighten-2">
                                    <div class="avatar count blue-grey lighten-1">1M</div>
                                    guilds
                                </v-chip>
                                <v-chip class="green darken-1 white--text">Online</v-chip>
                            </div>
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
                <v-btn fab small v-for="link in links" v-bind:key="link.to" v-bind:to="link.to" v-bind:class="link.class" v-tooltip:left="link.tooltip">
                    <v-icon v-text="link.icon">error_outline</v-icon>
                </v-btn>
            </v-speed-dial>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            links: [
                {to: './report', class: 'red darken-2', tooltip: {html: 'Report'}, icon: 'report'},
                {to: './edit', tooltip: {html: 'Edit'}, icon: 'mode_edit'},
                {to: './comment', tooltip: {html: 'Review'}, icon: 'mode_comment'}
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
.speed-dial {
    bottom: 3rem;
}
.flex--no-grow {
    flex-grow: 0;
}
</style>
