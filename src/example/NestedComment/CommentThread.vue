<template>
  <div class="comment-thread">
    <div class="comment">
      <p><strong>{{ comment.author }}</strong></p>
      <p>{{ comment.text }}</p>
      <button 
        @click="$emit('open-reply', comment.id)"
        class="reply-button"
      >
        Reply
      </button>

      <!-- Button to add 2 random replies -->
      <button 
        @click="addRandomReplies" 
        class="add-reply-button"
      >
        Add 2 Random Replies
      </button>
    </div>

    <!-- Recursive Comments -->
    <div class="replies" v-if="comment.replies && comment.replies.length">
      <CommentThread
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        @open-reply="$emit('open-reply', $event)"
        :add-replies="addReplies" 
      />
    </div>
  </div>
</template>

<script>

export default {
  name: "CommentThread",
  props: {
    comment: {
      type: Object,
      required: true
    },
    addReplies: { // Receive the method as a prop
      type: Function,
      required: true
    }
  },
  methods: {
    addRandomReplies() {
      // Create two random replies
      const randomReplies = [
        { id: Date.now(), author: 'Random User 1' +  Date.now(), text: 'This is a random reply!', replies: [] },
        { id: Date.now() + 1, author: 'Random User 2', text: 'Another random reply here!', replies: [] }
      ];

      // Call the method passed as a prop to add the random replies
      this.addReplies(this.comment.id, randomReplies);
    }
  }
}
</script>

<style scoped>
.comment-thread {
  margin-left: 20px;
  border-left: 1px solid #ccc;
  padding-left: 10px;
}

.comment {
  margin-bottom: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
}

.reply-button, .add-reply-button {
  background-color: transparent;
  color: #666;
  border: 1px solid #ddd;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.reply-button:hover, .add-reply-button:hover {
  background-color: #f5f5f5;
}

.replies {
  margin-top: 10px;
}
</style>