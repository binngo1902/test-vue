<template>
    <div>
      <ArticleItem
        v-for="article in articles"
        :key="article.publishedAt"
        :article="article"
      />
      <TriggerLoadMore v-if="loadMoreFlag" @triggerIntersected="loadMore"/>
    </div>
  </template>
  
  <style scoped>
  div {
    overflow-x: auto;
    white-space: nowrap;
  }
  </style>
  <script>
  import ArticleItem from "./ArticleItem";
  import TriggerLoadMore from "./TriggerLoadMore";
  
  export default {
    name: "ArticlesList",
    data() {
      return {
        articles: [],
        page: 1,
        loadMoreFlag: true
      };
    },
  
    components: {
      ArticleItem,
      TriggerLoadMore
    },
  
    async mounted() {
      
    },
  
    methods: {
      async loadMore() {
        console.log(1);
        this.page += 1;
  
        let data =  [
        {
          id: 1,
          description: 'Article 1 description',
          urlToImage: 'https://example.com/image1.jpg',
          url: 'https://example.com/article1'
        },
        {
          id: 2,
          description: 'Article 2 description',
          urlToImage: 'https://example.com/image2.jpg',
          url: 'https://example.com/article2'
        },
        {
          id: 3,
          description: 'Article 3 description',
          urlToImage: 'https://example.com/image3.jpg',
          url: 'https://example.com/article3'
        },
        {
          id: 3,
          description: 'Article 3 description',
          urlToImage: 'https://example.com/image3.jpg',
          url: 'https://example.com/article3'
        },
        {
          id: 3,
          description: 'Article 3 description',
          urlToImage: 'https://example.com/image3.jpg',
          url: 'https://example.com/article3'
        },
        {
          id: 3,
          description: 'Article 3 description',
          urlToImage: 'https://example.com/image3.jpg',
          url: 'https://example.com/article3'
        },
        {
          id: 3,
          description: 'Article 3 description',
          urlToImage: 'https://example.com/image3.jpg',
          url: 'https://example.com/article3'
        },
        {
          id: 3,
          description: 'Article 3 description',
          urlToImage: 'https://example.com/image3.jpg',
          url: 'https://example.com/article3'
        },
        {
          id: 3,
          description: 'Article 3 description',
          urlToImage: 'https://example.com/image3.jpg',
          url: 'https://example.com/article3'
        },
        {
          id: 3,
          description: 'Article 3 description',
          urlToImage: 'https://example.com/image3.jpg',
          url: 'https://example.com/article3'
        },
        {
          id: 3,
          description: 'Article 3 description',
          urlToImage: 'https://example.com/image3.jpg',
          url: 'https://example.com/article3'
        }
      ]
  
        this.articles = [...this.articles, ...data];
        this.loadMoreFlag = false;
      }
    }
  };
  </script>
  