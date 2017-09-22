<template>
    <v-app toolbar footer dark>
        <v-navigation-drawer temporary v-model="sidebar.open" enable-resize-watcher>
        </v-navigation-drawer>
        <v-toolbar fixed>
            <v-toolbar-side-icon @click.stop="sidebar.open = !sidebar.open"></v-toolbar-side-icon>
            <v-toolbar-title>some page title here probably</v-toolbar-title>
        </v-toolbar>
        <main>
            <nuxt/>
        </main>
        <v-footer></v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            sidebar: {
                open: false
            }
        }
    }
}
</script>
