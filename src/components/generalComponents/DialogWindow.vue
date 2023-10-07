<template>
  <div id="myModal" class="d-flex modal">
    <div class="modal-content">
      <slot></slot>
      <button class="btn btn-danger mt-3" @click="closeModal">Close</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "DialogWindow",
  methods:{
    closeModal(){
      this.$emit('closeModal');
    }
  }
};
</script>

<style scoped>
.modal {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  z-index: 1;
}

.modal-content {
  position: absolute;
  left: 38%;
  top: 10%;
  background-color: #fefefe;
  width: 25%;
  padding: 20px;
  border: 1px solid #888;
}


</style>
