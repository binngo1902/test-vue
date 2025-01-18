<template>
    <div>
      <h4>Post Detail</h4>
      <p>Likes: {{ post.likes }}</p>
      <ButtonLike :post-id="post.id" :likes="post.likes" />
    </div>
  </template>
  
  <script>
  import ButtonLike from './ButtonLike.vue';
  
  export default {
    props: ['post'],
    components: {
      ButtonLike,
    },
 
  };
  </script>
  