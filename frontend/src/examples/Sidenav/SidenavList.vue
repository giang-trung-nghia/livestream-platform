<script setup>
import { computed, ref, watch, onUpdated } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import SidenavItem from "./SidenavItem.vue";

const store = useStore();
const isLogin = computed(() => store.state.userInfo !== "");
const listCategory = computed(() => store.state.listCategory);
const isOpenCategory = ref("");
const username = ref("");
const isAdmin = computed(() => store.state.userInfo.role == "admin");
const route = useRoute();
const getRoute = () => {
  const route = useRoute();

  const routeArr = route.path.split("/");
  return routeArr[1];
};

const selectedCategory = ref(route.query.category);

const selectCategory = (categoryValue) => {
  selectedCategory.value = categoryValue;
};

const onToggleCategory = () => {
  isOpenCategory.value = !isOpenCategory.value;
};

watch(
  () => route.query.category,
  (newValue) => {
    selectedCategory.value = newValue;
    console.log(newValue);
  },
  () => store.state.userInfo,
  (newValue) => {
    console.log(newValue.role);
    if (newValue == "admin") {
      console.log("true");
      isAdmin.value = true;
    }
    else {
      isAdmin.value = false
    }
  }
);

onUpdated(() => {
  username.value = computed(() => store.state.userInfo).value.username;
});
</script>
<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          to="/dashboard-default"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item" v-if="isAdmin">
        <sidenav-item
          to="/user"
          :class="getRoute() === 'user' ? 'active' : ''"
          :navText="'User management'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item" @click="onToggleCategory">
        <sidenav-item :navText="'Category'" type="main-router">
          <template v-slot:icon>
            <i class="ni ni-bullet-list-67 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item" v-show="isOpenCategory">
        <ul class="navbar-nav">
          <li
            v-for="category in listCategory"
            :key="category.id"
            class="nav-item sub-item"
            @click="selectCategory(category.value)"
            :class="{ active: selectedCategory === category.value }"
          >
            <sidenav-item
              :to="`/menu?category=${category.value}`"
              :navText="category.name"
              type="sub-router"
            />
          </li>
        </ul>
      </li>

      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="'ms-2'"
        >
          ACCOUNT
        </h6>
      </li>

      <li class="nav-item" v-if="isLogin">
        <sidenav-item
          to="/profile"
          :class="getRoute() === 'profile' ? 'active' : ''"
          :navText="'Profile'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item" v-if="isLogin">
        <sidenav-item
          to="/me/live"
          :class="getRoute() === 'livestream' ? 'active' : ''"
          navText="Livestream Setting"
        >
          <template v-slot:icon>
            <i class="ni ni-settings text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item" v-if="isLogin">
        <sidenav-item
          :to="`/live/${username}`"
          :class="getRoute() === `${username}` ? 'active' : ''"
          navText="My livestream"
        >
          <template v-slot:icon>
            <i class="ni ni-laptop text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item" v-if="isLogin">
        <sidenav-item
          :to="`/music`"
          :class="getRoute() === `music` ? 'active' : ''"
          navText="Music store"
        >
          <template v-slot:icon>
            <i class="ni ni-sound-wave text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item" v-if="!isLogin">
        <sidenav-item
          to="/signin"
          :class="getRoute() === 'signin' ? 'active' : ''"
          :navText="'Sign In'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-copy-04 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item" v-if="!isLogin">
        <sidenav-item
          to="/signup"
          :class="getRoute() === 'signup' ? 'active' : ''"
          :navText="'Sign Up'"
        >
          <template v-slot:icon>
            <i class="ni ni-collection text-info text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.active {
  background-color: #f6f9fc;
}

.sub-item {
  padding-left: 10px;
  font-size: 12px;
  height: 48px;
}
</style>
