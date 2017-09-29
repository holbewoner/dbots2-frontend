<template>
    <v-app light toolbar footer>
        <navigation-drawer v-bind:sidebar="sidebar" />
        <v-toolbar fixed>
            <v-toolbar-side-icon @click.stop="sidebar.open = !sidebar.open"></v-toolbar-side-icon>
            <v-toolbar-title>some page title here probably</v-toolbar-title>
        </v-toolbar>
        <main class="pb-3">
            <nuxt/>
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
                open: true
            }
        }
    },
    components: {
        PageFooter,
        NavigationDrawer
    }
}
</script>
