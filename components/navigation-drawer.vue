<template>
    <v-navigation-drawer persistent clipped app v-model="sidebar.open" enable-resize-watcher>
        <v-list>
            <v-list-tile class="mt-3 mb-4">
                <v-layout row class="user">
                    <v-flex xs3>
                        <v-avatar size="100%">
                            <img src="http://lorempixel.com/256/256/people" />
                        </v-avatar>
                    </v-flex>
                    <v-flex xs8 offset-xs1 class="user-info">
                        <v-menu offset-y bottom :disabled="!sidebar.open" z-index="7">
                            <span class="user-name" slot="activator">abalabahaha#1234 <v-icon>keyboard_arrow_down</v-icon></span>
                            <v-list>
                                <v-list-tile to="/users/me">
                                    <v-list-tile-title>Profile</v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile to="/users/me/settings">
                                    <v-list-tile-title>Settings</v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile @click=""> <!--TODO: logout -->
                                    <v-list-tile-title>Logout</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                        <br/>
                        <span class="user-rank">Admin</span>
                    </v-flex>
                </v-layout>
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
            ]
        }
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
