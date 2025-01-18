<template>
  <div class="app">
    <button class="new-comment-button" @click="openNewComment">
      Add New Comment
    </button>

    <!-- Centralized Reply Popup -->
    <div v-if="showReplyPopup" class="reply-popup">
      <p><strong>{{ isNewComment ? 'New Comment' : 'Reply' }}</strong></p>
      <textarea v-model="replyText" placeholder="Write your comment..."></textarea>
      <div class="button-group">
        <button @click="submitReply">Submit</button>
        <button @click="closeReplyForm">Cancel</button>
      </div>
    </div>

    <!-- Comment Threads -->
    <CommentThread
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :parent-path="[comment.id]"
      @open-reply="openReplyForm"
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
      showReplyPopup: false,
      replyText: '',
      activeCommentId: null,
      isNewComment: false,
      comments: [
        {
          id: 1,
          author: 'binh',
          text: 'biasdpoasdopas',
          replies: [
            {
              id: 4,
              author: 'binh',
              text: 'biasdpoasdopas',
              replies: []
            }
          ]
        },
        {
          id: 2,
          author: 'binh',
          text: 'biasdpoasdopas',
          replies: []
        },
        {
          id: 3,
          author: 'binh',
          text: 'biasdpoasdopas',
          replies: []
        }
      ]
    }
  },
  computed: {
    commentPaths() {
      const paths = new Map()
      const traverseComments = (comments, parentPath = []) => {
        comments.forEach(comment => {
          const currentPath = [...parentPath, comment.id]
          paths.set(comment.id, currentPath)

          if (comment.replies) {
            traverseComments(comment.replies, currentPath)
          }
        })
      }

      traverseComments(this.comments)
      return paths
    },
    isReplyActive() {
      return this.activeCommentId !== null
    }
  },
  methods: {
    openNewComment() {
      this.showReplyPopup = true
      this.isNewComment = true
      this.activeCommentId = null
      this.replyText = ''
    },
    openReplyForm(commentId) {
      this.showReplyPopup = true
      this.isNewComment = false
      this.activeCommentId = commentId
      this.replyText = ''
    },
    closeReplyForm() {
      this.showReplyPopup = false
      this.replyText = ''
      this.activeCommentId = null
      this.isNewComment = false
    },
    submitReply() {
      if (this.replyText.trim()) {
        const newComment = {
          id: Date.now(),
          author: 'You',
          text: this.replyText,
          replies: []
        }

        if (this.isNewComment) {
          this.comments.push(newComment)
        } else {
          this.handleAddReply(newComment, this.activeCommentId)
        }

        this.closeReplyForm()
      }
    },
    handleAddReply(reply, parentId) {
      // Direct path access using the Map
      const path = this.commentPaths.get(parentId)
      if (!path) return

      // Navigate directly to the parent comment
      let target = this.comments
      for (let i = 0; i < path.length - 1; i++) {
        const comment = target.find(c => c.id === path[i])
        if (!comment) return
        target = comment.replies
      }

      // Add the reply to the parent's replies
      const parentComment = target.find(c => c.id === path[path.length - 1])
      if (parentComment) {
        parentComment.replies = parentComment.replies || []
        parentComment.replies.push(reply)
      }
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
