<template>
  <div class="main_container d-flex justify-content-around p-2 ">

    <div class="name d-flex justify-content-center align-items-center">
      {{ cook.name }}
    </div>


    <div class="cook_item d-flex flex-column justify-content-center">
      <div class="skill_list" v-for="s in cook.skills" :key="s.id">
        {{ s }}
      </div>
    </div>

    <div class="buttons_list d-flex flex-column">

      <button
          class="mt-1 mb-1 btn vector_btn"
          @click="this.$emit('releaseCook',{cookId: cook.id})">
        <img :src="require('@/assets/icons/bin.svg')">
      </button>
      <button v-if="!cook.ifWorking"
              class="mt-1 mb-1 btn vector_btn_resume"
              @click="this.$emit('updateCook', {cookId:cook.id, workingState: true})">
        <img :src="require('@/assets/icons/resume.svg')">
      </button>
      <button
          v-if="cook.ifWorking"
          class="mt-1 mb-1 btn vector_btn"
              @click="this.$emit('updateCook', {cookId:cook.id, workingState: false})">
        <img :src="require('@/assets/icons/stop.svg')">
      </button>

    </div>

  </div>

</template>

<script>

export default {
  name: "CookInfoItem",
  props: {
    index: {required: true},
    cook: {required: true}
  }
}
</script>

<style scoped>
.vector_btn {
  width: fit-content;
  min-width: 40px;
  background-color: white;
}
.vector_btn_resume{
  width: fit-content;
  min-width: 40px;
  background-color: #ACCA66;
}
.skill_list {
  line-height: 21px;

}
.main_container {
  font-family: "Press Start 2P", cursive;
  font-size: 16px;
  font-weight: 800;
  line-height: 10px;
  letter-spacing: 0.135em;
  text-align: left;

  border-radius: 26px;
  background-color: #442911;
  color: white;
  width: 94%;
  border: 3px solid #442911
}

</style>