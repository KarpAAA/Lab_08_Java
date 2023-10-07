<template>
  <div>
    <form @submit.prevent="createPizza">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="pizza.name" required>
      </div>
      <div class="form-group">
        <label for="price">Price: </label>
        <input type="number" id="price" v-model="pizza.price" required>
      </div>
      <div class="form-group">
        <label for="creationTime">Creation time: </label>
        <input type="number" id="creationTime" v-model="pizza.creationTime" required>
      </div>
      <div class="form-group">
        <label for="steps">Cooking steps:</label>
        <textarea id="steps" v-model="pizza.steps" rows="4"></textarea>
      </div>
      <button type="submit" class="btn btn-success">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "PizzaFormComponent",
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
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 150px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
