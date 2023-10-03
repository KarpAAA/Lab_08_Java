<template>
  <div class="d-flex align-items-center justify-content-around">
    <p class="text-center">{{ completedOrder.paydesk.name }}</p>
    <p class="text-center">{{ completedOrder.client.name }}</p>

    <order-items-list :orders-items="completedOrder.order.pizzaList"></order-items-list>

    <p class="text-center">{{ completedOrder.order.sum }}</p>
  </div>
</template>

<script>
import OrderItemsList from "@/components/OrderItemsList.vue";

export default {
  name: "OrderInfo",
  components: {OrderItemsList},
  props: {
    completedOrder: {required:true}
  }
}
</script>

<style scoped>

</style>