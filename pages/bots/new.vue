<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 class="text-xs-center">
                <h2 class="display-3">Submit Bot</h2>
            </v-flex>
            <v-flex xs12>
                <v-card>
                    <v-card-text>
  <!-- @required_fields ~w(id library prefix tagline tags)a -->
  <!-- @optional_fields ~w(permissions redirect_uri scopes website)a -->
                        <v-form v-model="valid" @submit.prevent="submit" ref="botForm">
                            <v-container fluid grid-list-md>
                                <v-layout row wrap>
                                    <v-flex xs12 md6>
                                        <v-text-field label="Client ID" v-model="clientID" :rules="clientIDRules" placeholder="123456789123456789" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 md6>
                                        <v-select label="Library" v-model="library" :items="libraryList" :rules="libraryRules" required></v-select>
                                    </v-flex>
                                    <v-flex xs12 md6>
                                        <v-text-field label="Default Prefix" v-model="prefix" :rules="prefixRules" placeholder="Example: !,@mention" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 md6>
                                        <v-select label="Tags" v-model="tags" :items="tagList" multiple chips :rules="tagsRules" required>
                                            <template slot="selection" scope="selectedData">
                                                <v-chip close @input="selectedData.parent.selectItem(selectedData.item)" :selected="selectedData.selected" class="chip--select-multi" :key="selectedData.item.name">
                                                    <v-icon>{{ selectedData.item.icon }}</v-icon>
                                                    {{ selectedData.item.text }}
                                                </v-chip>
                                            </template>
                                            <template slot="item" scope="itemData">
                                                <template>
                                                    <v-list-tile-avatar><v-icon>{{ itemData.item.icon }}</v-icon></v-list-tile-avatar>
                                                    <v-list-tile-content>{{ itemData.item.text }}</v-list-tile-content>
                                                </template>
                                            </template>
                                        </v-select>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field label="Tagline (short description)" v-model="tagline" :rules="taglineRules" counter="128" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-checkbox v-model="agree" :rules="agreeRules" required>
                                            <span slot="label">I agree with the <a @click="">Terms and Conditions</a></span>
                                        </v-checkbox>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-checkbox v-model="notBot" :rules="notBotRules" required>
                                            <span slot="label">I am <a @click="">not a bot</a></span>
                                        </v-checkbox>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-btn @click="" :disabled="!valid">Submit</v-btn>
                                        <v-btn @click="clear()">Clear</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
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
const LIBRARY_LIST = "disco discord-rs discord.io discord.js Discord.Net discord.py Discord4J discordcr DiscordGo Discordia Discordie discordrb DSharpPlus Eris Javacord JDA Nostrum RestCord serenity SwiftDiscord Sword Custom".split(" ")

export default {
    data() {
        return {
            valid: false,

            clientID: "",
            library: "",
            prefix: "",
            tags: null,
            tagline: "",
            agree: false,
            notBot: false,

            clientIDRules: [
                // 17 but OAuth apps were invented around 22.... (length >= 18)
                (v) => (v && v.length >= 18 && v.length <= 19) || "Invalid client ID",
                // Discord OAuth around 2016 Feb 26
                (v) => (!isNaN(v) && ((+v / 4194304) + 1420070400000 >= 1456531200000) && ((+v / 4194304) + 1420070400000 <= Date.now())) || "Invalid client ID"
            ],
            libraryRules: [
                (v) => (v && !!~LIBRARY_LIST.indexOf(v)) || "Invalid library"
            ],
            prefixRules: [
                (v) => (v && v.length > 0) || "Invalid prefix",
                (v) => (v.length <= 64) || "Too long",
                (v) => (!v.match(/<@!?\d+>/)) || "Mentions should be literally\"@mention\""
            ],
            tagsRules: [
                (v) => (v && v.length > 0) || "Invalid tags",
                (v) => {
                    var invalid = v.filter((i) => !TAG_LIST.find((j) => j.value === i))
                    if(invalid.length === 1) {
                        return "Bad tag: " + JSON.stringify(invalid[0])
                    } else if(invalid.length > 1) {
                        return "Bad tags: " + JSON.stringify(invalid.join(", "))
                    }
                    return true
                }
            ],
            taglineRules: [
                (v) => (v && !!v.length) || "Invalid tagline",
                (v) => (v.length >= 16) || "Too short",
                (v) => (v.length <= 128) || "Too long"
            ],
            agreeRules: [
                (v) => !!v || "Sorry."
            ],
            notBotRules: [
                (v) => !!v || "Sorry."
            ],

            libraryList: LIBRARY_LIST,
            tagList: TAG_LIST
        }
    },
    methods: {
        clear() {
            this.$refs.botForm.reset()
        }
    }
}
</script>
