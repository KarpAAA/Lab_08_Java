<template>
  <div class="main_container d-flex justify-content-between p-2 ">

    <div class="name d-flex justify-content-center align-items-center">
      {{ cook.name }}
    </div>


    <div class="cook_item d-flex flex-column justify-content-center">
      <div v-for="s in cook.skills" :key="s.id">
        {{ s }}
      </div>
    </div>


    <div class="buttons_list d-flex flex-column">

      <button
          class="mt-1 mb-1 btn btn-danger"
          @click="releaseCook({cookIndex: index})">
        {{ buttons[0] }}
      </button>
      <button v-if="!cook.ifWorking"
              class="mt-1 mb-1 btn btn-light"
              @click="updateCook({cookIndex: index, workingState: true})">
        {{ buttons[1] }}
      </button>
      <button v-if="cook.ifWorking" class="mt-1 mb-1 btn btn-light"
              @click="updateCook({cookIndex: index, workingState: false})">
        {{ buttons[2] }}
      </button>

    </div>

  </div>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "CookInfoItem",
  data() {
    return {
      buttons: ["RELEASE", "MAKE WORK", "MAKE FREE"]
    }
  },
  props: {
    index: {required: true},
    cook: {required: true}
  },
  methods: {
    ...mapActions({
      updateCook: 'updateCook',
      releaseCook: 'releaseCook'
    })
  }

}
</script>

<style scoped>
.main_container {
  border: 1px solid #000000;
  border-radius: 30px;
  background-color: #ffffff;
  color: #000000;
  width: 90%;
}

.cook_item {

}

.skills_list ul {

}
</style>