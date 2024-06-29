<template>
  <div class="comment-box card">
    <div class="card-header">Comments</div>
    <div class="card-body comment-content">
      <div v-for="(comment, index) in comments" :key="index" class="comment">
        <strong>{{ comment.userFullname }}:</strong> {{ comment.content }}
      </div>
    </div>
    <div class="card-footer">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          v-model="newComment"
          @keyup.enter="postComment"
          :placeholder="
            isLogin ? 'Type your comment here...' : 'Sign in to comment...'
          "
          :disabled="!isLogin"
        />
        <div class="input-group-append">
          <button
            class="btn btn-primary mb-0"
            @click="postComment"
            :disabled="!isLogin"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "@/services/axios.js";
import { computed, ref, onMounted, nextTick, onUnmounted, watch } from "vue";
import { defineProps } from "vue";
import { useStore } from "vuex";
import { io } from "socket.io-client";

// Định nghĩa props để nhận liveId và userId
const props = defineProps({
  liveId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userFullname: {
    type: String,
    required: true,
  },
});
const store = useStore();

const comments = ref([]);
const newComment = ref("");
const isLogin = computed(() => store.state.userId !== "");
let socket;

async function fetchComments() {
  try {
    console.log(props.liveId);
    const response = await axios.get(`/comment/live/${props.liveId}`);
    comments.value = response.data;
    scrollToBottom();
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}

async function postComment() {
  if (newComment.value.trim() !== "") {
    try {
      const response = await axios.post("/comment", {
        livestreamId: props.liveId,
        userId: props.userId,
        userFullname: props.userFullname,
        content: newComment.value.trim(),
      });
      // Send the new comment to WebSocket server
      console.log(response);
      socket.emit("newComment", { ...response.data, socketId: socket.id });
      newComment.value = "";
      scrollToBottom();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }
}

function scrollToBottom() {
  nextTick(() => {
    const commentContent = document.querySelector(".comment-content");
    commentContent.scrollTop = commentContent.scrollHeight;
  });
}

function setupWebSocket() {
  socket = io(`${process.env.VUE_APP_IP}${process.env.VUE_APP_PORT_WEBSOCKET}`); // Kết nối tới WebSocket server
  console.log(socket.id);

  socket.on("newComment", (data) => {
    comments.value.push(data);
    scrollToBottom();
  });

  socket.on("connect", () => {
    console.log("WebSocket connection established");
    socket.emit("registerSocketId", { socketId: socket.id });
  });

  socket.on("disconnect", () => {
    console.log("WebSocket connection closed");
  });
}

watch(
  () => props.liveId,
  (newLiveId) => {
    console.log("new live id" + newLiveId);
    if (newLiveId) {
      fetchComments();
      setupWebSocket();
    }
  }
);

onMounted(() => {
  fetchComments();
  setupWebSocket();
})

onUnmounted(() => {
  if (socket) {
    socket.disconnect();
  }
});
</script>

<style scoped>
.comment-box {
  padding-bottom: 0;
  max-width: 400px;
  margin: auto;
  border: 1px solid #ccc;
  height: 100%;
  border-radius: 5px;
}

.card-header {
  padding: 1rem !important;
}

.card-footer {
  padding: 1rem !important;
}

.message {
  margin-bottom: 10px;
}

.comment-content {
  padding: 0 1rem !important;
  overflow-y: auto;
}

.comment {
  margin-bottom: 10px;
}

.d-flex {
  justify-content: center;
  align-items: center;
}

.mb-0 {
  margin-bottom: 0 !important;
}
</style>
