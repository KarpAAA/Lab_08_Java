<template>
 <div v-if="order">
   <modal-order-completed-window v-if="order.completed" :client-name='order.clientName' :order-number="order.number"></modal-order-completed-window>
   <div class="row  m-0 p-0" style="height: 10vh"></div>
   <div class="row m-0 p-0" style="height: 80vh">
     <div class="col-md-4 ms-5" style="height: 80vh">
       <block-component class="component_styles" title="Order">
         <user-order-component :order="order"></user-order-component>
       </block-component>
     </div>
     <div class="col-md-4 ms-3 me-3" style="height: 80vh">
       <block-component class="component_styles" title="Paydesks">
         <user-paydesks-list
             @standToQueue="standToQueue"
             @leaveFromQueue="leaveFromQueue"
             :chosenPaydesk="chosenPaydeskComputed"
             :paydesks="paydesks"
             :client-index="numberId"></user-paydesks-list>
       </block-component>
     </div>
     <div class="col-md-3" style="height: 80vh">
       <block-component class="component_styles" title="Menu">
         <user-menu :pizzas="menu"></user-menu>
       </block-component>
     </div>
   </div>
   <div class="row  m-0 p-0" style="height: 10vh"></div>
 </div>

  <div v-else>
   <error-component><img :src="require('@/assets/404_error_cut.jpg')"></error-component>
  </div>


</template>

<script>
import {mapActions, mapState} from "vuex";
import BlockComponent from "@/components/generalComponents/BlockComponent.vue";
import UserPaydesksList from "@/components/user/UserPaydesksList.vue";
import UserMenu from "@/components/user/UserMenu.vue";
import UserOrderComponent from "@/components/user/UserOrderComponent.vue";
import ModalOrderCompletedWindow from "@/components/user/ModalOrderCompletedWindow.vue";
import ErrorComponent from "@/components/generalComponents/error/ErrorComponent.vue";

export default {
  components: {ErrorComponent, ModalOrderCompletedWindow, UserOrderComponent, UserMenu, UserPaydesksList, BlockComponent},
  beforeMount() {
    this.getRestaurant();
  },
  name: "UserPage",
  props: {
    id: {Number}
  },
  data(){
    return{
      chosenPaydesk: -1
    }
  },
  computed: {
    numberId() {
      return parseInt(this.id)
    },
    order(){
      if(this.clients && this.clients[this.id]) return this.clients[this.id].order;
      return null;
    },
    chosenPaydeskComputed(){
      if(this.clients && this.clients[this.id])
        return this.clients[this.id].chosenPaydesk;
      return -1;
    },
    ...mapState({
      paydesks: state => state.restaurant.cashRegisters,
      clients: state => state.restaurant.clients,
      menu: state => state.restaurant.menu
    }),

  },
  methods: {
    ...mapActions({
      getRestaurant: 'getRestaurant',
      standToQueue: 'standToQueue',
      leaveFromQueue: 'leaveFromQueue'
    }),

  }
}
</script>

<style scoped>

.component_styles {
  width: 100%;
  height: 100%;
}
</style>