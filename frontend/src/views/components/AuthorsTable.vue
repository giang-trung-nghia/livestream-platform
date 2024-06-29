<template>
  <div class="card">
    <div class="card-header pb-0 d-flex justify-content-between">
      <h6>Music store</h6>
      <button
        type="button"
        class="btn btn-primary"
        @click="isShowAddSong = !isShowAddSong"
        v-if="isAdmin"
      >
        Add song
      </button>
    </div>
    <div class="card-body px-0 pt-0 pb-2 vh-70 scrollable">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 w-20"
              >
                Name
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 w-20"
              >
                Author
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 w-20"
              >
                Copy Link
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 w-20"
              >
                Listen
              </th>
              <th
                v-if="isAdmin"
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 w-20"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody class="">
            <tr v-if="isShowAddSong">
              <th class="text-xxs font-weight-bolder w-20">
                <argon-input type="text" v-model="song.name" />
              </th>
              <th class="text-xxs font-weight-bolder ps-2 w-20">
                <argon-input type="text" v-model="song.author" />
              </th>
              <th class="text-xxs font-weight-bolder w-20">
                <argon-input type="text" v-model="song.link" />
              </th>
              <th class="text-center text-xxs font-weight-bolder w-20">
                <button type="button" class="btn btn-primary" @click="addSong">
                  Add
                </button>
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 w-20"
              ></th>
            </tr>
            <tr v-for="(item, index) in musicData" :key="index">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ item.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ item.author }}</p>
                <p class="text-xs text-secondary mb-0">
                  {{ item.organization }}
                </p>
              </td>
              <td
                class="clickable align-middle text-center text-sm"
                @click="copyToClipboard(item)"
              >
                <span class="badge badge-sm bg-gradient-success">Link</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">
                  {{ item.listenCount }}
                </span>
              </td>
              <td
                v-if="isAdmin"
                class="align-middle text-center"
                @click="onDeleteSong(item._id)"
              >
                <button type="button" class="btn-close"></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { useStore } from "vuex";
import axios from "@/services/axios.js";
import ArgonInput from "@/components/ArgonInput.vue";
defineProps({
  musicData: {
    type: Array,
    required: true,
    default: () => [],
  },
});
const emit = defineEmits(["onReload"]);
const store = useStore();
const isAdmin = computed(() => store.state.userInfo.role).value == "admin";
const isShowAddSong = ref(false);
const song = ref({
  name: "",
  author: "",
  link: "",
  listenCount: 0,
});

const addSong = async () => {
  try {
    const response = await axios.post("/music", song.value);
    console.log(response.data);
    song.value.name = "";
    song.value.author = "";
    song.value.link = "";
    isShowAddSong.value = false;
    emit("onReload");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

const copyToClipboard = async (song) => {
  try {
    await navigator.clipboard.writeText(song.link);
    song.listenCount += 1;
    await axios.put(`/music/${song._id}`, {
      link: song.link,
      listenCount: song.listenCount,
      name: song.name,
      author: song.author,
    });
    alert("Link copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

const onDeleteSong = async (songId) => {
  try {
    await axios.delete(`/music/${songId}`);
    emit("onReload");
  } catch (err) {
    console.error("Failed to delete: ", err);
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
.vh-70 {
  height: 70vh;
}

.scrollable {
  overflow: scroll;
}
</style>
