<template>
  <div v-if="order" class="d-flex flex-column align-items-center">

      <div class="container-fluid" v-for="(pizza, index) in order.pizzaList" :key="index">
        <div class="pizza-list-item d-flex justify-content-around mt-2 mb-2"
             :class="[{'pizza-list-item_owned': pizzaReadyStatus(pizza)},
              {'pizza-list-item_not_owned': !pizzaReadyStatus(pizza)}]">
          <div class="pizza_name mt-2 mb-2">
              {{ pizza.name }}
          </div>

          <div class="ms-5  mt-2 mb-2">💵 {{ pizza.price }}</div>

        </div>
      </div>

      <order-progress-bar class="mt-3" :duration="3000" :target-width="calculateCompletionPercentage()"></order-progress-bar>

  </div>
</template>

<script>
import OrderProgressBar from "@/components/user/OrderProgressBar.vue";

export default {
  components: {OrderProgressBar},
  props: {
    order: {}
  },
  methods: {
    calculateCompletionPercentage() {
      const completedSteps = this.order.pizzaList.reduce((total, pizza) => {
        return total + pizza.needSteps.filter(step => step.ifMade).length;
      }, 0);

      const needSteps = this.order.pizzaList.reduce((total, pizza) => {
        return total + pizza.needSteps.length;
      }, 0)
      return (completedSteps / needSteps) * 100;
    },
    pizzaReadyStatus(pizza) {
      return pizza.needSteps.every(step => step.ifMade);
    }
  }
};
</script>

<style>

.pizza-list-item {
  background-color: #442911;
  padding: 8px;
  border-radius: 11px;
  margin: 5px;
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 20px;
  font-weight: 800;
  line-height: 20px;
  letter-spacing: 0.135em;
  text-align: left;

}

.pizza-list-item_owned {
  color: black;
  background-color: white;
}

.pizza-list-item_owned {
  color: black;
}

</style>
