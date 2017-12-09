<template>
    <v-layout row>
        <p v-if="!commands.length">No commands</p>
        <v-flex xs12 md4 v-for="category in commandCategories" v-if="category.commands.length" :key="category.name" class="px-2">
            <v-card>
                <v-list two-line>
                    <v-list-group :prepend-icon="category.icon">
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ category.name }}</v-list-tile-title>
                                <v-list-tile-sub-title v-if="category.tagline">{{ category.tagline }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-for="command in category.commands" :key="command.command">
                            <v-list-tile-action>
                                <v-icon v-if="command.icon">{{ command.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ prefix }}{{ command.command }}</v-list-tile-title>
                                <v-list-tile-sub-title v-if="command.tagline">{{ command.tagline }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-dialog max-width="800px" scrollable v-model="commandDialogs[command.command]">
                                    <v-icon class="clickable" slot="activator">info</v-icon>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">{{ prefix }}{{ command.command }}</span>
                                            <v-spacer></v-spacer>
                                            <v-btn icon @click="commandDialogs[command.command] = !commandDialogs[command.command]">
                                                <v-icon>close</v-icon>
                                            </v-btn>
                                        </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text v-html="parseDescription(command.description)">No description provided</v-card-text>
                                    </v-card>
                                </v-dialog>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list-group>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import marked from '~/plugins/marked'

export default {
    name: 'bot-command-list',
    props: ['commands', 'categories', 'prefixes'],
    methods: {
        parseDescription(description) {
            if(!description) {
                return "No description given."
            }
            return marked(description)
        }
    },
    computed: {
        prefix() {
            return this.prefixes[Math.floor(Math.random() * this.prefixes.length)]
        }
    },
    data() {
        var commandCategories = {
            uncategorized: {
                commands: [],
                name: "Uncategorized"
            }
        };
        for(let category of this.categories) {
            commandCategories[category.name] = category;
            category.commands = [];
        }
        for(let command of this.commands) {
            let category = commandCategories[command.category_name] || commandCategories.uncategorized;
            category.commands.push(command);
        }
        for(let categoryName in commandCategories) {
            commandCategories[categoryName].commands.sort((a, b) => {
                return a.command.localeCompare(b.command);
            });
        }

        return {
            commandCategories: commandCategories,

            commandDialogs: {}
        }
    }
}
</script>

<style>
</style>
