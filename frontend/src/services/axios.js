import axios from 'axios';
import store from '@/store'; 

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_IP + process.env.VUE_APP_PORT_API,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getters.getToken; // Lấy token từ Vuex store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;