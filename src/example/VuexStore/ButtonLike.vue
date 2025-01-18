<template>
    <button :class="{disabled : isDisabled }"  @click="incrementLike">Like {{ likes }}</button>
</template>
<style scoped>
    .disabled {
        background-color: grey;
        cursor: not-allowed;
        pointer-events: none;
    }   
 </style>
<script>
import { mapActions } from 'vuex';

export default {
    props: ['postId', 'likes'],
    data() {
        return {
            isDisabled: false,
        };
    },
    methods: {
        ...mapActions(['incrementLikes']),
        incrementLike() {
            this.isDisabled = true;
            setTimeout(() => {
                this.incrementLikes(this.postId);
                this.isDisabled = false;
            }, 1000);
        },
    },
};
</script>