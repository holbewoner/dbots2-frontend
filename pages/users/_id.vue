<template>
    <h2>user by id</h2>
</template>

<script>
export default {
    validate ({ params }) {
        return /^[0-9]+$/.test(params.id)
    }
}
</script>
