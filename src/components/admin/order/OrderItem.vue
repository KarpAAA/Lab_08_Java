<template>
  <div class="order_item_container ">
    <order-info :completedOrder="completedOrder"></order-info>
  </div>

</template>

<script>

import OrderInfo from "@/components/admin/order/OrderInfo.vue";

export default {
  name: "OrderItem",
  components: {OrderInfo},
  props: {
    completedOrder: {}
  }

}
</script>

<style scoped>

.order_item_container {
  background-color: #EEE4E4;
  border: 1px solid #000000;
  border-radius: 10px;
}
</style>