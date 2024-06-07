<!-- eslint-disable no-unused-vars -->
<template>
  <div class="embed-responsive embed-responsive-16by9">
    <video
      ref="livestream"
      class="livestream embed-responsive-item no-hover"
      webkit-playsinline="true"
      playsinline="true"
      autoplay
      preload="auto"
      poster="@/assets/img/no-livestream.jpg"
    ></video>
  </div>
  <div class="toolbar">
    <div class="btn-group" role="group" aria-label="Toolbar">
      <button type="button" class="btn btn-secondary" @click="togglePlayPause">
        <i :class="isPlaying ? 'ni ni-button-pause' : 'ni ni-button-play'"></i>
      </button>
      <button type="button" class="btn btn-secondary" @click="reloadVideo">
        <i class="fa fa-solid fa-rotate-right"></i>
      </button>
      <button type="button" class="btn btn-secondary" @click="toggleMute">
        <i class="fa fa-volume-off"></i>
      </button>
      <button type="button" class="btn btn-secondary" @click="volumeUp">
        <i class="fa fa-volume-up"></i>
      </button>
      <button type="button" class="btn btn-secondary" @click="volumeDown">
        <i class="fa fa-volume-down"></i>
      </button>
      <button type="button" class="btn btn-secondary" @click="toggleFullScreen">
        <i class="fa fa-arrows-alt"></i>
      </button>
      <button type="button" class="btn btn-secondary" @click="enterRoom">
        <i class="ni ni-curved-next"></i>
      </button>
    </div>
  </div>
</template>

<!-- eslint-disable no-unused-vars -->
<script>
import { onMounted, ref } from "vue";
import Hls from "hls.js";

export default {
  data() {
    return {
      currentTime: 0,
      isPlaying: true,
      isMuted: false,
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
  },
  setup(props) {
    const livestream = ref(null);

    onMounted(() => {
      const video = livestream.value;
      const videoSrc = props.src;
      if (Hls.isSupported()) {
        const hls = new Hls();

        hls.on(Hls.Events.ERROR, (event, data) => {
          const errorType = data.type;
          const errorDetails = data.details;
          const errorFatal = data.fatal;
          // console.error(
          //   `Hls.js error: ${errorType}, details: ${errorDetails}, fatal: ${errorFatal}`
          // );

          if (errorFatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error(
                  "fatal network error encountered, try to recover"
                );
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error("fatal media error encountered, try to recover");
                hls.recoverMediaError();
                break;
              default:
                console.error("fatal");
                hls.destroy();
                break;
            }
          }
        });

        hls.loadSource(videoSrc);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
        console.log(video);
      }
    });

    return {
      livestream,
    };
  },
  methods: {
    togglePlayPause() {
      const video = this.$refs.livestream;
      try {
        if (!video.src) {
          console.error("Video source not set.");
          return;
        }

        if (video.paused) {
          video
            .play()
            .then(() => {
              if (video.duration > 10) {
                video.currentTime = video.duration - 10;
              }
              this.isPlaying = true;
            })
            .catch((error) => {
              console.error("Error playing video:", error);
            });
        } else {
          video.pause();
          this.isPlaying = false;
        }
      } catch (error) {
        console.error("Error playing/pausing video:", error);
      }
    },
    reloadVideo() {
      const video = this.$refs.livestream;
      try {
        if (!video.src) {
          console.error("Video source not set.");
          return;
        }

        video.pause();
        video.load();
        video
          .play()
          .then(() => {
            if (video.duration > 5) {
              video.currentTime = video.duration - 5;
            }
            this.isPlaying = true;
          })
          .catch((error) => {
            console.error("Error playing video:", error);
          });
      } catch (error) {
        console.error("Error reloading video:", error);
      }
    },
    toggleMute() {
      const video = this.$refs.livestream;
      video.muted = !video.muted;
      this.isMuted = video.muted;
    },
    volumeUp() {
      const video = this.$refs.livestream;
      video.volume = Math.min(video.volume + 0.2, 1);
    },
    volumeDown() {
      const video = this.$refs.livestream;
      video.volume = Math.max(video.volume - 0.2, 0);
    },
    toggleFullScreen() {
      const video = this.$refs.livestream;
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        // Firefox
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        // IE/Edge
        video.msRequestFullscreen();
      }
    },
    enterRoom() {
      // Logic to enter room
      console.log("Entering room...");
    },
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
  content: "";
  display: block;
  padding-top: 56.25%; /* 16:9 aspect ratio */
}

.embed-responsive-4by3::before {
  content: "";
  display: block;
  padding-top: 75%; /* 4:3 aspect ratio */
}

.embed-responsive-item {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.no-hover {
  pointer-events: none;
}

.btn-group {
  height: 44px;
}

.btn {
  margin-bottom: 0.5rem;
}

.toolbar {
  display: flex;
  background-color: black;
  justify-content: center;
  align-items: center;
}
</style>
