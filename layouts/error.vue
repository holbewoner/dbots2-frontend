<template>
    <v-app light toolbar footer>
        <navigation-drawer v-bind:sidebar="sidebar" />
        <v-toolbar fixed>
            <v-toolbar-side-icon @click.stop="sidebar.open = !sidebar.open"></v-toolbar-side-icon>
            <v-toolbar-title>some page title here probably</v-toolbar-title>
        </v-toolbar>
        <main class="pb-4">
            <v-container fluid>
                <v-layout row>
                    <v-flex xs12>
                        <div class="text-xs-center">
                            <br/> <!--temporary until i figure out how to CSS properly -->
                            <br/>
                            <br/>
                            <br/>
                            <h1>{{ error.statusCode }}</h1>
                            <p class="headline">{{ error.message }}</p>
                            <span v-if="error.statusCode === 404"><v-btn error to="/">Back to the home page</v-btn></span>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
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
