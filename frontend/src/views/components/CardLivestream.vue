<script>
import ArgonAvatar from "@/components/ArgonAvatar.vue";

export default {
  components: {
    ArgonAvatar,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    categories: {
      type: Array,
      default: () => [],
    },
    username: {
      type: String,
      required: true,
    },
    fullname: {
      type: String
    },
    thumbnailSrc: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    avtImageSrc: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  methods: {
    onRedirectRoom() {
      this.$router.push({ path: `/live/${this.username}` });
    },
  },
};
</script>

<template>
  <div class="mb-3 card card-livestream card-redirect" @click="onRedirectRoom">
    <div class="card-body">
      <div class="thumbnail">
        <img
          :src="thumbnailSrc"
          alt="thumbnail livestream"
          class="thumbnail-img"
        />
      </div>
      <div class="infor d-flex">
        <div class="live-avatar">
          <argon-avatar
            class="w-60 mt-2"
            :circular="true"
            size="lg"
            :image="avtImageSrc"
          />
        </div>
        <div class="user">
          <b class="title">{{ title }}</b>
          <p class="fullname">{{ fullname }}</p>
          <span
            class="badge badge-sm bg-gradient-dark mr-1"
            v-for="category in categories"
            :key="category"
          >
            {{ category }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-livestream {
  height: 14rem;
  --bs-card-border-width: 0;
  overflow: hidden;
}

.card-redirect {
  cursor: pointer;
}

.card-livestream .card-body {
  padding: 0;
}

.thumbnail {
  width: 100%;
  height: 9rem;
  overflow: hidden;
}

.thumbnail img {
  object-fit: cover;
}

.title, .fullname {
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title {
  font-size: 14px;
}

.infor {
  width: 100%;
  height: 5rem;
  align-items: center;
}

.user{
  width: 100%;
}

.infor p {
  margin-bottom: 0;
  font-size: 12px;
}

.thumbnail-img {
  object-fit: cover;
  width: 100%;
  height: auto;
}
.live-avatar {
  margin: 0.5rem;
}

.mr-1 {
  margin-right: 0.25rem;
}
</style>
