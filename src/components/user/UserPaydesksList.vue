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

        <tr v-for="(paydesk, paydeskIndex) in availablePaydesks" :key="paydeskIndex">

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
                    @click='standToQueue(paydeskIndex)'
                    v-if="chosenPaydesk === -1">
              Stand
            </button>
            <button class="btn"
                    @click='leaveFromQueue(paydeskIndex)'
                    v-if="paydeskIndex === chosenPaydesk">
              Leave
            </button>
          </td>

        </tr>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: "UserPaydesksList",
  data() {
    return {
      chosenPaydesk: -1,
    }
  },
  props: {
    clientIndex:{
      type:Number,
      required:true
    },
    paydesks: [Array]
  },
  methods: {
    standToQueue(paydeskIndex) {
      this.$emit("standToQueue", {paydeskIndex: paydeskIndex, clientIndex: this.clientIndex});
      this.chosenPaydesk = paydeskIndex;
    },
    leaveFromQueue(paydeskIndex) {
      this.$emit("leaveFromQueue", {paydeskIndex: paydeskIndex, clientIndex: this.clientIndex})
      this.chosenPaydesk = -1
    }
  },
  computed: {
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