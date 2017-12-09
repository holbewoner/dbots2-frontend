<template>
    <v-list class="pt-0" dense>
        <template v-for="link in links" v-if="!link.condition || link.condition()">
            <v-list-group v-if="link.children" :key="link.link" :group="link.link" :prepend-icon="link.icon" no-action>
                <v-list-tile slot="activator" :to="link.link">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ link.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="childLink in link.children" :key="childLink.link" exact :to="childLink.link">
                    <v-list-tile-action v-if="childLink.icon">
                        <v-icon>{{ childLink.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ childLink.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :key="link.link" exact :to="link.link">
                <v-list-tile-action v-if="link.icon">
                    <v-icon>{{ link.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ link.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list>
</template>

<script>
export default {
    name: 'navigation-drawer-list',
    data() {
        return {
            links: [
                {
                    icon: "home",
                    title: "Home",
                    link: "/"
                },
                {
                    icon: "person_outline",
                    title: "Bots",
                    children: [
                        {
                            icon: "",
                            title: "All Bots",
                            link: "/bots"
                        },
                        {
                            icon: "",
                            title: "Submit Bot",
                            link: "/bots/new"
                        }
                    ]
                },
                {
                    icon: "security",
                    title: "Moderation",
                    condition: () => !!this.currentUser && this.currentUser.mod,
                    children: [
                        {
                            icon: "",
                            title: "Unverified Bots",
                            link: "/moderation/unverified"
                        }
                    ]
                },
                {
                    icon: "info_outline",
                    title: "About",
                    link: "/about"
                }
            ]
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user
        }
    }
}
</script>
