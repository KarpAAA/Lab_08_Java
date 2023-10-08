<template>
  <div class="d-flex mt-5 justify-content-center">

    <div class="d-flex flex-wrap mt-5">
      <div style="width: 50%">
        <div class="mb-4">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="pizza.name" required>
        </div>
        <div class="mb-4">
          <label for="price">Price: </label>
          <input type="number" id="price" v-model="pizza.price" required>
        </div>
        <div class="mb-4">
          <label for="creationTime">Creation time: </label>
          <input type="number" id="creationTime" v-model="pizza.creationTime" required>
        </div>
      </div>

      <div class="mb-5" style="width: 50%">
        <label for="steps" style="margin-left: 30px;">Cooking steps:</label>

        <textarea class="text_area_input_container" id="steps" v-model="pizza.steps"></textarea>

      </div>

    </div>

  </div>

  <div class="d-flex justify-content-center mt-5">
    <custom-button
        id="save_button"
        @click="createPizza"
        :style="{ backgroundImage: 'url(' + require('@/assets/small_green_btn.svg') + ')' }">
      Save
    </custom-button>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";

export default {
  name: "PizzaFormComponent",
  components: {CustomButton},
  mounted() {
    if (this.editPizza) {
      console.log(this.editPizza)
      this.pizza.id = this.editPizza.id;
      this.pizza.name = this.editPizza.name;
      this.pizza.price = this.editPizza.price;
      this.pizza.creationTime = Math.round(this.editPizza.creationTime / 60000);
      this.pizza.steps = this.editPizza.needSteps.map(step => step.name).join("\n");
    }
  },
  props: {
    editPizza: {}
  },
  data() {
    return {
      pizza: {
        id: null,
        name: "",
        price: 0,
        steps: "",
        creationTime: 0
      }
    };
  },
  methods: {
    createPizza() {
      this.$emit('savePizza', this.pizza);
    },
  },
};
</script>

<style scoped>
.text_area_input_container {
  border-radius: 11px;
  background-color: #442911;
  width: 100%;
  height: 100%;
  margin-left: 30px;
}

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

input, textarea{
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
