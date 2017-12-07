<template>
    <v-list dense>
        <v-menu v-if="currentUser" offset-y bottom class="login-slot">
            <v-list-tile class="user my-3 pt-2" slot="activator">
                <v-list-tile-avatar>
                    <img v-if="currentUser.avatar" :src="'https://cdn.discordapp.com/avatars/'+currentUser.id+'/'+currentUser.avatar+'.png'" />
                    <img v-else-if="currentUser" src="http://lorempixel.com/128/128/people" />
                    <v-icon v-else-if="currentUser === null" x-large>help_outline</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content class="user-info pt-3">
                    <span class="user-name">{{ currentUser.username }}#{{ currentUser.discriminator }} <v-icon>keyboard_arrow_down</v-icon></span>
                    <br />
                    <span v-if="currentUser.admin" class="user-rank">Admin</span>
                    <span v-else-if="currentUser.mod" class="user-rank">Moderator</span>
                </v-list-tile-content>
            </v-list-tile>
            <v-list>
                <v-list-tile to="/users/@me">
                    <v-list-tile-title>Profile</v-list-tile-title>
                </v-list-tile>
                <v-list-tile to="/users/@me/settings">
                    <v-list-tile-title>Settings</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="doLogout()">
                    <v-list-tile-title>Logout</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
        <v-list-tile v-else-if="currentUser === null" class="my-3 pt-2">
            <v-btn @click="redirectLogin()">Login</v-btn>
        </v-list-tile>
        <v-divider></v-divider>
        <template v-for="link in links" v-if="!link.condition || link.condition()">
            <v-list-group v-if="link.children" :key="link.link" :group="link.link" :prepend-icon="link.icon"  no-action>
                <v-list-tile slot="activator" exact :to="link.link">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ link.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="childLink in link.children" :key="childLink.link" exact :to="childLink.link">
                    <v-list-tile-action v-if="childLink.icon">
                        <v-icon>{{ childLink.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ childLink.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :key="link.link" exact :to="link.link">
                <v-list-tile-action v-if="link.icon">
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ link.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list>
</template>

<script>
export default {
    name: 'navigation-drawer-list',
    data() {
        return {
            links: [
                {
                    icon: "home",
                    title: "Home",
                    link: "/"
                },
                {
                    icon: "person_outline",
                    title: "Bots",
                    children: [
                        {
                            icon: "",
                            title: "All Bots",
                            link: "/bots"
                        },
                        {
                            icon: "",
                            title: "Submit Bot",
                            link: "/bots/new"
                        }
                    ]
                },
                {
                    icon: "security",
                    title: "Moderation",
                    condition: () => !!this.currentUser && this.currentUser.mod,
                    children: [
                        {
                            icon: "",
                            title: "Unverified Bots",
                            link: "/moderation/unverified"
                        }
                    ]
                },
                {
                    icon: "info_outline",
                    title: "About",
                    link: "/about"
                }
            ],
            // object - current authenticated user, null - not logged in
            // undefined - unloaded, since auth is client-side
            currentUser: undefined
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
    mounted() {
        this.currentUser = this.$store.state.auth.user

        this.$store.subscribe((mutation, state) => {
            if(mutation.type === "auth/setUser" || mutation.type === "auth/logout") {
                this.currentUser = state.auth.user
            }
        })
    }
}
</script>

<style>
.user {
    color: rgba(255, 255, 255, 0.5);
}
.user .user-name {
    max-width: 100%;
    text-overflow: ellipsis;
    word-wrap: break-word;
}
.login-slot {
    max-width: 100%;
}
</style>
