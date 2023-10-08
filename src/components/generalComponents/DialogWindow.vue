<template>
  <div id="myModal" class="d-flex justify-content-center align-items-center modal">

    <div class="title titleCook p-3" v-if="title === 'Create Cook'">{{title}}</div>
    <div class="title titleOther p-3" v-else>{{title}}</div>

    <div class="modal-content">
      <slot></slot>
      <button class="close_btn btn mt-3" @click="closeModal">
        <img :src="require('@/assets/icons/close_btn.svg')">
      </button>
    </div>

  </div>
</template>

<script>
export default {
  name: "DialogWindow",
  props: {
    title:{required:true}
  },
  methods:{
    closeModal(){
      this.$emit('closeModal');
    }
  }
};
</script>

<style scoped>
.close_btn {
  position: absolute;
  top: -6%;
  left: 97%;
}
.close_btn:active {
 border: none;
}
.title {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 40px;
  font-weight: 1000;
  line-height: 26px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #FFE082;
  -webkit-text-stroke: 3px #000;
  z-index: 1;

  width: fit-content;
  height: fit-content;
  border: 3px solid #442911;
  background-color: #442911;
  border-radius: 19px;
}
.titleCook{
  position: absolute;
  top: 4%;
  left: 40%;
}
.titleOther{
  position: absolute;
  top: 4%;
  left: 45%;
}
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
  height: 85vh;
  width: 80vw;
  background-color: #7D542D;
  border: 6px solid #442911;
  border-radius: 37px;
  color: white;
}


</style>
