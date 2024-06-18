<script setup>
import { ref, watch, onMounted } from "vue";
import CardLivestream from "@/views/components/CardLivestream.vue";
import { useRoute } from "vue-router";
import axios from "../services/axios";

const listLive = ref([]);
const route = useRoute();

const fetchLivestreams = async (category) => {
  try {
    const response = await axios.get(`/live/paging?category=${category}`);
    if (response.data.data) {
      listLive.value = response.data.data;
    }
  } catch (error) {
    console.error("Error fetching livestreams:", error);
  }
};

onMounted(() => {
  if (route.query.category) {
    fetchLivestreams(route.query.category);
  }
});

watch(
  () => route.query.category,
  (newCategory, oldCategory) => {
    if (newCategory !== oldCategory) {
      fetchLivestreams(newCategory);
    }
  }
);
</script>

<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row mt-4">
          <div
            v-for="live in listLive"
            :key="live._id"
            class="col-lg-3 col-md-6 col-12"
          >
            <card-livestream
              :title="live.title"
              :username="live.username"
              :fullname="live.name"
              :categories="live.categories"
              :avtImageSrc="live.avatar"
              :thumbnailSrc="live.thumbnail"
            ></card-livestream>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
