// App.vue
<template>
  <div class="app">
    <div v-if="activeReplyId" class="reply-popup">
      <textarea v-model="replyText" placeholder="Write a reply..."></textarea>
      <div class="button-group">
        <button @click="submitReply">Submit</button>
        <button @click="closeReplyForm">Cancel</button>
      </div>
    </div>

    <CommentThread
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :activeReplyId="activeReplyId"
      @open-reply="openReplyForm"
      @add-reply="handleAddReply"
    />
  </div>
</template>

<script>
import CommentThread from './components/CommentThread.vue'

export default {
  name: 'App',
  components: {
    CommentThread
  },
  data() {
    return {
      activeReplyId: null,
      replyText: '',
      comments: [
        {
          id: 1,
          author: "Alice",
          text: "This is the first comment.",
          replies: [
            {
              id: 2,
              author: "Bob",
              text: "This is a reply to the first comment.",
              replies: [],
            },
          ],
        },
        {
          id: 3,
          author: "Charlie",
          text: "This is another top-level comment.",
          replies: [],
        },
      ],
    }
  },
  methods: {
    openReplyForm(commentId) {
      this.activeReplyId = commentId
      this.replyText = ''
    },
    closeReplyForm() {
      this.activeReplyId = null
      this.replyText = ''
    },
    submitReply() {
      if (this.replyText.trim()) {
        const newReply = {
          id: Date.now(),
          author: 'You', // Replace with dynamic user
          text: this.replyText,
          replies: []
        }
        this.handleAddReply(newReply, this.activeReplyId)
        this.closeReplyForm()
      }
    },
    handleAddReply(reply, parentId) {
      const addReplyToComment = (comments) => {
        for (let comment of comments) {
          if (comment.id === parentId) {
            comment.replies = comment.replies || []
            comment.replies.push(reply)
            return true
          }
          if (comment.replies && comment.replies.length) {
            if (addReplyToComment(comment.replies)) {
              return true
            }
          }
        }
        return false
      }
      addReplyToComment(this.comments)
    }
  }
}
</script>

<style>
.reply-popup {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  z-index: 1000;
}

.reply-popup textarea {
  width: 100%;
  min-height: 100px;
  margin-bottom: 10px;
  padding: 8px;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>