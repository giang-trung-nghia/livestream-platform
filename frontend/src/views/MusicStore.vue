<!-- eslint-disable vue/no-unused-components -->
<script>
import axios from "@/services/axios.js";
import ArgonButton from "@/components/ArgonButton.vue";
import AuthorsTable from "./components/AuthorsTable.vue";

export default {
  components: {
    ArgonButton,
    AuthorsTable,
  },
  data() {
    return {
      srcVideo: String,
      listSong: [],
      isEdit: false,
    };
  },
  setup() {},
  async mounted() {
    await this.fetchMusicStore();
  },
  methods: {
    async fetchMusicStore() {
      try {
        const res = await axios.get(`/music`);
        console.log(res);
        this.listSong = res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-12">
        <AuthorsTable :musicData="listSong" />
      </div>
    </div>
  </div>
</template>

<style
  src="../../node_modules/vue-multiselect/dist/vue-multiselect.css"
></style>

<style scoped>
.mr-2 {
  margin-right: 0.5rem;
}
</style>
