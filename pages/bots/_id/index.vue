<template>
    <v-container>
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
                    <v-flex>
                        <v-layout row wrap class="flex--right">
                            <like-dislike-ratio :likes="bot.stats.likes" :dislikes="bot.stats.dislikes"></like-dislike-ratio>
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
                                <v-avatar><v-icon>{{getTagData(tag).icon}}</v-icon></v-avatar> {{getTagData(tag).name}}
                            </v-chip>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-tabs dark :scrollable="false">
            <v-tabs-bar>
                <v-tabs-item ripple href="#info">Info</v-tabs-item>
                <v-tabs-item v-if="bot.commands && bot.commands.length" ripple href="#commands">Commands</v-tabs-item>
                <v-tabs-item v-if="bot.stats" ripple href="#stats">Stats</v-tabs-item>
                <v-tabs-slider />
            </v-tabs-bar>
            <v-divider class="mb-3" />
            <v-tabs-items>
                <v-tabs-content id="info" v-html="parseDescription(bot.description)">No description provided</v-tabs-content>
                <v-tabs-content id="commands" v-if="bot.commands && bot.commands.length">
                    <bot-command-list :commands="bot.commands" :categories="bot.command_categories" :prefix="activePrefix"></bot-command-list>
                </v-tabs-content>
                <v-tabs-content id="stats" v-if="bot.stats">
                    <p>TODO: stats</p>
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
import axios from '~/plugins/axios'
import BotCommandList from '~/components/bot-command-list.vue'
import LikeDislikeRatio from '~/components/like-dislike-ratio.vue'
import marked from '~/plugins/marked'

// TODO: these tags should be moved into a separate component
const tags = {
    fun: {icon: 'casino', name: 'Fun'},
    moderation: {icon: 'security', name: 'Moderation'},
    games: {icon: 'videogame_asset', name: 'Games'},
    testing: {icon: 'bug_report', name: 'Testing'}
}

export default {
    methods: {
        navigateTo(url) {
            window.open(url);
        },
        getTagData(name) {
            return (tags[name] || {icon: 'error_outline', name: 'Unknown'})
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
            return this.bot.prefix
        },
        inviteURL() {
            var url = "https://discordapp.com/oauth2/authorize?client_id=" + this.bot.id;
            var scopes = this.bot.scopes;
            if(!scopes || !scopes.length) {
                scopes = ["bot"];
            }
            url += "&scope=" + scopes.join("+");
            if(!isNaN(this.bot.permissions)) {
                url += "&permissions=" + this.bot.permissions;
            }
            if(scopes.find((s) => s !== "bot")) {
                url += "&response_type=code";
            }
            if(this.bot.redirect_uri) {
                url += "&redirect_uri=" + this.bot.redirect_uri;
            }
            url += "&state=dbots";
            return url;
        }
    },
    async asyncData({ params }) {
        let { data: bot } = await axios.get(`/bots/${params.id}`)

        return {
            bot: bot
        }
    },
    data() {
        return {
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
