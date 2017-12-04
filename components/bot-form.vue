<template>
    <v-alert v-if="currentUser === null" color="error" icon="warning" value="true">
        You must be logged in to submit a bot.
    </v-alert>
    <v-form v-else v-model="valid" @submit.prevent="submit" ref="botForm">
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title primary-title>
                        <h3 class="headline">General</h3>
                    </v-card-title>
                    <v-card-text>
                        <v-container fluid grid-list-md>
                            <v-layout row wrap>
                                <v-flex xs12 md6>
                                    <v-text-field label="Client ID" v-model="clientID" :rules="clientIDRules" placeholder="123456789123456789" required :disabled="!!this.bot"></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6>
                                    <v-select label="Default Prefix(es)" v-model="prefixes" :rules="prefixesRules" placeholder="Examples: !, sudo, @mention" chips deletable-chips tags multiple required></v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Tagline (short description)" v-model="tagline" :rules="taglineRules" counter="128" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select label="Owner IDs" v-model="ownerIDs" :rules="ownerIDsRules" chips deletable-chips tags multiple required></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 md6>
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Metadata</h3>
                            <div>Some general information about your bot.</div>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-container fluid grid-list-md>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-select label="Library" v-model="library" :items="libraryList" :rules="libraryRules" auto autocomplete required></v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select label="Tags" v-model="tags" :items="tagList" multiple chips :rules="tagsRules" required>
                                        <template slot="selection" slot-scope="selectedData">
                                            <v-chip close @input="selectedData.parent.selectItem(selectedData.item)" :selected="selectedData.selected" class="chip--select-multi" :key="selectedData.item.name">
                                                <v-avatar>
                                                    <v-icon>{{ selectedData.item.icon }}</v-icon>
                                                </v-avatar>
                                                {{ selectedData.item.text }}
                                            </v-chip>
                                        </template>
                                        <template slot="item" slot-scope="itemData">
                                            <template>
                                                <v-list-tile-avatar><v-icon>{{ itemData.item.icon }}</v-icon></v-list-tile-avatar>
                                                <v-list-tile-content>{{ itemData.item.text }}</v-list-tile-content>
                                            </template>
                                        </template>
                                    </v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Website" v-model="website" :rules="websiteRules"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 md6>
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">OAuth2 Invite Link</h3>
                            <div>You should leave these blank <b>unless you know what you're doing.</b></div>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-container fluid grid-list-md>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field label="Redirect URI" v-model="redirectURI" :rules="redirectURIRules" placeholder="OAuth2 Redirect URI (optional)"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Permissions" v-model="permissions" :rules="permissionsRules" placeholder="0"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select label="Scopes" v-model="scopes" :items="scopesList" multiple chips deletable-chips :rules="scopesRules" placeholder="bot"></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-text>
                        <v-container fluid grid-list-md>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-checkbox v-model="agree" :rules="agreeRules" required>
                                        <span slot="label">I agree to the <a @click="">Terms and Conditions</a></span>
                                    </v-checkbox>
                                </v-flex>
                                <v-flex xs12>
                                    <v-checkbox v-model="notBot" :rules="notBotRules" required>
                                        <span slot="label">I am not a bot</span>
                                    </v-checkbox>
                                </v-flex>
                                <v-flex xs12>
                                    <v-btn v-if="submitted" @click="" color="green">
                                        <v-icon>check</v-icon>
                                        Submitted
                                    </v-btn>
                                    <v-btn v-else @click="submit()" :disabled="!valid && !loading">
                                        <v-progress-circular indeterminate v-if="loading"></v-progress-circular>
                                        <span v-else>Submit</span>
                                    </v-btn>
                                    <v-btn outline @click="clear()">Clear</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-form>
</template>

<script>
import axios from '~/plugins/axios'

