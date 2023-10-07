<template>
  <div class="d-flex justify-content-center">
    <div>
      <table class="table">
        <tr>
          <td></td>
          <td></td>
          <td>People</td>
          <td></td>
        </tr>

        <tr v-for="(paydesk) in availablePaydesks" :key="paydesk.index">

          <td>{{ paydesk.name }}</td>
          <td>
            <div v-if="paydesk.clients.length === 0">
              Empty
            </div>
            <div v-else>
              <div v-for="(client,clientIndex) in paydesk.clients" :key="clientIndex">
                {{ client.name }}
              </div>
            </div>

          </td>
          <td>{{ paydesk.clients.length }}</td>
          <td>
            <button class="btn"
                    @click='standToQueue(paydesk.index)'
                    v-if="chosenPaydesk === -1">
              Stand
            </button>
            <button class="btn"
                    @click='leaveFromQueue(paydesk.index)'
                    v-if="paydesk.index === chosenPaydesk">
              Leave
            </button>
          </td>

        </tr>
      </table>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "UserPaydesksList",
  props: {
    clientIndex:{
      type:Number,
      required:true
    },
    chosenPaydesk:{
      type: Number,
      default: -1,
    },
    paydesks: [Array]
  },
  methods: {
    standToQueue(paydeskIndex) {
      this.$emit("standToQueue", {paydeskIndex: paydeskIndex, clientIndex: this.clientIndex});
    },
    leaveFromQueue(paydeskIndex) {
      this.$emit("leaveFromQueue", {paydeskIndex: paydeskIndex, clientIndex: this.clientIndex})
    }
  },
  computed: {
    ...mapState({

    }),
    availablePaydesks() {
      return this.paydesks.filter(paydeks => paydeks.availability === "AVAILABLE");
    },
  }
}
</script>

<style scoped>
tr td {
  text-align: center;
  width: 15vh;
}

</style>