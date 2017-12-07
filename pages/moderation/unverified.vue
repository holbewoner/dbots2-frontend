<template>
    <v-container v-if="!currentUser" fluid>
        <v-layout row>
            <v-flex v-if="currentUser === null" xs12>
                <v-alert color="error" icon="warning" value="true">
                    You must be logged in to view unverified bots.
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
                <h2 class="display-3">Unverified Bots</h2>
                <p class="headline">Brace yourself.</p>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="bot-lists">
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <h6 class="title">Unverified Bots</h6>

                <bot-list-short :bots="unverifiedBots" unverified />
            </v-flex>
            <v-flex xs12 md10 offset-md1 class="mb-3">
                <v-card>
                    <v-card-text class="text-xs-center">
                        <v-pagination :length="totalPages" v-model="page" @input="getUnverifiedBots()"></v-pagination>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import BotListShort from '~/components/bot-list-short.vue'

export default {
    computed: {
        totalPages() {
            return Math.max(Math.ceil(this.totalBots / this.limit), 1)
        }
    },
    data() {
        return {
            error: null,
            loading: true,
            currentUser: undefined,

            limit: 20,
            page: 1,

            unverifiedBots: null,
            totalBots: 0
        }
    },
    methods: {
        getUnverifiedBots() {
            this.loading = true;
            axios.get(`/unverified_bots`, {
                params: {
                    limit: this.limit,
                    page: this.page
                },
                headers: {
                    Authorization: this.$store.state.auth.token
                }
            }).then((res) => {
                this.unverifiedBots = res.data
                this.totalBots = +res.headers["x-total"] || 0

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
        }
    },
    mounted() {
        this.currentUser = this.$store.state.auth && this.$store.state.auth.user

        if(!this.currentUser) {
            return
        }

        this.getUnverifiedBots()
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
