<template>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <p>DEAR {{clientName}}</p>
      <p>Your order #{{orderNumber}} was completed!!!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalOrderCompletedWindow",
  props: {
    orderNumber:{Number},
    clientName:{}
  }
}
</script>

<style scoped>

.modal {
  display:block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
}

.modal-content {
  background-color: #02b019;
  color: white;
  font-size: 25px;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  position: absolute;
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


</style>