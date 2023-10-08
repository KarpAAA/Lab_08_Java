<template>
  <div class="d-flex mt-5 mb-3 justify-content-center">


    <div class="d-flex flex-wrap mt-5">
      <div class="w-50">
        <label for="login">Login:</label>
        <input type="text" id="login" v-model="cookData.login" required>
      </div>
      <div style="width: 10%;"></div>
      <div style="width: 40%;">
        <label for="age">Age:</label>
        <input type="number" min="1" id="age" v-model="cookData.age" required>
      </div>

    </div>

    <div class="d-flex flex-wrap  mt-4">
      <div class="w-50">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="cookData.name" required>
      </div>
      <div style="width: 10%;"></div>
      <div style="width: 40%;">
        <label for="salary">Salary:</label>
        <input type="number" id="salary" v-model="cookData.salary" required>
      </div>
    </div>

    <div class="form-group  mt-4 mb-5">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="cookData.password" required>
    </div>
    <div class="d-flex justify-content-center mt-2">
      <custom-button
          id="save_button"
          @click="createCook"
          :style="{ backgroundImage: 'url(' + require('@/assets/small_green_btn.svg') + ')' }">
        Save
      </custom-button>
    </div>


  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";

export default {
  name: "CookAddForm",
  components: {CustomButton},
  data() {
    return {
      cookData: {
        login: "",
        password: "",
        age: {Number},
        name: "",
        salary: {Number}
      },
    };
  },
  methods: {
    createCook() {
      this.$emit('createCook', this.cookData)
      this.cookData.login = "";
      this.cookData.password = "";
      this.cookData.name = "";
      this.cookData.age = {};
      this.cookData.salary = {};
    },
  },
};
</script>

<style scoped>
#save_button {
  width: 146px;
  height: 62px;

}


label {
  margin-bottom: 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 18px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0.135em;
  text-align: left;
  color: white;
}

input {
  font-family: 'Press Start 2P', cursive;
  min-height: 67px;
  font-size: 20px;
  width: 100%;
  padding: 10px;
  border-radius: 11px;
  background-color: #442911;
  color: white;
}
</style>
