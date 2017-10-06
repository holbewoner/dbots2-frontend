<template>
    <div class="like-dislike-ratio">
        <v-icon>thumb_up</v-icon>
        <v-progress-linear v-model="ratio" height="2" color="green" background-color="red"></v-progress-linear>
        <v-icon>thumb_down</v-icon>
    </div>
</template>

<script>
export default {
    name: 'like-dislike-ratio',

    props: ['ratio'],
}
</script>

<style scoped>
.like-dislike-ratio {
    flex: 1 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.progress-linear {
    min-width: 3rem;
    max-width: 5rem;
    margin: 1rem 1rem;
}

.icon:hover {
    color: rgba(255, 255, 255, 0.75);
}
.icon.icon--active {
    color: #ffffff;
}
</style>