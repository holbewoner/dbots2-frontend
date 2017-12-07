<template>
    <!-- <v-app dark toolbar footer> -->
        <!-- <navigation-drawer :sidebar="sidebar" /> -->
        <!-- <v-toolbar app fixed clipped-left> -->
            <!-- <v-toolbar-side-icon @click.stop="sidebar.open = !sidebar.open"></v-toolbar-side-icon> -->
            <!-- <v-toolbar-title>{{ navTitle }}</v-toolbar-title> -->
        <!-- </v-toolbar> -->
        <!-- <v-content> -->
            <v-container fluid>
                <v-layout row wrap>
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
        <!-- </v-content> -->
        <!-- <page-footer /> -->
    <!-- </v-app> -->
</template>

<script>
import PageFooter from '~/components/page-footer.vue'
import NavigationDrawerList from '~/components/navigation-drawer-list.vue'

export default {
    props: ['error'],
    data() {
        return {
            sidebar: {
                open: true
            },
            navTitle: "Discord Bots"
        }
    },
    // head() {
    //     return {
    //         title: "Discord Bots"
    //     }
    // },
    components: {
        PageFooter,
        NavigationDrawerList
    }
}
</script>
