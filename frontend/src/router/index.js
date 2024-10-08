import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import LivestreamSetting from "../views/LivestreamSetting.vue";
import Tables from "../views/Tables.vue";
import LivestreamRoom from "../views/LivestreamRoom.vue";
import LivestreamMenu from "../views/LivestreamMenu.vue";
import MusicStore from "../views/MusicStore.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import UserManagement from "../views/UserManagement.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/me/live",
    name: "Livestream",
    component: LivestreamSetting,
    meta: { requiresAuth: true },
  },
  {
    path: "/live/:username",
    name: "LivestreamRoom",
    component: LivestreamRoom,
  },
  {
    path: "/menu",
    name: "Menu",
    component: LivestreamMenu,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/music",
    name: "Music",
    component: MusicStore,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/user",
    name: "User",
    component: UserManagement,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

// Navigation guard để kiểm tra đăng nhập
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({ name: "Signin" }); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    } else {
      next(); // Tiếp tục nếu đã đăng nhập
    }
  } else {
    next(); // Tiếp tục nếu không yêu cầu đăng nhập
  }
});

export default router;
