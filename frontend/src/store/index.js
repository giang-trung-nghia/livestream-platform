import { createStore } from "vuex";

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
    username: "",
    userId: "",
    token: "",
    isLivestreaming : false,
    livestreamingId: ""
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
    setLivestreaming(state) {
      state.isLivestreaming = state
    },
    setLivestreamingId(state, livestreamId) {
      state.isLivestreaming = livestreamId
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    login({ commit }, { username, userId, token }) {
      commit('setUsername', username);
      commit('setUserId', userId);
      commit('setToken', token);
      localStorage.setItem('token', token);
    },
    logout({ commit }) {
      commit('clearAuth');
      localStorage.removeItem('token');
    },
    setLivestreamingId({ commit }, id) {
      commit('setLivestreamingId', id);
    },
    initializeAuth({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('setToken', token);
      }
    }
  },
  getters: {
    isLogin: (state) => state.username !== '',
    getToken: (state) => state.token,
    livestreamingId: (state) => state.livestreamingId,
  },
});
