<template>
    <div class="like-dislike-ratio">
        <v-icon>thumb_up</v-icon>
        <v-progress-linear class="ratio" v-model="ratio" height="2" color-front="green" color-back="red"></v-progress-linear>
        <v-icon>thumb_down</v-icon>
    </div>
</template>

<script>
export default {
    name: 'like-dislike-ratio',

    props: ['ratio'],
}
</script>

<style>
.like-dislike-ratio {
    display: inline-block;
    max-width: 10rem;
    margin: 0;
    padding: 0 0.5rem;
}
</style>
