<template>
    <v-app light toolbar footer>
        <navigation-drawer v-bind:sidebar="sidebar" />
        <v-toolbar fixed app clipped-left>
            <v-toolbar-side-icon @click.stop="sidebar.open = !sidebar.open"></v-toolbar-side-icon>
            <v-toolbar-title>some page title here probably (this is broken i know)</v-toolbar-title>
        </v-toolbar>
        <main class="pb-4">
            <v-content>
                <nuxt/>
            </v-content>
        </main>
        <page-footer />
    </v-app>
</template>

<script>
import PageFooter from '~/components/page-footer.vue'
import NavigationDrawer from '~/components/navigation-drawer.vue'

export default {
    data() {
        return {
            sidebar: {
                open: true,
                links: [
                    {to: '/users/me', icon: 'person_outline', title: 'Profile'},
                    {to: '/users/me/settings', icon: 'settings', title: 'Settings'},
                    {to: '/search', icon: 'search', title: 'Search Bots'}
                ]
            }
        }
    },
    components: {
        PageFooter,
        NavigationDrawer
    }
}
</script>
