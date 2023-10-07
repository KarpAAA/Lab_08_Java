<template>

    <div v-for="(c, index) in cashRegisters" :key='index' class="mb-2" style="width: 49%">
      <cash-register-component
          class="ms-2"
          :index="index + 1"
          :cash-register="c"
          @update-paydesk="updatePaydesk">
      </cash-register-component>
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