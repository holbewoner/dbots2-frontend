<template>
    <v-container v-if="!currentUser" fluid>
        <v-layout row>
            <v-flex xs12>
                <v-alert color="error" icon="warning" value="true">
                    You must be logged in to view your profile.
                </v-alert>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container v-else fluid>
        <v-layout row>
            <v-flex class="pr-3 flex--no-grow">
                <v-badge color="green lighten-2" class="badge--status">
                    <span slot="badge"></span>
                    <v-avatar size="9rem">
                        <img v-if="bot.icon" :src="'https://cdn.discordapp.com/app-icons/'+bot.id+'/'+bot.icon+'.png'" />
                        <img v-else src="http://lorempixel.com/256/256/people" />
                    </v-avatar>
                </v-badge>
            </v-flex>
            <v-flex class="flex--grow">
                <v-layout column>
                    <v-flex>
                        <v-layout row wrap>
                            <v-flex>
                                <span class="display-1">{{bot.name}}</span>
                                <br/>
                                <span class="subtitle grey--text text--darken-2"> by <span v-for="(owner, index) in bot.owners"><span v-if="index > 0">, </span>{{ owner.username }}#{{ owner.discriminator }}</span></span>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex>
                        <p v-html="bot.tagline">No description provided</p>
                    </v-flex>
                    <v-flex>
                        <v-btn append :href="inviteURL">Invite</v-btn>
                        <v-btn v-if="bot.website" append :href="bot.website">Website</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex>
                <v-layout column class="flex--space-between">
                    <v-flex v-if="bot.stats">
                        <v-layout row wrap class="flex--right">
                            <like-dislike-ratio :likes="bot.stats.likes" :dislikes="bot.stats.dislikes"></like-dislike-ratio>
                        </v-layout>
                    </v-flex>
                    <v-flex>
                        <v-layout row wrap class="flex--right">
                            <v-chip v-if="bot.source" class="blue lighten-3 chip--has-destination" @click="navigateTo(bot.source)">Open source</v-chip>
                            <v-chip v-if="bot.stats" class="blue-grey lighten-2">
                                <div class="avatar count blue-grey lighten-1">{{bot.stats.guild_count | numeral('0a')}}</div> guilds
                            </v-chip>
                        </v-layout>
                        <v-layout v-if="bot.tags" row wrap class="flex--right">
                            <v-chip v-for="tag in bot.tags" :key="tag" small disabled class="grey darken-2">
                                <v-avatar>
                                    <v-icon>{{getTagData(tag).icon}}</v-icon>
                                </v-avatar>
                                {{getTagData(tag).name}}
                            </v-chip>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-tabs :scrollable="false">
            <v-tabs-bar>
                <v-tabs-item ripple href="#info">Info</v-tabs-item>
                <v-tabs-slider />
            </v-tabs-bar>
            <v-divider class="mb-3" />
            <v-tabs-items>
                <v-tabs-content id="info" v-html="parseDescription(bot.description)">No description provided</v-tabs-content>
            </v-tabs-items>
        </v-tabs>

        <v-speed-dial v-if="isCurrentMod" fixed bottom right>
            <v-btn slot="activator" fab>
                <v-icon>settings</v-icon>
                <v-icon>close</v-icon>
            </v-btn>
            <v-tooltip left>
                <v-btn fab small append @click.native.stop="approveDialog = true" slot="activator">
                    <v-icon>check</v-icon>
                </v-btn>
                <span>Approve</span>
            </v-tooltip>
            <v-tooltip left>
                <v-btn fab small append color="red" @click.native.stop="deleteDialog = true" slot="activator">
                    <v-icon>delete</v-icon>
                </v-btn>
                <span>Delete</span>
            </v-tooltip>
        </v-speed-dial>
        <v-dialog v-model="deleteDialog" persistent max-width="350">
            <v-card>
                <v-card-title class="headline">Delete {{ bot.name }}?</v-card-title>
                <v-card-text>Are you sure you want to delete {{ bot.name }}?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click.native="deleteDialog = false">No</v-btn>
                    <v-btn :disabled="deleteLoading" color="red" @click.native="deleteBot()">
                        <span v-if="!deleteLoading">Yes</span>
                        <v-progress-circular v-else indeterminate></v-progress-circular>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="approveDialog" persistent max-width="350">
            <v-card>
                <v-card-title class="headline">Approve {{ bot.name }}?</v-card-title>
                <v-card-text>Are you sure you want to approve {{ bot.name }}?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click.native="approveDialog = false">No</v-btn>
                    <v-btn :disabled="approveLoading" color="red" @click.native="approveBot()">
                        <span v-if="!approveLoading">Yes</span>
                        <v-progress-circular v-else indeterminate></v-progress-circular>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar :timeout="10000" color="red" v-model="snackbarError">
            {{ snackbarErrorText }}
            <v-btn flat @click.native="snackbarError = false">Close</v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import BotCommandList from '~/components/bot-command-list.vue'
