<template>
  <div>
    <p class="text-center m-0">{{client.name}}</p>

    <div class="text-center">
      <order-items-list :orders-items="client.order.pizzaList"></order-items-list>
    </div>

  </div>
</template>

<script>
import OrderItemsList from "@/components/OrderItemsList.vue";

export default {
  name: "ClientOfferCashRegister",
  components: {OrderItemsList},
  props: {
    client: {}
  }
}
</script>

<style scoped>

</style>