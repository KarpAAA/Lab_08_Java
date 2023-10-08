<template>
  <dialog-window
      @closeModal="closeModal"
      v-if="modalVisible">
    <cook-add-form v-if="dialogOption === 'createCook'" @createCook="createCookMethod"></cook-add-form>
    <admin-pizza-menu
        @deletePizza="deletePizzaMethod"
        @pizzaUpdate="pizzaUpdate" v-if="dialogOption === 'openMenu'" :pizzas="menu"></admin-pizza-menu>
    <pizza-form-component
        @savePizza="savePizzaMethod"
        :edit-pizza='pizzaForForm'
        v-if="dialogOption === 'pizza'" :pizzas="menu"></pizza-form-component>
  </dialog-window>

  <div class="row m-0 p-0"
       :style="{ backgroundImage: 'url(' + require('@/assets/background.png') + ')' }">
    <empty-column :count='1'></empty-column>

    <div class="col-md-5">

      <div class="row pt-2" style="height: 10vh">
        <custom-button
            id="menu_button"
            @click="openModal('openMenu')"
            :style="{ backgroundImage: 'url(' + require('@/assets/small_green_btn.svg') + ')' }"
        >Menu</custom-button>
      </div>

      <div class="row" style="height: 80vh">
        <block-component class="cookContainer" title="Cooks">
          <div class="d-flex flex-column">
            <div class="d-flex justify-content-center m-0 mb-3" v-for="(cook, index) in cooks"
                 :key='index'>
              <CookInfoItem
                  @updateCook="updateCook"
                  @releaseCook="releaseCook"
                  :cook='cook' :index='index'>
              </CookInfoItem>
            </div>
            <button class="add_cook_btn align-self-center mb-3"
                    @click="openModal('createCook')">
              <img :src="require('@/assets/icons/add_btn.svg')">

            </button>
          </div>

        </block-component>
      </div>


    </div>


    <div class="col-md-5 ms-4">
      <div class="row" style="height: 10vh"></div>
      <div class="row" style="height: 40vh">
        <block-component class="other_container" title="Cash registers">
          <div class="d-flex flex-wrap">
          <cash-registers :cash-registers='cashRegisters'></cash-registers>
          </div>
        </block-component>
      </div>

      <div class="row" style="height: 2vh"></div>
      <div class="row" style="height: 38vh">
        <block-component class="other_container" title="All orders">
          <p class="income_text">{{ income }} 💵</p>
          <order-items :completedOrders="completedOrders"></order-items>
        </block-component>
      </div>

      <div class="row" style="height: 10vh"></div>
    </div>
    <empty-column :count='1'></empty-column>
  </div>

</template>

<script>


import BlockComponent from "@/components/generalComponents/BlockComponent.vue";
import EmptyColumn from "@/components/generalComponents/EmptyColumn.vue";
import CookInfoItem from "@/components/admin/CookInfoItem.vue";
import CashRegisters from "@/components/admin/CashRegistersList.vue";
import OrderItems from "@/components/admin/order/OrderItems.vue";
import {mapState, mapActions} from 'vuex'
import DialogWindow from "@/components/generalComponents/DialogWindow.vue";
import AdminPizzaMenu from "@/components/admin/AdminPizzaMenu.vue";
import CookAddForm from "@/components/admin/forms/CookAddForm.vue";
import PizzaFormComponent from "@/components/admin/forms/PizzaFormComponent.vue";
import CustomButton from "@/components/CustomButton.vue";

export default {
  name: "AdminPage",
  components: {
    CustomButton,
    PizzaFormComponent,
    CookAddForm,
    AdminPizzaMenu,
     DialogWindow, OrderItems, CashRegisters, CookInfoItem, EmptyColumn, BlockComponent},
  data(){
    return{
      modalVisible: false,
      dialogOption: 'createCook',
      pizzaForForm:{}
    }
  },
  mounted() {
    this.getRestaurant();
  },
  methods: {
    pizzaUpdate(param){
      this.pizzaForForm = param;
      this.dialogOption = 'pizza';
    },
    closeModal(){
      this.modalVisible = false;
    },
    openModal(dialogOption){
      this.dialogOption = dialogOption;
      this.modalVisible = true;
    },
    createCookMethod(cookInfo){
      this.createCook(cookInfo);
      this.dialogOption = 'createCook';
    },
    savePizzaMethod(pizzaInfo){
      this.savePizza(pizzaInfo);
      this.dialogOption = 'openMenu';
    },
    deletePizzaMethod(pizzaId){
      this.deletePizza({id:pizzaId})
      this.dialogOption = 'openMenu';
    },
    ...mapActions({
      getRestaurant: 'getRestaurant',
      updateCook: 'updateCook',
      releaseCook: 'releaseCook',
      createCook: 'createCook',
      savePizza: 'savePizza',
      deletePizza: 'deletePizza'
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
.income_text {
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  line-height: 11px;
  letter-spacing: 0.135em;
  color: white;
}

.add_cook_btn {
  min-width: 50px;
  width: fit-content;
  background: none;
  border: none;
}
#menu_button {
  width: 146px;
  height: 62px;

}
.cookContainer {
  height: 100%;
  width: 100%;
}

.other_container {
  width: 100%;
  height: 100%;
}
</style>

