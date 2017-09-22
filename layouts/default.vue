<template>
    <v-app toolbar footer dark>
        <v-navigation-drawer persistent clipped v-model="sidebar.open" enable-resize-watcher>
            <v-list dense class="pt-0">
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed>
            <v-toolbar-side-icon @click.stop="sidebar.open = !sidebar.open"></v-toolbar-side-icon>
            <v-toolbar-title>some page title here probably</v-toolbar-title>
        </v-toolbar>
        <main>
            <nuxt/>
        </main>
        <v-footer>
            <div class="grey--text text--darken-2">
                Design by FiniteReality, using Vue, Nuxt and Vuetify.
                Surprised?
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
