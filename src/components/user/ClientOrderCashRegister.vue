<template>
  <div class="d-flex flex-column align-items-center">
    <p class="client_name_text m-0">{{client.name}}</p>

    <div class="text-center mt-3 mb-3">
      <order-items-list :orders-items="client.order.pizzaList"></order-items-list>
    </div>

  </div>
</template>

<script>
import OrderItemsList from "@/components/admin/order/OrderItemsList.vue";

export default {
  name: "ClientOfferCashRegister",
  components: {OrderItemsList},
  props: {
    client: {}
  }
}
</script>

<style scoped>
.client_name_text {
  padding: 10px 20px 10px 20px;
  background: #2F1C0B;
  color: white;
  width: fit-content;
  border-radius: 7px;
}
</style>