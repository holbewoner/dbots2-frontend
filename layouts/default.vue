<template>
    <v-app light toolbar footer>
        <v-navigation-drawer persistent clipped v-model="sidebar.open" enable-resize-watcher>
            <v-list>
                <v-list-tile class="pt-3 pb-4">
                    <v-layout row class="user">
                        <v-flex xs3>
                            <v-avatar size="100%">
                                <img src="http://lorempixel.com/256/256/people" />
                            </v-avatar>
                        </v-flex>
                        <v-flex xs8 offset-xs1 class="user-info">
                            <v-menu offset-y :position-absolutely="true">
                                <span class="user-name" slot="activator">Abalabahaha#1234 <v-icon>keyboard_arrow_down</v-icon></span>
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
                <v-list-tile to="/">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    Home
                </v-list-tile>
                <v-list-tile to="/">
                    <v-list-tile-action>
                        <v-icon>person_outline</v-icon>
                    </v-list-tile-action>
                    Bots
                </v-list-tile>
                <v-list-tile to="/">
                    <v-list-tile-action>
                        <v-icon>info_outline</v-icon>
                    </v-list-tile-action>
                    About
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar fixed>
            <v-toolbar-side-icon @click.stop="sidebar.open = !sidebar.open"></v-toolbar-side-icon>
            <v-toolbar-title>some page title here probably</v-toolbar-title>
        </v-toolbar>
        <main>
            <nuxt/>
        </main>
        <v-footer fixed>
            <div>
                maybe we should put some fancy git info here !!!
            </div>
            <v-spacer></v-spacer>
            <div>&copy; {{new Date().getFullYear()}} Discord Bots</div>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            sidebar: {
                open: true
            }
        }
    }
}
</script>

<style scoped>
.user {
    color: rgba(255, 255, 255, 0.5);
}
.user .user-info {
    line-height: 1.2rem;
}
.user .user-name {
    color: rgba(255, 255, 255, 1);
    line-height: 2rem;
}
</style>
