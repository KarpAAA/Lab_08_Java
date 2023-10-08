<template>
  <div>
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

</style>