<template>
    <v-container v-if="!currentUser" fluid>
        <v-layout row>
            <v-flex xs12>
                <v-alert color="error" icon="warning" value="true">
                    You must be logged in to view your profile.
                </v-alert>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container v-else fluid>
        <v-layout row>
            <v-flex xs12 class="text-xs-center">
                <h2 class="display-3">Profile</h2>
                <p class="headline">Face your creations.</p>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="bot-lists">
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <bot-list-short :bots="myBots" title="My Bots" />
            </v-flex>
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <bot-list-short :bots="myUnverifiedBots" title="My Unverified Bots" unverified />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import BotListShort from '~/components/bot-list-short.vue'

export default {
    async asyncData({ params, store }) {
        let allBots = await Promise.all([
            axios.get(`/bots`, {
                params: {
                    owner_id: store.state.auth.user.id,
                    limit: 5
                }
            }),
            axios.get(`/unverified_bots`, {
                params: {
                    owner_id: store.state.auth.user.id,
                    limit: 5
                },
                headers: {
                    Authorization: store.state.auth.token
                }
            })
        ])

        return {
            myBots: allBots[0].data,
            myUnverifiedBots: allBots[1].data
        }
    },
    data() {
        return {
            limit: 5
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user
        },
    },
    components: {
        BotListShort
    }
}
</script>

<style scoped>
@media (min-width: 1904px) {
    .bot-lists .flex.xl6 {
        padding-right: 1rem;
    }
}
</style>
