<script>
import axios from "@/services/axios.js";
import { computed } from "vue";
import { useStore } from "vuex";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonAlert from "@/components/ArgonAlert.vue";
import DialogComponent from "@/components/DialogComponent.vue";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";

export default {
  components: {
    MiniStatisticsCard,
    ArgonButton,
    ArgonInput,
    ArgonAlert,
    DialogComponent,
  },
  data() {
    return {
      srcVideo: String,
      isCreateLive: false,
      title: "",
      streamingKey: "",
      streamingURL: "",
      dialogTitle: "",
      dialogMessage: "",
      userId: "",
      showAlert: false,
      isEdit: false,
    };
  },
  setup() {},
  async mounted() {
    const store = useStore();
    // const isLivestreaming = computed(() => store.state.isLivestreaming);
    const userId = computed(() => store.state.userId);
    this.userId = userId.value;
    await this.fetchStreamingInfoByUserId(userId.value);

    this.streamingURL = process.env.VUE_APP_IP + process.env.VUE_APP_PORT_LIVE;
  },
  methods: {
    async copyToClipboard(item) {
      try {
        await navigator.clipboard.writeText(item);
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    },

    async fetchStreamingInfoByUserId(id) {
      try {
        const res = await axios.get(`/live/user/${id}`);
        if (res.data === "") {
          this.isCreateLive = true;
        } else {
          this.isCreateLive = false;
          const data = res.data;
          this.title = data.title;
          this.thumbnailUrl = data.thumbnail;
          this.streamingKey = res.data.streamingKey;
          this.$store.dispatch("setLivestreamingId", res.data._id);
        }
      } catch (error) {
        if (error.response.data.message == "Not found live stream!") {
          this.isCreateLive = true;
        }
        console.error(error);
      }
    },

    async createLivestream() {
      try {
        const res = await axios.post(`/live`, {
          title: this.title,
          userId: this.userId,
        });

        this.streamingKey = res.data.streamingKey;
        this.$store.dispatch("setLivestreamingId", res.data._id);
      } catch (error) {
        this.dialogTitle = "Error";
        this.dialogMessage = error.response
          ? error.response.data.message[0]
          : "An error occurred during create live.";
        this.$refs.dialog.show();
        console.error(error);
      }
    },

    async endLivestream() {
      try {
        const liveId = this.$store.getters.livestreamingId;
        const res = await axios.put(`/live/end/${liveId}`, {});
        console.log(res);
        this.isCreateLive = true;
      } catch (error) {
        this.dialogTitle = "Error";
        this.dialogMessage = error.response
          ? error.response.data.message
          : "An error occurred during end live.";
        this.$refs.dialog.show();
        console.error(error);
      }
    },

    async onCreate() {
      await this.createLivestream();
      await this.fetchStreamingInfoByUserId(this.userId);
    },

    async onEndlive() {
      await this.endLivestream();
    },
  },
};
</script>
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-10 mb-lg">
        <div class="card z-index-2">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header pb-2">
                  <div class="d-flex align-items-center">
                    <p class="mb-0">Create Livestream</p>
                    <div class="ms-auto">
                      <argon-button
                        v-if="isEdit"
                        @click="onSave"
                        color="success"
                        size="sm"
                        class="mr-2"
                        >Save</argon-button
                      >
                      <argon-button
                        v-if="isCreateLive"
                        @click="onCreate"
                        color="primary"
                        size="sm"
                        class="ms-auto"
                        >Create</argon-button
                      >
                      <argon-button
                        v-else
                        @click="isEdit = !isEdit"
                        color="primary"
                        size="sm"
                        class="mr-2"
                        >Edit</argon-button
                      >
                      <argon-button
                        v-if="!isCreateLive"
                        @click="onEndlive"
                        color="warning"
                        size="sm"
                        class="mr-2"
                        >End Live</argon-button
                      >
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <p class="text-uppercase text-sm">Livestream Information</p>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="row">
                        <label
                          for="example-text-input"
                          class="form-control-label"
                          >Title</label
                        >
                        <argon-input
                          :disabled="!isCreateLive && !isEdit"
                          type="text"
                          v-model="title"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="streamingKey"
        @click="copyToClipboard(streamingKey)"
        class="clickable col-lg-10 col-md-10 mt-4 col-12"
      >
        <MiniStatisticsCard
          title="Streaming url"
          :value="streamingURL"
          :description="`Streaming Key: <p><b>${streamingKey}</b></p>`"
          :icon="{
            component: 'ni ni-air-baloon',
            background: 'bg-gradient-success',
            shape: 'rounded-circle',
          }"
        />
      </div>
    </div>
  </div>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1050">
    <argon-alert v-if="showAlert" color="success">
      {{ "Link copied to clipboard!" }}
    </argon-alert>
  </div>
  <DialogComponent ref="dialog" :title="dialogTitle" :message="dialogMessage" />
</template>

<style
  src="../../node_modules/vue-multiselect/dist/vue-multiselect.css"
></style>

<style scoped>
.mr-2 {
  margin-right: 0.5rem;
}

.multiselect__tags {
  height: 50px; /* Chiều cao mong muốn */
  min-height: unset;
}

.clickable {
  cursor: pointer;
}
</style>
