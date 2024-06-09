<template>
  <div class="embed-responsive embed-responsive-16by9">
    <div v-if="videoError">
      <img :src="placeholderImage" alt="Video not available" />
    </div>
    <video
      v-else
      id="video-player"
      class="video-js vjs-default-skin"
      controls
      preload="auto"
    >
      <source :src="src" type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script>
import { ref } from "vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default {
  data() {
    return {
      currentTime: 0,
      isPlaying: true,
      isMuted: false,
      player: null,
      videoError: false,
    };
  },
  props: {
    src: {
      type: String,
    },
    title: {
      type: String,
      default: "untitle",
    },
    placeholderImage: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const livestream = ref(null);
    console.log(props);

    return {
      livestream,
    };
  },
  methods: {
    enterRoom() {
      // Logic to enter room
      console.log("Entering room...");
    },
  },
  mounted() {
    this.player = videojs("video-player", {
      html5: {
        hls: {
          overrideNative: true,
        },
      },
    });
    try {
      this.player.ready(() => {
        this.player.on("loadedmetadata", () => {
          this.player.currentTime(this.player.duration());
        });

        // Prevent seeking
        this.player.on("seeking", () => {
          if (this.player.currentTime() > this.player.duration() - 10) {
            this.player.currentTime(this.player.duration());
          }
        });

        this.player.on("ended", () => {
          this.player.pause();
        });

        // Handle video error
        this.player.on("error", () => {
          this.videoError = true;
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style scoped>
.embed-responsive {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  --bs-card-border-width: 0;
}

.embed-responsive-16by9::before {
  display: block;
  content: "";
  width: 100%;
  padding-top: 56.25%; /* 16:9 ratio (9/16*100) */
}

.embed-responsive-16by9 > video,
.embed-responsive-16by9 > div {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-js {
  width: 100%;
  /* height: 500px; */
}

.toolbar {
  display: flex;
  background-color: black;
  justify-content: center;
  align-items: center;
}
</style>
