<template>
    <v-app light toolbar footer>
        <navigation-drawer v-bind:sidebar="sidebar" />
        <v-toolbar fixed>
            <v-toolbar-side-icon @click.stop="sidebar.open = !sidebar.open"></v-toolbar-side-icon>
            <v-toolbar-title>some page title here probably</v-toolbar-title>
        </v-toolbar>
        <main class="pb-3">
            <v-container fluid>
                <v-layout row>
                    <v-flex xs12>
                        <section>
                            <v-container class="hero">
                                <div class="text-xs-center">
                                    <br/> <!--temporary until i figure out how to CSS properly -->
                                    <br/>
                                    <br/>
                                    <br/>
                                    <h1>{{ error.statusCode }}</h1>
                                    <p class="headline">{{ error.message }}</p>
                                    <p v-if="error.statusCode === 404"><v-btn error to="/">Back to the home page</v-btn></p>
                                </div>
                            </v-container>
                        </section>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
        <footer />
    </v-app>
</template>

<script>
export default {
    props: ['error'],
    head() {
        return {
            title: this.error.message || 'An error occured'
        }
    }
}
</script>
