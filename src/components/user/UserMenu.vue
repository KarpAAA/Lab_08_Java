<template>
  <div class="d-flex flex-wrap pizzaList justify-content-center mt-3">
    <div class="d-flex justify-content-center" v-for="(pizza, index) in pizzas" :key="index" style="width: 49%;">

      <div class="mb-3">
        <span style="font-size: 22px">{{ pizza.name }}</span>
        <p>⌚ {{ parseDuration(pizza.creationTime) + 'm' }}</p>
        <p>💵 {{ pizza.price  }}</p>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: {
    pizzas: Array
  },
  methods:{
   parseDuration(duration) {
    if (duration.startsWith("PT")) {
      const minutes = parseInt(duration.replace(/\D/g, ''), 10);
      if (!isNaN(minutes)) {
        return minutes;
      }
    }
    return null; // Повертаємо null у випадку некоректного формату
  }
  }
}
</script>
<style scoped>
p{
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
