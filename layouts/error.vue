<template>
    <v-app light toolbar footer>
        <navigation-drawer v-bind:sidebar="sidebar" />
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="sidebar.open = !sidebar.open"></v-toolbar-side-icon>
            <v-toolbar-title>some page title here probably</v-toolbar-title>
        </v-toolbar>
        <main class="pb-4">
            <v-content>
                <v-container fluid>
                    <v-layout row>
                        <v-flex xs12>
                            <div class="text-xs-center hero">
                                <h1>{{ error.statusCode }}</h1>
                                <p class="headline">{{ error.message }}</p>
                                <span v-if="error.statusCode === 404">
                                    <v-btn exact to="/">Home</v-btn>
                                </span>
                                <v-btn @click="$router.go(-1)">Go Back</v-btn>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
        </main>
        <page-footer />
    </v-app>
</template>

<script>
import PageFooter from '~/components/page-footer.vue'
import NavigationDrawer from '~/components/navigation-drawer.vue'

export default {
    props: ['error'],
    data() {
        return {
            sidebar: {
                open: true
            }
        }
    },
    head() {
        return {
            title: this.error.message || 'An error occured'
        }
    },
    components: {
        PageFooter,
        NavigationDrawer
    }
}
</script>
