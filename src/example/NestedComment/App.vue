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
        @open-reply="openReplyForm"
        :add-replies="addRepliesToComment" 
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
            author: 'John Doe',
            text: 'This is a top-level comment',
            replies: [
              {
                id: 2,
                author: 'Jane Doe',
                text: 'This is a reply to the top-level comment',
                replies: [
                  {
                    id: 3,
                    author: 'John Doe',
                    text: 'This is a reply to the reply',
                    replies: []
                  }
                ]
              }
            ],
          }
        ]
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
            this.comments.unshift(newComment)
          } else {
            this.handleAddReply(newComment, this.activeCommentId)
          }
  
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
      },
      addRepliesToComment(commentId, randomReplies) {
        const addReplies = (comments) => {
          for (let comment of comments) {
            if (comment.id === commentId) {
              // Add random replies to this comment
              comment.replies = comment.replies || [] // Ensure replies exists
              comment.replies.push(...randomReplies)
              return true
            }
            if (comment.replies && comment.replies.length) {
              if (addReplies(comment.replies)) {
                return true
              }
            }
          }
          return false
        }
        addReplies(this.comments)
      }
    }
  }
  </script>
  
  <style>
  .app {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .new-comment-button {
    background-color: #1a73e8;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
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
    margin: 10px 0;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
  
  .button-group button {
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>