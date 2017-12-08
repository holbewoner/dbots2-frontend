<template>
    <v-app dark>
        <v-navigation-drawer app absolute :fixed="false" clipped v-model="drawer">
            <navigation-drawer-list />
        </v-navigation-drawer>
        <v-toolbar app absolute clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>{{ navTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <nuxt />
        </v-content>
        <v-footer app absolute>
            <div>&copy; 2017 Discord Bots | Not affiliated with Discord Inc.</div>
        </v-footer>
    </v-app>
</template>

<script>
import NavigationDrawerList from '~/components/navigation-drawer-list.vue'

export default {
    data() {
        return {
            drawer: null,

            navTitle: "Discord Bots"
        }
    },
    components: {
        NavigationDrawerList
    },
    mounted() {
        const message = "bots.discord.pw"
        let position = 0;
        document.addEventListener("keypress", (e) => {
            let key = e.keyCode ? e.keyCode : e.which
            if (message.charCodeAt(position) == key) {
                position = position + 1
            } else {
                position = 0
            }

            if (position == message.length) {
                window.open("https://bots.discord.pw/intro.mp4")
                position = 0
            }
        });
    }
}
</script>
