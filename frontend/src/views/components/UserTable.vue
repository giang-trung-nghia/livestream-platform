<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>User</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2 vh-70 scrollable">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
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
                Email
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Role
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody class="">
            <tr v-for="(user, index) in listUser" :key="index">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <argon-avatar
                      class=""
                      :circular="true"
                      size="sm"
                      :image="user.avatar"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center ml-2">
                    <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs text-secondary mb-0">
                  {{ user.email }}
                </p>
              </td>
              <td
                class="clickable align-middle text-center text-sm"
                @click="changeRole(user)"
              >
                <span
                  class="badge badge-sm"
                  :class="
                    user.role == 'admin'
                      ? 'bg-gradient-success'
                      : 'bg-gradient-primary'
                  "
                  >{{ user.role }}</span
                >
              </td>
              <td class="clickable align-middle" @click="changeStatus(user)">
                <a
                  v-if="user.isActive"
                  class="text-warning font-weight-bold"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Disable</a
                >
                <a
                  v-else
                  class="text-success font-weight-bold"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Enable</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import ArgonAvatar from "@/components/ArgonAvatar.vue";
import axios from "@/services/axios.js";

defineProps({
  listUser: {
    type: Array,
    required: true,
    default: () => [],
  },
});

async function changeRole(user) {
  try {
    if (user.role == "admin") {
      user.role = "user";
    } else {
      user.role = "admin";
    }
    const response = await axios.put(`/user/${user._id}`, {
      role: user.role,
    });
    console.log(response);
    this.$emit("reload");
  } catch (error) {
    console.error("Failed to fetch live data:", error);
  }
}

async function changeStatus(user) {
  try {
    user.isActive = !user.isActive;
    const response = await axios.put(`/user/${user._id}`, {
      isActive: user.isActive,
    });
    console.log(response);
    this.$emit("reload");
  } catch (error) {
    console.error("Failed to fetch live data:", error);
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
.vh-70 {
  height: 70vh;
}
.ml-2 {
  margin-left: 1rem;
}
.scrollable {
  overflow: scroll;
}
</style>
