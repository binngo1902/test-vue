<template lang="">
    <div>
      <h2>Post List</h2>
      <div v-for="post in postsArray" :key="post.id" class="post">
        <PostView :post-data="post" />
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import PostView from './PostView.vue';

export default {
    components: {
        PostView,
    },
    computed: {
        ...mapGetters(['getPosts']),
        postsArray() {
            return Object.values(this.getPosts); // Convert posts object to an array for rendering
        },
    },
}
</script>
<style lang="">
    
</style>