<template>
    <div>
        <v-container>
            <v-layout row class="pb-3">
                <v-flex>
                    <v-layout column>
                        <v-flex>
                            <span class="display-2">Pollr</span>
                            <span class="title grey--text text--darken-2"> by abalabahaha#1234</span>
                        </v-flex>
                        <v-flex>
                            <p>The world's best moderation bot.</p>
                        </v-flex>
                        <v-flex>
                            <v-layout row>
                                <v-flex>
                                    <div class="bottom">
                                        <v-chip class="blue lighten-3">Open-Source</v-chip>
                                        <v-chip class="blue-grey lighten-2">
                                            ∞ guilds
                                        </v-chip>
                                        <v-chip class="green darken-1 white--text">Online</v-chip>
                                    </div>
                                </v-flex>
                                <v-flex>
                                    <div class="right">
                                        <v-btn>Invite</v-btn>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs1 ml-2>
                    <v-avatar size="100%">
                        <img src="http://lorempixel.com/256/256/"/>
                    </v-avatar>
                </v-flex>
            </v-layout>
            <v-divider/>
            <v-layout row class="pt-3">
                <v-flex>
                    <div class="title">Hello there!</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
    head() {
        return {
            title: 'Pollr'
        }
    },
    data() {
        return {
            links: [
                {to: './report', class: 'red darken-2', tooltip: {html: 'Report'}, icon: 'report'},
                {to: './edit', tooltip: {html: 'Edit'}, icon: 'mode_edit'},
                {to: './comment', tooltip: {html: 'Review'}, icon: 'mode_comment'}
            ]
        }
    },
    validate ({ params }) {
        return /^[0-9]+$/.test(params.id)
    }
}
</script>

<style scoped>
.speed-dial {
    bottom: 3rem;
    transform: initial;
}
</style>
