<template>
    <div>
        <h2>this is an id page</h2>
    </div>
</template>

<script>
export default {
    validate ({ params }) {
        return /^[0-9]+$/.test(params.id)
    }
}
</script>
