<template>
  <div class="d-flex flex-wrap pizzaList justify-content-center mt-5">
    <div class="d-flex justify-content-center ms-3 me-3 mt-3"  ref="pizzaContainer" v-for="(pizza, index) in pizzas" :key="index">

      <div class="pizza_container mb-3">

        <div class="mt-3 ms-3 me-3">
          <p class="text_pizza_name">{{ pizza.name }}</p>
        </div>

        <div class="mt-4 d-flex flex-wrap">
          <span class="mt-2 text_def" style="width: 35%;">⌚</span>
          <span class="mt-2 text_def w-50">{{ durationInHour(pizza.creationTime) }}M</span>
          <span class="mt-2 text_def" style="width: 35%">💵</span>
          <span class="mt-2 text_def w-50">{{ pizza.price }}</span>
        </div>


        <div class="mt-4 ms-2 me-2 mb-3 d-flex justify-content-between">
          <button v-if="isAdmin" class="btn vector_btn me-2"
                  @click="this.$emit('pizzaUpdate',pizza)">
            <img :src="require('@/assets/icons/edit.svg')">
          </button>
          <button v-if="isAdmin"
              class="btn vector_btn ms-2"
              @click="this.$emit('deletePizza',pizza.id)">
            <img :src="require('@/assets/icons/bin.svg')">
          </button>
        </div>

      </div>

    </div>
    <div v-if="isAdmin" class="pizza_container ms-3 me-3 mt-3 mb-3 d-flex justify-content-center" :style="containerStyle">
      <button class="add_cook_btn align-self-center mb-3"
              @click="this.$emit('pizzaUpdate')">
        <img :src="require('@/assets/icons/add_btn.svg')">

      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPizzaMenu",
  data() {
    return {
      containerStyle: {}
    };
  },

  mounted() {
      const pizzaContainer = this.$refs.pizzaContainer[0];
      const containerWidth = pizzaContainer.clientWidth;
      this.containerStyle = { width: `${containerWidth}px` };
  },
  props: {
    pizzas: Array,
    isAdmin: {
      type:Boolean,
      required: true
    }
  },
  methods: {
    durationInHour(milliseconds) {
      return Math.round(milliseconds / 60000);
    }
  }
}

</script>
<style scoped>
.add_cook_btn {
  min-width: 50px;
  width: fit-content;
  background: none;
  border: none;
}

.text_pizza_name {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 28px;
  font-weight: 1000;
  line-height: 26px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #FFE082;
  -webkit-text-stroke: 2px #000; /* Товщина та колір обводки */
}

.text_def {
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.135em;
  text-align: left;

}

.pizza_container {
  border-radius: 14px;
  border: 1px solid #000000;
  background-color: #442911;
}

.vector_btn {
  width: 45px;
  height: 40px;
  background-color: white;
}


</style>
