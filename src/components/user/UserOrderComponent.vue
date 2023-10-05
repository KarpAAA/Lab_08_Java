<template>
  <div v-if="order" class="d-flex flex-column align-items-center">

      <div class="pizza container-fluid" style="width: 80%" v-for="(pizza, index) in order.pizzaList" :key="index">
        <div class="pizza-list-item"
             :class="[{'pizza-list-item_owned': pizzaReadyStatus(pizza)}, {'pizza-list-item_not_owned': !pizzaReadyStatus(pizza)}]">
          <span class="ms-3">🍕</span>
          <div class="pizza_name ms-4">
              {{ pizza.name }}
          </div>
          <div>
            <span v-if='pizzaReadyStatus(pizza)' class="symbol">&#10004;</span>
            <span v-if='!pizzaReadyStatus(pizza)' class="symbol">&#10006;</span>
          </div>
          <div class="ms-5">💵 {{ pizza.price }}</div>
          <div></div>
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
      if (this.order.pizzaList.length === 0) {
        return 0;
      }
      const completedSteps = this.order.pizzaList.reduce((total, pizza) => {
        return total + pizza.needSteps.filter(step => step.ifMade).length;
      }, 0);

      const needSteps = this.order.pizzaList.reduce((total, pizza) => {
        return total + pizza.needSteps.length;
      }, 0);
      console.log(completedSteps);
      console.log(needSteps);
      return (completedSteps / needSteps) * 100;
    },
    pizzaReadyStatus(pizza) {
      return pizza.needSteps.every(step => step.ifMade);
    }
  }
};
</script>

<style>
.pizza_name {
 font-size: 22px;
  min-width: 100px;
}

.pizza-list-item {
  padding: 8px;
  border: 1px solid #ccc;
  margin: 5px;
  display: flex;
  align-items: center;
  border-radius: 4px;
}

.pizza-list-item_owned {
  color: black;
  background-color: white;
}

.pizza-list-item_owned {
  color: black;
}

</style>
