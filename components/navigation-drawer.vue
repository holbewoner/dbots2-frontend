<template>
    <v-navigation-drawer persistent clipped app v-model="sidebar.open" enable-resize-watcher>
        <v-list>
            <v-list-tile v-if="currentUser !== undefined" class="mt-3 mb-4">
                <v-menu v-if="currentUser" offset-y bottom :disabled="!sidebar.open" z-index="7">
                    <v-layout row class="user" slot="activator">
                        <v-flex xs3>
                            <v-avatar size="100%">
                                <img v-if="currentUser && currentUser.avatar" :src="'https://cdn.discordapp.com/avatars/'+currentUser.id+'/'+currentUser.avatar+'.png'" />
                                <img v-else-if="currentUser" src="http://lorempixel.com/256/256/people" />
                                <v-icon v-else-if="currentUser === null" x-large>help_outline</v-icon>
                            </v-avatar>
                        </v-flex>
                        <v-flex xs8 offset-xs1 class="user-info">
                            <span class="user-name">{{ currentUser.username}}#{{ currentUser.discriminator }} <v-icon>keyboard_arrow_down</v-icon></span>
                            <br/>
                            <!-- <span class="user-rank">Admin</span> -->
                        </v-flex>
                    </v-layout>
                    <v-list>
                        <v-list-tile to="/users/@me">
                            <v-list-tile-title>Profile</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile to="/users/@me/settings">
                            <v-list-tile-title>Settings</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="doLogout()"> <!--TODO: logout -->
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-btn v-else @click="redirectLogin()">Login</v-btn>
            </v-list-tile>
            <v-divider/>
            <v-list-tile v-for="link in links" exact :to="link.link" :key="link.link">
                <v-list-tile-action>
                    <v-icon>{{link.icon}}</v-icon>
                </v-list-tile-action>
                {{link.title}}
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'navigation-drawer',
    props: ['sidebar'],
    data() {
        return {
            links: [
                {icon: 'home', title: 'Home', link: '/'},
                {icon: 'person_outline', title: 'Bots', link: '/bots'},
                {icon: 'info_outline', title: 'About', link: '/about'}
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
.user .user-info {
    line-height: 1.2rem;
}
.user .user-name {
    color: #ffffff;
    line-height: 2rem;
}
</style>
