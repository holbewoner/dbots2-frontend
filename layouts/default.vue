<template>
    <v-app :dark="true">
        <v-navigation-drawer class="elevation-4" floating app absolute clipped v-model="drawer">
            <v-list class="py-2" dense>
                <v-list-tile v-if="currentUser">
                    <v-list-tile-avatar>
                        <img v-if="currentUser.avatar" :src="'https://cdn.discordapp.com/avatars/'+currentUser.id+'/'+currentUser.avatar+'.png'" />
                        <img v-else src="http://lorempixel.com/128/128/people" />
                        <!-- <v-icon v-else-if="currentUser === null" x-large>help_outline</v-icon> -->
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-tooltip bottom>
                            <v-list-tile-title slot="activator">{{ currentUser.username }}#{{ currentUser.discriminator }}</v-list-tile-title>
                            <span>{{ currentUser.username }}#{{ currentUser.discriminator }}</span>
                        </v-tooltip>
                        <v-list-tile-sub-title v-if="currentUser.admin">Admin</v-list-tile-sub-title>
                        <v-list-tile-sub-title v-else-if="currentUser.mod">Moderator</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-menu offset-y>
                            <v-btn flat icon slot="activator">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                            <v-list dense>
                                <v-list-tile to="/users/@me">
                                    <v-list-tile-title>Profile</v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile to="/users/@me/settings">
                                    <v-list-tile-title>Settings</v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile @click="">
                                    <v-list-tile-title>Logout</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile v-else>
                    <v-btn @click="redirectLogin()">Login</v-btn>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <navigation-drawer-list />
        </v-navigation-drawer>
        <v-toolbar class="elevation-6" app absolute clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>{{ navTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <nuxt />
        </v-content>
        <v-footer class="elevation-4" app absolute>
            <div>&copy; 2017 Discord Bots | Not affiliated with Discord Inc.</div>
        </v-footer>
    </v-app>
</template>

<script>
import NavigationDrawerList from '~/components/navigation-drawer-list.vue'

export default {
    data() {
        return {
            drawer: null,

            navTitle: "Discord Bots"
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user
        }
    },
    methods: {
        redirectLogin() {
            window.location.href = `https://discordapp.com/oauth2/authorize?client_id=152988350679220225&redirect_uri=${window.location.origin}/login&scope=identify&response_type=code&state=path:${this.$route.path}`
        },
        doLogout() {
            this.$store.dispatch("auth/logout")
        }
    },
    components: {
        NavigationDrawerList
    },
    mounted() {
        this.$store.dispatch("auth/checkCookie", document.cookie)

        const message = "bots.discord.pw"
        let position = 0;
        document.addEventListener("keypress", (e) => {
            let key = e.keyCode ? e.keyCode : e.which
            if (message.charCodeAt(position) == key) {
                position = position + 1
            } else {
                position = 0
            }

            if (position == message.length) {
                window.open("https://bots.discord.pw/intro.mp4")
                position = 0
            }
        });
    }
}
</script>
