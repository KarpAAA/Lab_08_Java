<template>
  <div ref="orderContainer">

    <div class="d-flex justify-content-center">
      <div class="time_container p-2">
        {{ dateTimeToHour(completedOrder.order.createdOrderTime) }} -
        {{ dateTimeToHour(completedOrder.order.finishedOrderTime) }}
      </div>
    </div>


    <div class="d-flex flex-wrap align-items-center order_container">

      <div class="d-flex align-items-center justify-content-center border_left_line" :style="lineStyle">
          {{completedOrder.order.number}}
      </div>
      <div class="d-flex align-items-center justify-content-center border_left_line" :style="lineStyle">
        CR-{{ completedOrder.paydesk.index + 1 }}
      </div>

      <div class="d-flex align-items-center justify-content-center border_left_line border_right_line" :style="lineStyle">
        {{ completedOrder.client.name }}
      </div>

      <div style="width: 40%;">
        <order-items-list
            class="d-flex flex-column align-items-center mt-2"
            :orders-items="completedOrder.order.pizzaList">
        </order-items-list>
      </div>


      <div class="d-flex align-items-center justify-content-center border_left_line" :style="lineStyle" >
        {{ completedOrder.order.sum }}
      </div>
    </div>
  </div>

</template>

<script>
import OrderItemsList from "@/components/admin/order/OrderItemsList.vue";

export default {
  name: "OrderInfo",
  components: {OrderItemsList},
  data() {
    return {
      lineStyle: {}
    };
  },
  mounted() {
    const orderContainerHeight = this.$refs.orderContainer.clientHeight;
    console.log(orderContainerHeight);
    this.lineStyle = { height: `${orderContainerHeight}px` };
  },
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
.time_container {

  border: 5px solid #7D542D;
  background-color: #442911;
  color: white;
  border-radius: 8px;

  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.135em;
  text-align: left;
}
.border_right_line {
  border-right: 8px solid #7D542D;
  text-align: center;
  width: 20%;
}
.border_left_line {
  border-left: 8px solid #7D542D;
  text-align: center;
  width: 15%;
}
.order_container{
  height: fit-content;
  border-radius: 7px;
  background-color: #442911;
  color: white;

  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.135em;
  text-align: left;

}
</style>