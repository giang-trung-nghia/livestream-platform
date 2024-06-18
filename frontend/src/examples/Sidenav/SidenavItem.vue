<!-- eslint-disable no-unused-vars -->
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const store = useStore();
const isRTL = computed(() => store.state.isRTL);
const sidebarMinimize = () => store.commit("sidebarMinimize");
const router = useRouter();

const minimizeSidebar = () => {
  if (window.innerWidth < 1200) {
    sidebarMinimize();
  }
};

const props = defineProps({
  to: {
    type: String,
  },
  navText: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "router-link",
  },
});
const toCategory = () => {
  router.push(props.to);
};
</script>
<template>
  <router-link
    v-if="type == 'router-link'"
    :to="to"
    class="nav-link"
    @click="minimizeSidebar"
  >
    <div
      class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center"
    >
      <slot name="icon"></slot>
    </div>
    <span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">{{
      navText
    }}</span>
  </router-link>
  <div v-if="type == 'main-router'" class="main-router nav-link no-select">
    <div
      class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center"
    >
      <slot name="icon"></slot>
    </div>
    <span class="nav-link-text ms-1">{{ navText }}</span>
  </div>
  <div v-if="type == 'sub-router'" class="sub-router nav-link no-select" @click="toCategory">
    <div
      class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center"
    >
      <slot name="icon"></slot>
    </div>
    <span class="nav-link-text ms-1">{{ navText }}</span>
  </div>
</template>

<style scoped>
.nav-link {
  cursor: pointer;
}

.no-select {
  user-select: none; /* Standard syntax */
  -webkit-user-select: none; /* Chrome, Safari, Opera */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}

</style>
