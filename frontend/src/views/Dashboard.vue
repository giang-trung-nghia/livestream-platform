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
      curVideoIndex: 0,
    };
  },
  setup() {},
  async beforeMount() {
    const response = await axios.get("/live/paging");
    if (response.data.data) {
      this.listlive = response.data.data;
      const newLive = this.listlive[this.curVideoIndex];
      this.srcVideo = `${process.env.VUE_APP_IP + process.env.VUE_APP_PORT_HLS}/${newLive.rtmpKey}/index.m3u8`;
      // console.log(this.srcVideo);
    }
  },
  methods: {
    onVideoError() {
      if (this.curVideoIndex < this.listlive.length-1) {
        this.srcVideo = `${process.env.VUE_APP_IP + process.env.VUE_APP_PORT_HLS}/${this.listlive[++this.curVideoIndex].rtmpKey}/index.m3u8`;
        // console.log(this.curVideoIndex);
        // console.log(this.srcVideo);
      }
    },
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
                @video-error="onVideoError"
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

<style scoped>
.card {
  --bs-card-border-width: 0;
}
</style>
