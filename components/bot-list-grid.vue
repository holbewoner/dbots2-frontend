<template>
    <v-card>
        <v-toolbar>
            <v-toolbar-title v-if="title">{{ title }}</v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12 md4 v-for="bot in bots" :key="bot.id" class="px-1">
                    <v-card color="blue darken-2" class="elevation-4" dense>
                        <v-card-title class="px-3 py-2">
                            <div>
                                <h3 class="headline">{{ bot.name }}</h3>
                            </div>
                            <v-spacer></v-spacer>
                            <v-avatar v-if="bot.icon" size="64px">
                                <img class="elevation-4" :src="'https://cdn.discordapp.com/app-icons/'+bot.id+'/'+bot.icon+'.jpg'" @error.once="onAvatarLoadError" />
                            </v-avatar>
                        </v-card-title>
                        <v-card-text class="px-3 py-2">
                            <span>{{ bot.tagline }}</span>
                        </v-card-text>
                        <v-card-actions class="px-3 py-2">
                            <v-btn flat :to="'/bots/'+bot.id">View</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: 'bot-list-grid',
    props: ['bots', 'title'],
    methods: {
        onAvatarLoadError(event) {
            event.target.src = "/defaulticon.jpg"
            event.target.style = `background-color:#f00;transform:rotate(${~~(Math.random() * 360)}deg)`
        }
    }
}
</script>

<style scoped>
</style>
