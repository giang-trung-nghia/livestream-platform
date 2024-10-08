<script setup>
import VideoComponent from "@/components/Video.vue";
import axios from "@/services/axios.js";
import { computed, ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import ChatBox from "./components/ChatBox.vue";

const route = useRoute();
const store = useStore();
const username = computed(() => route.params.username);
const liveId = ref("");
const userId = computed(() => store.state.userId);
const liveTitle = ref("");
const avatarUrl = ref("");
const userFullname = ref("");
const srcVideo = ref("");

async function getLiveByUserName() {
  try {
    const response = await axios.get(`/live/username/${username.value}`);
    liveId.value = response.data._id;
    store.commit("setLivestreamingId", response.data._id);
    liveTitle.value = response.data.title;
    srcVideo.value = `${process.env.VUE_APP_IP + process.env.VUE_APP_PORT_HLS}/${response.data.rtmpKey}/index.m3u8`;
  } catch (error) {
    console.error("Failed to fetch live data:", error);
  }
}

onMounted(() => {
  getLiveByUserName();
  if (store.state.userInfo.name) {
    userFullname.value = store.state.userInfo.name;
  }
});

watch(
  () => store.state.userInfo,
  (newValue) => {
    console.log("watch", newValue);
    userFullname.value = newValue.name;
    avatarUrl.value = newValue.avatar;
  }
);
</script>
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div v-if="srcVideo" class="row livestream-content">
          <div class="col-lg-8 h-100">
            <div class="card z-index-2">
              <VideoComponent :src="srcVideo"></VideoComponent>
            </div>
          </div>
          <div class="col-lg-4 h-100">
            <ChatBox
              :liveId="liveId"
              :userId="userId"
              :userFullname="userFullname"
            />
          </div>
        </div>
        <div v-else class="row">
          <div class="col-lg-10">
            <p class="badge bg-secondary p-4">Not found livestream</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  --bs-card-border-width: 0;
}

.livestream-content {
  height: 460px;
}
</style>
