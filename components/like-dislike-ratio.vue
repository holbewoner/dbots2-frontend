<template>
    <div class="like-dislike-ratio">
        <!-- i honestly can't find a better way to do this even though it looks like shit -->
        <span class="likes">{{likes}}</span>
        <v-icon>thumb_up</v-icon>
        <v-progress-linear v-model="ratio" height="2" color="green" background-color="red"></v-progress-linear>
        <v-icon>thumb_down</v-icon>
        <span class="dislikes">{{dislikes}}</span>
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
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}
.progress-linear {
    max-width: 5rem;
    min-width: 3rem;
    margin: 1rem 1rem;
}

.likes, .dislikes {
    max-width: 1rem;
    flex: 1 0 auto;
}
.likes {
    margin-right: 0.5rem;
    direction: rtl;
}
.dislikes {
    margin-left: 0.5rem;
    direction: ltr;
}

.icon:hover {
    color: rgba(255, 255, 255, 0.75);
}
.icon.icon--active {
    color: #ffffff;
}
</style>