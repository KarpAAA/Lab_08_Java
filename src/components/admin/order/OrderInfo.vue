<template>
  {{completedOrder.order.number}}
  {{dateTimeToHour(completedOrder.order.createdOrderTime)}}
  {{dateTimeToHour(completedOrder.order.finishedOrderTime)}}
  <div class="d-flex align-items-center justify-content-around">
    <p class="text-center">{{ completedOrder.paydesk.name }}</p>
    <p class="text-center">{{ completedOrder.client.name }}</p>

    <order-items-list :orders-items="completedOrder.order.pizzaList"></order-items-list>

    <p class="text-center">{{ completedOrder.order.sum }}</p>
  </div>
</template>

<script>
import OrderItemsList from "@/components/admin/order/OrderItemsList.vue";

export default {
  name: "OrderInfo",
  components: {OrderItemsList},
  props: {
    completedOrder: {required:true}
  },
  methods: {
    dateTimeToHour(dataTime){
      const parts = dataTime.split(':');
      return parts[0]+":" + parts[1];
    }
  }
}
</script>

<style scoped>

</style>