<template>
    <div>
        <h3>{{ postData.title }}</h3>
        <ButtonLike :post-id="postData.id" :likes="postData.likes" />
        <PostViewDetail :post="postData"  />
    </div>
  </template>
  
  <script>
  import ButtonLike from './ButtonLike.vue';
  import PostViewDetail from './PostViewDetail.vue';
  
  export default {
    components: {
      ButtonLike,
      PostViewDetail,
    },
    props: {
        postData: {
            type: Object,
            required: true
        }
    },
   
  };
  </script>
  