// TODO: these tags should be moved into a separate component
const TAG_LIST = [
    { icon: "casino", text: "Fun", value: "fun" },
    { icon: "videogame_asset", text: "Games", value: "games" },
    { icon: "security", text: "Moderation", value: "moderation" },
    { icon: "music_note", text: "Music", value: "music" },
    { icon: "build", text: "Utility", value: "utility" },
    { icon: "bug_report", text: "Testing", value: "testing" }
]
const SCOPES_LIST = "bot connections email gdm guilds guilds.join identify messages.read rpc rpc.api rpc.notifications.read webhook.incoming".split(" ")
const LIBRARY_LIST = "disco discord-rs discord.io discord.js Discord.Net discord.py Discord4J discordcr DiscordGo Discordia Discordie discordrb DSharpPlus Eris Javacord JDA Nostrum RestCord serenity SwiftDiscord Sword Custom".split(" ")

export default {
    name: 'bot-form',
    props: ['bot'],
    data() {
        var initial = {
            loading: false,
            submitted: false,
            unverifiedBot: null,
            valid: false,

            clientID: null,
            prefixes: null,
            tagline: null,
            ownerIDs: null,

            library: null,
            tags: null,
            website: null,

            redirectURI: null,
            permissions: null,
            scopes: null,

            agree: false,
            notBot: false,

            clientIDRules: [
                // 17 but OAuth apps were invented around 22.... (length >= 18)
                (v) => (v && v.length >= 18 && v.length <= 19) || "Invalid client ID",
                // Discord OAuth around 2016 Feb 26
                (v) => (!isNaN(v) && ((+v / 4194304) + 1420070400000 >= 1456531200000) && ((+v / 4194304) + 1420070400000 <= Date.now())) || "Invalid client ID",
                () => this.returnedErrors && this.returnedErrors.id || true,
            ],
            prefixesRules: [
                (v) => (v && v.length > 0) || "Invalid prefixes",
                (v) => {
                    if(!v || !v.length) {
                        return true
                    }
                    for(var i of v) {
                        if(!i) {
                            return i + ": invalid prefix"
                        }
                        if(i.length > 64) {
                            return i + ": too long"
                        }
                        if(i.match(/<@!?\d+>/)) {
                            return i + ": mentions should literally be \"@mention\""
                        }
                        if(i === "\"@mention\"") { // You can never be sure
                            return i + ": remove the quotation marks"
                        }
                        console.log(i)
                    }
                    return true
                },
                () => this.returnedErrors && this.returnedErrors.prefixes || true,
            ],
            taglineRules: [
                (v) => (v && !!v.length) || "Invalid tagline",
                (v) => (v && v.length >= 16) || "Too short",
                (v) => (v && v.length <= 128) || "Too long",
                () => this.returnedErrors && this.returnedErrors.tagline || true,
            ],
            ownerIDsRules: [
                (v) => (v && !!v.length) || "Invalid owner IDs",
                (v) => {
                    if(!v || !v.length) {
                        return true
                    }
                    for(var i of v) {
                        if(!i) {
                            return i + ": invalid owner ID"
                        }
                        if(i.length < 17 || i.length > 19) {
                            return i + ": invalid owner ID"
                        }
                        if(isNaN(i) || ((+v / 4194304) < 0) || ((+v / 4194304) + 1420070400000 > Date.now())) {
                            return i + ": invalid owner ID"
                        }
                    }
                    return true
                },
                () => this.returnedErrors && this.returnedErrors.owner_ids || true,
            ],
            websiteRules: [
                (v) => (!v || !!v.match(/^https?:\/\/.+\..+$/)) || "Invalid link",
                () => this.returnedErrors && this.returnedErrors.website || true,
            ],
            tagsRules: [
                (v) => (v && v.length > 0) || "Invalid tags",
                (v) => {
                    if(!v || !v.length) {
                        return true
                    }
                    for(var i of v) {
                        if(!i) {
                            return i + ": invalid tag"
                        }
                        if(!TAG_LIST.find((j) => j.value === i)) {
                            return i + ": invalid tag"
                        }
                    }
                    return true
                },
                () => this.returnedErrors && this.returnedErrors.tags || true,
            ],
            libraryRules: [
                (v) => (v && !!~LIBRARY_LIST.indexOf(v)) || "Invalid library",
                () => this.returnedErrors && this.returnedErrors.library || true,
            ],
            redirectURIRules: [
                (v) => (!v || !!v.match(/^https?:\/\/.+\..+$/)) || "Invalid link",
                () => this.returnedErrors && this.returnedErrors.redirect_uri || true,
            ],
            permissionsRules: [
                (v) => (!isNaN(v)) || "Invalid permissions",
                (v) => ((+v) >= -1 && (+v) <= 2147483647) || "Out-of-bounds permissions",
                () => this.returnedErrors && this.returnedErrors.permissions || true,
            ],
            scopesRules: [
                (v) => {
                    if(!v || !v.length) {
                        return true
                    }
                    for(var i of v) {
                        if(!i) {
                            return i + ": invalid scope"
                        }
                        if(!SCOPES_LIST.find((j) => j.value === i)) {
                            return i + ": invalid scope"
                        }
                    }
                    return true
                },
                () => this.returnedErrors && this.returnedErrors.scopes || true,
            ],
            agreeRules: [
                (v) => !!v || "You must agree to the Terms and Conditions.",
                () => this.returnedErrors && this.returnedErrors.agree || true,
            ],
            notBotRules: [
                (v) => !!v || "Sorry then.",
                () => this.returnedErrors && this.returnedErrors.not_bot || true,
            ],

            libraryList: LIBRARY_LIST,
            tagList: TAG_LIST,
            scopesList: SCOPES_LIST,

            returnedErrors: null
        }
        if(this.bot) {
            initial.clientID = this.bot.id || this.bot.clientID
            initial.prefixes = this.bot.prefixes
            initial.tagline = this.bot.tagline
            initial.ownerIDs = this.bot.owners.map((o) => o.id)

            initial.library = this.bot.library
            initial.tags = this.bot.tags
            initial.website = this.bot.website

            initial.redirectURI = this.bot.redirect_uri || this.bot.redirectURI
            initial.permissions = this.bot.permissions
            initial.scopes = this.bot.scopes
        }
        return initial
    },
    methods: {
        clear() {
            this.$refs.botForm.reset()
        },
        submit() {
            if(this.submitted) {
                return
            }
            this.loading = true
            var params = {
                id: this.clientID,
                prefixes: this.prefixes,
                tagline: this.tagline,
                owner_ids: this.ownerIDs,

                library: this.library,
                tags: this.tags,
                website: this.website,

                redirect_uri: this.redirectURI,
                permissions: this.permissions,
                scopes: this.scopes,

                agree: this.agree,
                not_bot: this.notBot
            }
            var options = {
                headers: {
                    Authorization: this.$store.state.auth.token
                }
            }
            var promise;
            if(this.bot) {
                promise = axios.patch(`/bots/${this.$route.params.id}`, params, options);
            } else {
                promise = axios.post(`/unverified_bots`, params, options);
            }
            promise.then((res) => {
                this.returnedErrors = null
                this.unverifiedBot = res.data

                this.submitted = true
                this.loading = false
            }).catch((err) => {
                if(err && err.response && err.response.data) {
                    if(Array.isArray(err.response.data)) {
                        this.returnedErrors = {}
                        for(let errorLine of err.response.data) {
                            let split = errorLine.split(": ")
                            if(split.length !== 2) {
                                console.log("Invalid error:", errorLine)
                                continue
                            }
                            this.returnedErrors[split[0]] = split[1]
                        }
                    } else {
                        this.returnedErrors = {
                            unknown: err.response.data
                        }
                    }
                }
                window.scrollTo(0, 0);
                this.loading = false
            });
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth && this.$store.state.auth.user
        }
    }
}
</script>
