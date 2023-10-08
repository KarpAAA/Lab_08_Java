<template>
  <div
      :class="{'cash_register_container_disabled': cashRegister.availability === 'NOT_AVAILABLE' }"
      class="cash_register_container d-flex flex-wrap align-items-start">
    <p class="casa_text ms-2 mt-2">{{ index }}</p>
    <div class="d-flex flex-column w-50 mt-2">
      <div v-for="c in cashRegister.clients" :key='c.index'>
        <client-offer-cash-register :client="c"></client-offer-cash-register>
      </div>
    </div>
    <div class="align-self-end mb-2 ms-4 me-1">
      <button
          v-if="cashRegister.availability === 'AVAILABLE'"
          class="btn vector_btn"
          @click="updatePaydesk('NOT_AVAILABLE')">
        <img :src="require('@/assets/icons/stop.svg')">
      </button>
      <button
          v-if="cashRegister.availability === 'NOT_AVAILABLE'"
          class="btn vector_btn_resume"
          style="background-color: #05910e;color: white"
          @click="updatePaydesk('AVAILABLE')">
        <img :src="require('@/assets/icons/resume.svg')">
      </button>

    </div>

  </div>

</template>

<script>
import ClientOfferCashRegister from "@/components/user/ClientOrderCashRegister.vue";

export default {
  name: "CashRegisterComponent",

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
.casa_text{
  padding: 10px 20px 10px 20px;
  text-align: center;
  background: #2F1C0B;
  color: white;
  width: fit-content;
  border-radius: 7px;
}
.vector_btn {
  width: fit-content;
  min-width: 40px;
  background-color: white;
}
.vector_btn_resume{
  width: fit-content;
  min-width: 40px;
  background-color: #ACCA66;
}


.cash_register_container {
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.135em;
  text-align: left;

  color: white;
  border-radius: 26px;
  background-color: #442911;
  border: 3px solid #442911;
  opacity: 1;
}

.cash_register_container_disabled {
  background-color: #d5d5d5;
  opacity: 0.7;
  color: grey;
}
</style>