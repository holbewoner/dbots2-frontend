<template>
    <v-container fluid>
        <h1>this bot is a naughty bot</h1>
    </v-container>
</template>

<script>
export default {
    validate ({ params }) {
        return /^[0-9]+$/.test(params.id)
    },
}
</script>
