import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: {
        data : {
            // Example initial data
            1: { id: 1, title: 'Post 1', likes: 0 , isLiked: false},
            2: { id: 2, title: 'Post 2', likes: 0 , isLiked: false},
            3: { id: 3, title: 'Post 3', likes: 0 , isLiked: false},
        }
    },
  },
  mutations: {
    actionLikes(state, postId) {
      if (state.posts.data[postId] && !state.posts.data[postId].isLiked) {
        state.posts.data[postId].likes++;
        state.posts.data[postId].isLiked = true;
      } else if (state.posts.data[postId] && state.posts.data[postId].isLiked) {
        state.posts.data[postId].likes--;
        state.posts.data[postId].isLiked = false;
        }
    }
  },
  actions: {
    incrementLikes({ commit }, postId) {
      commit('actionLikes', postId);
    },
  },
  getters: {
    getPosts(state) {
      return state.posts.data;
    },
    getPostById: (state) => (id) => {
      return state.posts.data[id];
    },
  },
});
