<template>
    <v-app dark toolbar footer>
        <navigation-drawer :sidebar="sidebar" />
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="sidebar.open = !sidebar.open"></v-toolbar-side-icon>
            <v-toolbar-title>{{ navTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <nuxt />
        </v-content>
        <page-footer />
    </v-app>
</template>

<script>
import PageFooter from '~/components/page-footer.vue'
import NavigationDrawer from '~/components/navigation-drawer.vue'

export default {
    data() {
        return {
            sidebar: {
                open: true
            },
            navTitle: "Discord Bots"
        }
    },
    components: {
        PageFooter,
        NavigationDrawer
    }
}

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

</script>
