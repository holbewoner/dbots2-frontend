<template>
    <v-app light toolbar footer>
        <navigation-drawer v-bind:sidebar="sidebar" />
        <v-toolbar fixed app clipped-left>
            <v-toolbar-side-icon @click.stop="sidebar.open = !sidebar.open"></v-toolbar-side-icon>
            <v-toolbar-title>i don&rsquo;t actually know how to make this update with the page. help.</v-toolbar-title>
        </v-toolbar>
        <main class="pb-4">
            <v-content>
                <nuxt/>
            </v-content>
        </main>
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
                open: true,
                links: [
                    {to: '/users/me', icon: 'person_outline', title: 'Profile'},
                    {to: '/users/me/settings', icon: 'settings', title: 'Settings'},
                    {to: '/search', icon: 'search', title: 'Search Bots'}
                ]
            }
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
