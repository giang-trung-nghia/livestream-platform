<script>
import axios from "@/services/axios.js";
import UserTable from "./components/UserTable.vue";

export default {
  components: {
    UserTable,
  },
  data() {
    return {
      srcVideo: String,
      listUser: [],
      isEdit: false,
    };
  },
  setup() {},
  async mounted() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const res = await axios.get(`/user`);
        console.log(res);
        this.listUser = res.data;
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
        <UserTable :listUser="listUser" 
        @reload="fetchUser"/>
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
