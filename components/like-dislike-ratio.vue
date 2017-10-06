<template>
    <div class="like-dislike-ratio">
        <!-- i honestly can't find a better way to do this even though it looks like shit -->
        <span class="pr-3">{{likes}}</span>
        <v-icon>thumb_up</v-icon>
        <v-progress-linear v-model="ratio" height="2" color="green" background-color="red"></v-progress-linear>
        <v-icon>thumb_down</v-icon>
        <span class="pl-3">{{dislikes}}</span>
    </div>
</template>

<script>
export default {
    name: 'like-dislike-ratio',

    props: ['likes', 'dislikes'],
    computed: {
        ratio() {
            return (this.likes / (this.likes + this.dislikes)) * 100;
        }
    }
}
</script>

<style scoped>
.like-dislike-ratio {
    flex: 1 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
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