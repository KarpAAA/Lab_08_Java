<template>
  <dialog-window
      @closeModal="closeModal"
      v-if="modalVisible">
    <cook-add-form v-if="dialogOption === 'createCook'" @createCook="createCookMethod"></cook-add-form>
    <admin-pizza-menu v-if="dialogOption === 'openMenu'" :pizzas="menu"></admin-pizza-menu>
  </dialog-window>

  <div class="row m-0 p-0" style="height: 100vh; background-color: #96c8ee;">
    <empty-column :count='1'></empty-column>

    <div class="col-md-5">
      <div class="row" style="height: 10vh"></div>
      <div class="row" style="height: 60vh">
        <block-component class="cookContainer" title="Cooks">

          <div class="d-flex justify-content-center m-0 mt-2" v-for="(cook, index) in cooks"
               :key='index'>
            <CookInfoItem
                @updateCook="updateCook"
                @releaseCook="releaseCook"
                :cook='cook' :index='index'>
            </CookInfoItem>
          </div>
        </block-component>
      </div>

      <div class="row mt-2" style="height: 18vh">
        <block-component title="Operate">
          <div class="d-flex justify-content-center">
            <button class="btn btn-success me-5" @click="openModal('createCook')">Create cook</button>
            <button class="btn btn-success me-5" @click="openModal('openMenu')">Menu</button>
          </div>
        </block-component>
      </div>
      <div class="row" style="height: 10vh"></div>
    </div>

    <empty-column :count='1'></empty-column>

    <div class="col-md-4">
      <div class="row" style="height: 10vh"></div>
      <div class="row" style="height: 40vh">
        <block-component class="other_container" title="Cash registers">
          <cash-registers :cash-registers='cashRegisters'></cash-registers>
        </block-component>
      </div>

      <div class="row" style="height: 10vh"></div>

      <div class="row" style="height: 30vh">
        <block-component class="other_container" title="All orders">
          <p style="text-align: center;font-size: 20px">💵 {{ income }}</p>
          <order-items :completedOrders="completedOrders"></order-items>
        </block-component>
      </div>

      <div class="row" style="height: 10vh"></div>
    </div>
    <empty-column :count='1'></empty-column>
  </div>

</template>

<script>


import BlockComponent from "@/components/BlockComponent.vue";
import EmptyColumn from "@/utils/EmptyColumn.vue";
import CookInfoItem from "@/components/adminComponents/CookInfoItem.vue";
import CashRegisters from "@/components/cashRegister/CashRegistersList.vue";
import OrderItems from "@/components/orders/OrderItems.vue";
import {mapState, mapActions} from 'vuex'
import DialogWindow from "@/components/DialogWindow.vue";
import AdminPizzaMenu from "@/components/adminComponents/AdminPizzaMenu.vue";
import CookAddForm from "@/components/CookAddForm.vue";

export default {
  name: "AdminPage",
  components: {
    CookAddForm,
    AdminPizzaMenu,
     DialogWindow, OrderItems, CashRegisters, CookInfoItem, EmptyColumn, BlockComponent},
  data(){
    return{
      modalVisible: false,
      dialogOption: 'createCook'
    }
  },
  mounted() {
    this.getRestaurant();
  },
  methods: {
    closeModal(){
      this.modalVisible = false;
    },
    openModal(dialogOption){
      this.dialogOption = dialogOption;
      this.modalVisible = true;
    },
    createCookMethod(cookInfo){
      this.createCook(cookInfo);
      this.closeModal();
    },
    ...mapActions({
      getRestaurant: 'getRestaurant',
      updateCook: 'updateCook',
      releaseCook: 'releaseCook',
      createCook: 'createCook'
    })
  },
  computed: {
    ...mapState({
      cooks: state => state.restaurant.cooks,
      cashRegisters: state => state.restaurant.cashRegisters,
      completedOrders: state => state.restaurant.completedOrders,
      income: state => state.restaurant.income,
      menu: state => state.restaurant.menu
    })
  }
}
</script>

<style scoped>

.cookContainer {
  height: 100%;
  width: 100%;
}

.other_container {
  width: 100%;
  height: 100%;
}
</style>

