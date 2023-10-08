<template>
  <dialog-window
      :title="dialogOption"
                 @closeModal="closeModal"
                 v-if="modalVisible">
    <admin-pizza-menu
        :isAdmin='false'
         :pizzas="menu">
    </admin-pizza-menu>

  </dialog-window>

 <div v-if="order" :style="{ backgroundImage: 'url(' + require('@/assets/background.png') + ')' }">
   <modal-order-completed-window v-if="order.completed" :client-name='order.clientName' :order-number="order.number">
   </modal-order-completed-window>

   <div class="row m-0 pt-3" style="height: 90vh">
     <div class="col-md-1"></div>

     <div class="col-md-4 ms-5 me-4" style="height: 80vh">
       <div style="height: 10vh">
         <div class="row m-0 p-0">
           <custom-button
               id="menu_button"
               @click="openModel()"
               :style="{ backgroundImage: 'url(' + require('@/assets/small_green_btn.svg') + ')' }">
             Menu
           </custom-button>
         </div>
       </div>
       <block-component class="component_styles" title="Orders">
         <user-order-component :order="order"></user-order-component>
       </block-component>
     </div>

     <div class="col-md-5 ms-5" style="height: 80vh">
       <div style="height: 10vh"></div>
       <block-component class="component_styles" title="Paydesks">

         <div class="d-flex flex-column align-items-center">
           <div class="paydesk_info d-flex justify-content-around p-3 mb-3 mt-2" style="width: 80%">
             <div><img :src="require('@/assets/icons/cash_register.svg')"></div>
             <div>Now</div>
             <div>Waiting</div>
             <div>Stand</div>
           </div>
           <user-paydesks-list
               style="width: 80%"
               @standToQueue="standToQueue"
               @leaveFromQueue="leaveFromQueue"
               :chosenPaydesk="chosenPaydeskComputed"
               :paydesks="paydesks"
               :client-index="numberId">

           </user-paydesks-list>
         </div>

       </block-component>

     </div>

<!--     <div class="col-md-3" style="height: 80vh">-->
<!--       <block-component class="component_styles" title="Menu">-->
<!--         <user-menu :pizzas="menu"></user-menu>-->
<!--       </block-component>-->
<!--     </div>-->
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
import UserOrderComponent from "@/components/user/UserOrderComponent.vue";
import ModalOrderCompletedWindow from "@/components/user/ModalOrderCompletedWindow.vue";
import ErrorComponent from "@/components/generalComponents/error/ErrorComponent.vue";
import CustomButton from "@/components/CustomButton.vue";
import DialogWindow from "@/components/generalComponents/DialogWindow.vue";
import AdminPizzaMenu from "@/components/admin/AdminPizzaMenu.vue";

export default {
  components: {
    AdminPizzaMenu,
    DialogWindow,
    CustomButton,
    ErrorComponent, ModalOrderCompletedWindow, UserOrderComponent, UserPaydesksList, BlockComponent},
  beforeMount() {
    this.getRestaurant();
  },
  name: "UserPage",
  props: {
    id: {Number}
  },
  data(){
    return{
      modalVisible: false,
      dialogOption: 'Menu',
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
    closeModal(){
      this.modalVisible = false;
    },
    openModel(){
      this.modalVisible = true;
    },
    ...mapActions({
      getRestaurant: 'getRestaurant',
      standToQueue: 'standToQueue',
      leaveFromQueue: 'leaveFromQueue'
    }),

  }
}
</script>

<style scoped>
.paydesk_info {
  border-radius: 11px;
  background-color: #442911;
  font-family: 'Press Start 2P', sans-serif;
  font-size: 24px;
  font-weight: 1000;
  line-height: 26px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #FFE082;
  -webkit-text-stroke: 2px #000; /* Товщина та колір обводки */
}
#menu_button {
  width: 146px;
  height: 62px;

}
.component_styles {
  width: 100%;
  height: 100%;
}
</style>