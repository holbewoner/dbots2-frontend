<template>
    <div class="like-dislike-ratio">
        <!-- i honestly can't find a better way to do this even though it looks like shit -->
        <span class="likes">{{stored_likes | numeral('0a')}}</span>
        <v-icon @click.prevent="toggleLike()" :class="{disabled: !this.controls, active: state == 1}">thumb_up</v-icon>
        <v-progress-linear v-model="ratio" height="2" color="green" background-color="red"></v-progress-linear>
        <v-icon @click.prevent="toggleDislike()" :class="{disabled: !this.controls, active: state == -1}">thumb_down</v-icon>
        <span class="dislikes">{{stored_dislikes | numeral('0a')}}</span>
    </div>
</template>

<script>
export default {
    name: 'like-dislike-ratio',

    props: ['likes', 'dislikes', 'controls'],
    computed: {
        ratio() {
            return (this._likes / (this._likes + this._dislikes)) * 100
        }
    },
    data() {
        return {
            state: 0, // -1 = dislike, 0 = neutral, 1 = like
            stored_likes: this.likes,
            stored_dislikes: this.dislikes
        }
    },
    methods: {
        // TODO: this should probably be cleaned up...
        toggleLike() {
            if (this.controls) {
                if (this.state == -1) {
                    this.state = 1
                    this.stored_dislikes -= 1
                    this.stored_likes += 1
                } else if (this.state == 0) {
                    this.state = 1
                    this.stored_likes += 1
                } else {
                    this.state = 0
                    this.stored_likes -= 1
                }

                this.$emit('onLike', this.state);
            }
        },
        toggleDislike() {
            if (this.controls) {
                if (this.state == 1) {
                    this.state = -1
                    this.stored_likes -= 1
                    this.stored_dislikes += 1
                } else if (this.state == 0) {
                    this.state = -1
                    this.stored_dislikes += 1
                } else {
                    this.state = 0
                    this.stored_dislikes -= 1
                }

                this.$emit('onDislike', this.state);
            }
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
    cursor: default;
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

.icon {
    cursor: pointer;
}

.icon.disabled {
    color: rgba(255, 255, 255, 0.35) !important;
    cursor: default !important;
}

.icon:hover {
    color: rgba(255, 255, 255, 0.65);
}
.icon.active {
    color: rgba(255, 255, 255, 0.75);
}
/*.icon.icon--active {
    color: #ffffff;
}*/
</style>