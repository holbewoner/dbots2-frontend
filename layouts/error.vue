<template>
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
</template>

<script>
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
        NavigationDrawerList
    }
}
</script>
