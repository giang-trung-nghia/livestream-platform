import { createStore } from "vuex";
import axios from "../services/axios";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: false,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    userId: "",
    userInfo: "",
    listCategory: "",
    token: "",
    isLivestreaming: false,
    livestreamingId: "",
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    sidebarMinimize(state) {
      let sidenav_show = document.querySelector("#app");
      if (state.isPinned) {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav_show.classList.remove("g-sidenav-hidden");
        state.isPinned = true;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    setUsername(state, username) {
      state.username = username;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearAuth(state) {
      state.username = "";
      state.userId = "";
      state.token = "";
    },
    setLivestreamingId(state, livestreamId) {
      state.livestreamingId = livestreamId;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setListCategory(state, listCategory) {
      state.listCategory = listCategory;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    login({ commit }, { username, userId, token, userInfo }) {
      commit("setUsername", username);
      commit("setUserId", userId);
      commit("setToken", token);
      commit("setUserInfo", userInfo);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userInfo", userInfo);
    },
    logout({ commit }) {
      commit("clearAuth");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userInfo");
      
    },
    setLivestreamingId({ commit }, id) {
      commit("setLivestreamingId", id);
    },
    initializeAuth({ commit }) {
      const token = localStorage.getItem("token");
      if (token) {
        commit("setToken", token);
      }
    },
    setUserInfo({ commit }, userInfo) {
      commit("setUserInfo", userInfo);
    },
    setListCategory({ commit }, listCategory) {
      commit("setListCategory", listCategory);
    },
    async fetchUserInfo({ commit }, userId) {
      try {
        const response = await axios.get(`user/${userId}`);
        commit("setUserInfo", response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    async checkAndRestoreLogin({ commit, dispatch }) {
      const token = localStorage.getItem("token");
      if (token) {
        const userId = localStorage.getItem("userId");

        commit("setUserId", userId);
        commit("setToken", token);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        await dispatch("fetchUserInfo", userId);
      }
    },
  },
  getters: {
    isLogin: (state) => state.username !== "",
    getToken: (state) => state.token,
    livestreamingId: (state) => state.livestreamingId,
    getUserInfo: (state) => state.userInfo,
    getListCategory: (state) => state.listCategory,
  },
});
