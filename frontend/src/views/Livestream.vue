<script>
import axios from "@/services/axios.js";
import { computed } from "vue";
import { useStore } from "vuex";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import DialogComponent from "@/components/DialogComponent.vue";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import Multiselect from "vue-multiselect";

export default {
  components: {
    MiniStatisticsCard,
    ArgonButton,
    ArgonInput,
    DialogComponent,
    Multiselect,
  },
  data() {
    return {
      srcVideo: String,
      isCreateLive: false,
      title: "",
      thumbnailUrl: "",
      streamingKey: "",
      streamingURL: "",
      dialogTitle: "",
      dialogMessage: "",
      categories: [],
      selectedCategories: [],
      userId: "",
      isEdit: false,
    };
  },
  setup() {},
  async beforeMount() {
    await this.fetchCategories();
  },

  async mounted() {
    const store = useStore();
    const isLivestreaming = computed(() => store.state.isLivestreaming);
    const userId = computed(() => store.state.userId);
    this.userId = userId.value;
    if (!isLivestreaming.value) {
      await this.fetchStreamingInfoByUserId(userId.value);
    }

    this.streamingURL = process.env.VUE_APP_LIVESTREAM_URL;
  },
  methods: {
    async fetchCategories() {
      try {
        const res = await axios.get(`/category`);
        this.categories = res.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
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
          this.selectedCategories = this.categories.filter((x) =>
            data.categories.includes(x.value)
          );
          this.streamingKey = res.data.streamingKey;
        }
      } catch (error) {
        console.error("Error generating streaming key:", error);
      }
    },

    async createLivestream(store) {
      try {
        const res = await axios.post(`/live`, {
          title: this.title,
          thumbnail: this.thumbnailUrl,
          userId: this.userId,
          categories: this.selectedCategories.map((e) => e.value),
        });

        console.log(res.data);
        this.streamingKey = res.data.streamingKey;
        store.dispatch("setLivestreamingId", res.data._id);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    async onCreate() {
      await this.createLivestream();
      await this.fetchStreamingInfoByUserId(this.userId);
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
                        class="ms-auto"
                        >Edit</argon-button
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
                      <div class="row">
                        <label
                          for="example-text-input"
                          class="form-control-label"
                          >Thumbnail URL</label
                        >
                        <argon-input
                          :disabled="!isCreateLive && !isEdit"
                          type="text"
                          v-model="thumbnailUrl"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row">
                        <label
                          for="example-text-input"
                          class="form-control-label"
                          >Category</label
                        >
                        <div class="multi-select-box">
                          <Multiselect
                            :disabled="!isCreateLive && !isEdit"
                            v-model="selectedCategories"
                            :options="categories"
                            :multiple="true"
                            :close-on-select="false"
                            :clear-on-select="false"
                            :preserve-search="true"
                            placeholder="Pick some category"
                            label="name"
                            track-by="name"
                          >
                          </Multiselect>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="col-lg-10 col-md-10 mt-4 col-12">
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
</style>
