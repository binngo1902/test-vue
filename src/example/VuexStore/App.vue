<template>
    <div id="app">
      <PostList />
      <link href="https://fonts.googleapis.com/css?family=Roboto:100,300" rel="stylesheet">
    </div>
  </template>
  
  <script>
  import PostList from "./components/PostList";
  
  export default {
    name: "App",
    components: {
      PostList
    }
  };
  </script>
  
  <style  scoped>
  #app {
    font-family: "Roboto", sans-serif;
  
    .news-api-link {
      display: flex;
      justify-content: center;
      position: fixed;
      bottom: 0;
      right: 0;
      width: 100%;
      background: #fff;
    }
  }
  </style>
  