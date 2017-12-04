<template>
    <v-container v-if="!currentUser" fluid>
        <v-layout row>
            <v-flex v-if="currentUser === null" xs12>
                <v-alert color="error" icon="warning" value="true">
                    You must be logged in to view your profile.
                </v-alert>
            </v-flex>
            <v-flex v-else xs12 class="text-xs-center">
                <p class="headline">Authenticating</p>
                <v-progress-circular indeterminate></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>
    <v-container v-else-if="currentUser" fluid>
        <v-layout row>
            <v-flex xs12 class="text-xs-center">
                <h2 class="display-3">Profile</h2>
                <p class="headline">Face your creations.</p>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="bot-lists">
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <h6 class="title">My Bots</h6>

                <bot-list-short :bots="myBots" />
            </v-flex>
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <h6 class="title">My Unverified Bots</h6>

                <bot-list-short :bots="myUnverifiedBots" :unverified="true" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import BotListShort from '~/components/bot-list-short.vue'

export default {
    data() {
        return {
            error: null,
            loading: true,
            currentUser: undefined,

            limit: 5,

            myBots: null,
            myUnverifiedBots: null
        }
    },
    mounted() {
        this.currentUser = this.$store.state.auth && this.$store.state.auth.user

        if(!this.currentUser) {
            return
        }

        this.loading = true;
        Promise.all([
            axios.get(`/bots`, {
                params: {
                    owner_id: this.currentUser.id,
                    limit: this.limit
                }
            }),
            axios.get(`/unverified_bots`, {
                params: {
                    owner_id: this.currentUser.id,
                    limit: this.limit
                },
                headers: {
                    Authorization: this.$store.state.auth.token
                }
            })
        ]).then((allBots) => {
            this.myBots = allBots[0].data,
            this.myUnverifiedBots = allBots[1].data

            this.loading = false;
        }).catch((err) => {
            console.log(err && err.response && err.response.data || err)
            if(err.response && err.response.data && err.response.data.error) {
                if(Array.isArray(err.response.data.error)) {
                    this.error = err.response.data.error.join(", ")
                } else {
                    this.error = err.response.data.error
                }
            } else {
                this.error = "Unknown API error"
            }
            this.loading = false
        });
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
