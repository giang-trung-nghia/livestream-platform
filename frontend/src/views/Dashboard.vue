<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import VideoComponent from "@/components/Video.vue";
import axios from "@/services/axios.js";
import CardLivestream from "@/views/components/CardLivestream.vue";

export default {
  components: {
    MiniStatisticsCard,
    VideoComponent,
    CardLivestream,
  },
  data() {
    return {
      srcVideo: [],
    };
  },
  setup() {},
  async beforeMount() {
    const response = await axios.get("/live/paging");
    console.log(response.data.data);
    const newLive = response.data.data[0];
    this.srcVideo = `http://192.168.1.9:8080/hls/${newLive.streamingKey}/index.m3u8`;
  },
};
</script>

<style scoped></style>
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
        <div class="row mt-3">
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Today's Money"
              value="$53,000"
              description="<span
                class='text-sm font-weight-bolder text-success'
                >+55%</span> since yesterday"
              :icon="{
                component: 'ni ni-money-coins',
                background: 'bg-gradient-primary',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Today's Users"
              value="2,300"
              description="<span
                class='text-sm font-weight-bolder text-success'
                >+3%</span> since last week"
              :icon="{
                component: 'ni ni-world',
                background: 'bg-gradient-danger',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="New Clients"
              value="+3,462"
              description="<span
                class='text-sm font-weight-bolder text-danger'
                >-2%</span> since last quarter"
              :icon="{
                component: 'ni ni-paper-diploma',
                background: 'bg-gradient-success',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Sales"
              value="$103,430"
              description="<span
                class='text-sm font-weight-bolder text-success'
                >+5%</span> than last month"
              :icon="{
                component: 'ni ni-cart',
                background: 'bg-gradient-warning',
                shape: 'rounded-circle',
              }"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card-livestream
              title="123"
              username="hello nghia day"
              :categories="['game', 'liveshow']"
              avatar
            ></card-livestream>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card-livestream></card-livestream>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card-livestream></card-livestream>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card-livestream></card-livestream>
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
