<template>
  <div class="d-flex flex-wrap pizzaList justify-content-center mt-3">
    <div class="d-flex justify-content-center" v-for="(pizza, index) in pizzas" :key="index" style="width: 49%;">

      <div class="mb-3">
        <span style="font-size: 22px">{{ pizza.name }}</span>
        <p>⌚ {{ durationInHour(pizza.creationTime)}}m</p>
        <p>💵 {{ pizza.price }}</p>
        <button class="btn btn-primary">Create new</button>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name:"AdminPizzaMenu",
  props: {
    pizzas: Array
  },
  methods: {
    durationInHour(milliseconds) {
      return Math.round(milliseconds / 60000);
    }
  }
}

</script>
<style scoped>
p {
  font-size: 15px;
  margin: 0;
  padding: 0;
}


.pizzaList span::before {
  content: "\1F355";
  color: black;
  font-size: 23px;
  margin-right: 10px;
}
</style>
