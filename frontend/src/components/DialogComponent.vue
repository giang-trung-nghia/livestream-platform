<template>
  <div class="modal fade" id="dialogModal" tabindex="-1" aria-labelledby="dialogModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="dialogModalLabel">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ message }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Modal} from 'bootstrap'
export default {
  name: 'DialogComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    show() {
      const dialogModal = new Modal(document.getElementById('dialogModal'));
      dialogModal.show();
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    },
    hide() {
      const dialogModal = new Modal(document.getElementById('dialogModal'));
      dialogModal.hide();
    }
  }
};
</script>

<style scoped>
.modal {
    z-index: 100;
}

.modal-dialog{
    margin-top: 15%;
}
</style>
