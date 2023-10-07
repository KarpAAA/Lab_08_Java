<template>
  <div class="d-flex flex-wrap justify-content-around">
    <div v-for="(order, index) in completedOrders" :key='index' class="mb-4" style="width: 100%">
      <order-item :completedOrder="order"></order-item>
    </div>
  </div>
</template>

<script>


import OrderItem from "@/components/admin/order/OrderItem.vue";

export default {
  name: "OrderItems",
  components: {OrderItem},
  props: {
    completedOrders:[Array]
  }
}
</script>

<style scoped>

</style>