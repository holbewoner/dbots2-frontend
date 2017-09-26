<template>
    <div>
        <v-container>
            <v-layout row class="pb-3">
                <v-flex>
                    <v-layout column>
                        <v-flex>
                            <span class="display-2">Pollr</span>
                            <span class="title grey--text text--darken-2"> by Abalabahaha#1234</span>
                        </v-flex>
                        <v-flex>
                            <p>A bad moderation bot which doesn't work.</p>
                        </v-flex>
                        <v-flex>
                            <v-layout row>
                                <v-flex>
                                    <div class="bottom">
                                        <v-chip class="blue lighten-3">Open-Source</v-chip>
                                        <v-chip class="blue-grey lighten-2">
                                            <v-avatar>1K</v-avatar>
                                            Guilds
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
                    <p>
                        Bots are cool. Web dev is hard.
                    </p>
                </v-flex>
            </v-layout>
            <v-speed-dial absolute bottom right>
                <v-btn slot="activator" fab>
                    <v-icon>settings</v-icon>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-btn fab small class="red darken-2" v-tooltip:left="{html: 'Report'}">
                    <v-icon>report</v-icon>
                </v-btn>
                <v-btn fab small v-tooltip:left="{html: 'Edit'}">
                    <v-icon>mode_edit</v-icon>
                </v-btn>
                <v-btn fab small v-tooltip:left="{html: 'Review'}">
                    <v-icon>mode_comment</v-icon>
                </v-btn>
            </v-speed-dial>
        </v-container>
    </div>
</template>

<script>
export default {
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