import LikeDislikeRatio from '~/components/like-dislike-ratio.vue'
import marked from '~/plugins/marked'

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
    methods: {
        navigateTo(url) {
            window.open(url);
        },
        getTagData(name) {
            if(!tags[name]) {
                console.log("Unknown tag:", name)
                return {icon: 'error_outline', name: 'Unknown'}
            }
            return tags[name]
        },
        parseDescription(description) {
            if(!description) {
                return "No description given."
            }
            return marked(description)
        },
        deleteBot() {
            this.deleteLoading = true;
            axios.delete(`/bots/${this.bot.id}`, {
                headers: {
                    Authorization: this.$store.state.auth.token
                }
            }).then(() => {
                this.deleteDialog = false
                this.deleteLoading = false

                this.$router.go("/bots")
            }).catch((err) => {
                if(err && err.response && err.response.data && err.response.data.error) {
                    this.snackbarErrorText = "Error deleting bot: " + err.response.data.error
                } else {
                    this.snackbarErrorText = "Error deleting bot"
                }
                this.snackbarError = true
                this.deleteLoading = false
            })
        },
        approveBot() {
            this.approveLoading = true;
            axios.post(`/unverified_bots/${this.bot.id}/approve`, undefined, {
                headers: {
                    Authorization: this.$store.state.auth.token
                }
            }).then(() => {
                this.approveDialog = false
                this.approveLoading = false

                this.$router.go(`/bots/${this.bot.id}`)
            }).catch((err) => {
                if(err && err.response && err.response.data && err.response.data.error) {
                    this.snackbarErrorText = "Error approving bot: " + err.response.data.error
                } else {
                    this.snackbarErrorText = "Error approving bot"
                }
                this.snackbarError = true
                this.approveLoading = false
            })
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user
        },
        inviteURL() {
            var url = "https://discordapp.com/oauth2/authorize?client_id=" + this.bot.id
            var scopes = this.bot.scopes
            if(!scopes || !scopes.length) {
                scopes = ["bot"]
            }
            url += "&scope=" + scopes.join("+")
            if(!isNaN(this.bot.permissions)) {
                url += "&permissions=" + this.bot.permissions
            }
            if(scopes.find((s) => s !== "bot")) {
                url += "&response_type=code"
            }
            if(this.bot.redirect_uri) {
                url += "&redirect_uri=" + this.bot.redirect_uri
            }
            url += "&state=dbots"
            return url
        },
        isCurrentMod() {
            return this.currentUser && this.currentUser.mod
        }
    },
    async asyncData({ params, store }) {
        let { data: bot } = await axios.get(`/unverified_bots/${params.id}`, {
            headers: {
                Authorization: store.state.auth.token
            }
        })

        return {
            bot: bot
        }
    },
    data() {
        return {
            deleteDialog: this.$route.hash === "#delete",
            deleteLoading: false,

            approveDialog: this.$route.hash === "#approve",
            approveLoading: false,

            snackbarError: false,
            snackbarErrorText: null
        }
    },
    validate ({ params }) {
        return /^[0-9]+$/.test(params.id)
    },
    components: {
        LikeDislikeRatio,
        BotCommandList
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
