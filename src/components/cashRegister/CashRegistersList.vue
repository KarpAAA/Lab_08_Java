<template>
  <div class="d-flex flex-wrap justify-content-between">
    <div v-for="(c, index) in cashRegisters" :key='index' class="mb-2" style="width: 50%">
      <cash-register-component
          :index="index + 1"
          :cash-register="c"
          @update-paydesk="updatePaydesk">
      </cash-register-component>
    </div>
  </div>
</template>

<script>
import CashRegisterComponent from "@/components/cashRegister/CashRegisterItem.vue";
import {mapActions} from 'vuex'

export default {
  name: "CashRegisters",
  components: {CashRegisterComponent},

  props: {
    cashRegisters: [Array]
  },
  methods:{
    ...mapActions({
      updatePaydesk: 'updatePaydesk'
    })
  }

}
</script>

<style scoped>

</style>