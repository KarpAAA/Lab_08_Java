<template>
  <div
      :class="{'cash_register_container_disabled': cashRegister.availability === 'NOT_AVAILABLE' }"
      class="cash_register_container d-flex flex-wrap justify-content-center align-items-center">
    <p class="text-center m-0 mb-1 mt-1">{{ "CASA" + index }}</p>
    <div v-for="c in cashRegister.clients" :key='c.index'>
      <client-offer-cash-register :client="c"></client-offer-cash-register>
    </div>
    <div class="d-flex mb-2">
      <button
          v-if="cashRegister.availability === 'AVAILABLE'"
          class="btn btn-danger me-2"
          @click="updatePaydesk('NOT_AVAILABLE')">CLOSE
      </button>
      <button
          v-if="cashRegister.availability === 'NOT_AVAILABLE'"
          class="btn me-2"
          style="background-color: #05910e;color: white"
          @click="updatePaydesk('AVAILABLE')">OPEN
      </button>
    </div>

  </div>

</template>

<script>
import ClientOfferCashRegister from "@/components/cashRegister/ClientOrderCashRegister.vue";

export default {
  name: "CashRegisterComponent",
  mounted() {
    console.log(this.cashRegister);
  },
  components: {ClientOfferCashRegister},
  data() {
    return {}
  },
  methods: {
    updatePaydesk(setAvailability) {
      console.log(setAvailability);
      console.log(this.index);
      this.$emit('update-paydesk', {
        paydeskIndex: this.index - 1,
        availability: setAvailability
      });
    }
  },
  props: {
    index: {},
    cashRegister: {}
  }

}
</script>

<style scoped>
* {
  width: 90%;
}

.cash_register_container {
  background-color: #EEE4E4;
  border: 1px solid #000000;
  border-radius: 10px;
  opacity: 1;
}

.cash_register_container_disabled {
  background-color: #d5d5d5;
  opacity: 0.7;
  color: grey;
}
</style>