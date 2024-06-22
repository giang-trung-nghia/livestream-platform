<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Music store</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2 vh-70 scrollable">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0 ">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Name
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Author
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Copy Link
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Listen
              </th>
            </tr>
          </thead>
          <tbody class="">
            <tr v-for="(item, index) in musicData" :key="index">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ item.name }}</h6>
                    <!-- <a :href="item.link" class="text-xs text-secondary mb-0">
                      {{ item.link }}
                    </a> -->
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ item.author }}</p>
                <p class="text-xs text-secondary mb-0">{{ item.organization }}</p>
              </td>
              <td class="clickable align-middle text-center text-sm" @click="copyToClipboard(item.link)">
                <span class="badge badge-sm bg-gradient-success" >Link</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">
                  {{ item.listenCount }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  musicData: {
    type: Array,
    required: true,
    default: () => []
  }
});

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy: ', err);
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
