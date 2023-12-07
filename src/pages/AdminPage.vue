<template>
  <dialog-window :title="dialogOption"
                 @closeModal="closeModal"
                 v-if="modalVisible">
    <cook-add-form v-if="dialogOption === 'Create Cook'" @createCook="createCookMethod"></cook-add-form>
    <admin-pizza-menu
        :is-admin="true"
        @deletePizza="deletePizzaMethod"
        @pizzaUpdate="pizzaUpdate" v-if="dialogOption === 'Menu'" :pizzas="menu"></admin-pizza-menu>
    <pizza-form-component
        @savePizza="savePizzaMethod"
        :edit-pizza='pizzaForForm'
        v-if="dialogOption === 'Pizza'" :pizzas="menu"></pizza-form-component>
  </dialog-window>


  <div class="row m-0 p-0"
       :style="{ backgroundImage: 'url(' + require('@/assets/background.png') + ')' }">
    <empty-column :count='1'></empty-column>

    <div class="col-md-5">

      <div class="row pt-2" style="height: 10vh">
        <custom-button
            id="menu_button"
            @click="openModal('Menu')"
            :style="{ backgroundImage: 'url(' + require('@/assets/small_green_btn.svg') + ')' }"
        >Menu
        </custom-button>
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
                    @click="openModal('Create Cook')">
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
          <p class="income_text">{{ stat.income }} 💵 {{ stat.ratingIn5.toFixed(1) }} ⭐️</p>
          <div class="d-flex justify-content-center mt-2 mb-2">
            <button
                class="btn btn-light me-3 strategyClass"
                :class="{ 'active': chosenStrategy === 'Default'}"
                @click="changeStrategyDefault"
            >Default strategy</button>
            <button
                class="btn btn-light strategyClass"
                :class="{ 'active': chosenStrategy === 'Other'}"
                @click="changeStrategyOther"
            >Other strategy</button>
          </div>
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
    DialogWindow, OrderItems, CashRegisters, CookInfoItem, EmptyColumn, BlockComponent
  },
  data() {
    return {
      chosenStrategy: "Default",
      modalVisible: false,
      dialogOption: 'Create Cook',
      pizzaForForm: {}
    }
  },
  methods: {
    changeStrategyOther(){
      this.changeStrategyToOther();
      this.chosenStrategy='Other'
    },
    changeStrategyDefault(){
      this.changeStrategyToDefault();
      this.chosenStrategy='Default'
    },
    pizzaUpdate(param) {
      this.pizzaForForm = param;
      this.dialogOption = 'Pizza';
    },
    closeModal() {
      this.modalVisible = false;
    },
    openModal(dialogOption) {
      this.dialogOption = dialogOption;
      this.modalVisible = true;
    },
    createCookMethod(cookInfo) {
      this.createCook(cookInfo);
      this.dialogOption = 'Create Cook';
    },
    savePizzaMethod(pizzaInfo) {
      this.savePizza(pizzaInfo);
      this.dialogOption = 'Menu';
    },
    deletePizzaMethod(pizzaId) {
      this.deletePizza({id: pizzaId})
      this.dialogOption = 'Menu';
    },
    ...mapActions({
      updateCook: 'updateCook',
      releaseCook: 'releaseCook',
      createCook: 'createCook',
      savePizza: 'savePizza',
      deletePizza: 'deletePizza',
      changeStrategyToDefault: 'changeStrategyToDefault',
      changeStrategyToOther: 'changeStrategyToOther',
    })
  },
  computed: {
    ...mapState({
      cooks: state => state.restaurant.cooks,
      cashRegisters: state => state.restaurant.cashRegisters,
      completedOrders: state => state.restaurant.stat.completedOrders,
      stat: state => state.restaurant.stat,
      menu: state => state.restaurant.menu
    })
  }
}
</script>

<style scoped>
.strategyClass:hover{
  background-color: #2F1C0B;
  color: white;
}
.strategyClass{
  font-family: 'Press Start 2P', cursive;
  font-size: 20px;
  background-color: #442911;
  color: white;
  border:none
}

.active {
  background-color: #d5d5d5;
  color: black;
}
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

