<script>
import VideoComponent from "@/components/Video.vue";
import axios from "@/services/axios.js";
import CardLivestream from "@/views/components/CardLivestream.vue";

export default {
  components: {
    VideoComponent,
    CardLivestream,
  },
  data() {
    return {
      srcVideo: "",
      listlive: [],
    };
  },
  setup() {},
  async beforeMount() {

    const response = await axios.get("/live/paging");
    if (response.data.data) {
      this.listlive = response.data.data;
      const newLive = this.listlive[0];
      this.srcVideo = `http://192.168.1.9:8080/hls/${newLive.rtmpKey}/index.m3u8`;
      console.log(this.srcVideo);
    }
  },
};
</script>
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-9 mb-lg">
            <div class="card z-index-2">
              <VideoComponent
                :src="srcVideo"
                v-if="srcVideo.length != '0'"
              ></VideoComponent>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div
            v-for="live in listlive"
            :key="live._id"
            class="col-lg-3 col-md-6 col-12"
          >
            <card-livestream
              :title="live.title"
              :username="live.username"
              :name="live.name"
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

<style scoped>
.card {
  --bs-card-border-width: 0;
}
</style>
