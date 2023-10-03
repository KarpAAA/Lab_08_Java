<template>
  <div class="order">
    <p class="ms-3 text-start fw-bold">Order {{ order.orderNumber}}</p>

    <ul class="pizzaList">
      <li v-for="(pizza,index) in this.order.pizzas" :key="index" class="pizza mb-4">
        <span class="ms-3 text-start fw-bold">{{ pizza.name }}</span>
        <ul class="stepsList">
          <li v-for="(step,stepIndex) in pizza.steps" :key="stepIndex" class="step">

              <span class="ms-3 text-start fw-bold">{{ step.name }}</span>

          </li>
        </ul>

      </li>
    </ul>

  </div>
</template>


<script>
export default {
  name: "CookOrderItem",

  props: {
   order:{
     required: true
   }
  }
}
</script>

<style scoped>
.order {
  border-radius: 30px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
}
.pizzaList, .stepsList {
  list-style: none;
}

.pizzaList li::before {
  content: "\1F355";
  font-size: 25px;
}


.stepsList li::before {
  content: "\1F52A";
  font-size: 20px;
}

.pizzaList li,
.stepsList li {
  white-space: pre;
}
</style>
