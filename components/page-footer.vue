<template>
    <v-footer fixed>
        <div>
            maybe we should put some fancy git info here !!!
        </div>
        <v-spacer></v-spacer>
        <div>&copy; {{new Date().getFullYear()}} Discord Bots</div>
    </v-footer>
</template>

<script>
export default {
    name: 'page-footer',
    data() {
        return {
        }
    }
}
</script>
