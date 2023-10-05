<template>
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
            <button class="btn btn-success me-5" @click="createCook">Create cook</button>
            <button class="btn btn-success ms-5" @click="generateClient">Generate client</button>
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

export default {
  name: "AdminPage",
  components: {OrderItems, CashRegisters, CookInfoItem, EmptyColumn, BlockComponent},
  mounted() {
    this.getRestaurant();
  },
  methods: {
    ...mapActions({
      getRestaurant: 'getRestaurant',
      updateCook: 'updateCook',
      releaseCook: 'releaseCook',
      createCook: 'createCook',
      generateClient: 'generateClient'
    })
  },
  computed: {
    ...mapState({
      cooks: state => state.restaurant.cooks,
      cashRegisters: state => state.restaurant.cashRegisters,
      completedOrders: state => state.restaurant.completedOrders,

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

