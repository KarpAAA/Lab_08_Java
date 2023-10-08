<template>
  <div class="d-flex flex-column flex-wrap">

    <div v-for="(paydesk) in availablePaydesks"
         :key="paydesk.index"
         class="paydesk_container d-flex pt-2 pb-1">

      <div style="margin-left: 6%;max-width: 50px"
          class="text_item d-flex align-self-center justify-content-center">
        {{ paydesk.index + 1 }}
      </div>

      <div style="margin-left: 5%; width: 130px;min-height: 45px" class="text_item d-flex align-self-center justify-content-center">

        <div v-if="paydesk.clients.length !== 0">
          <div v-for="(client,clientIndex) in paydesk.clients" :key="clientIndex">
            {{ client.name }}
          </div>
        </div>

      </div>

      <div style="margin-left: 7%; max-height: 40px" class="text_item d-flex align-self-center justify-content-center">{{ paydesk.clients.length }}</div>
      <div style="margin-left: 15%;" class="d-flex align-self-center justify-content-center">
        <button class="queue_btn p-2"
                @click='standToQueue(paydesk.index)'
                v-if="chosenPaydesk === -1">
          Stand
        </button>
        <button  class="queue_btn p-2"
                @click='leaveFromQueue(paydesk.index)'
                v-if="paydesk.index === chosenPaydesk">
          Leave
        </button>
      </div>

    </div>


  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "UserPaydesksList",
  props: {
    clientIndex: {
      type: Number,
      required: true
    },
    chosenPaydesk: {
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
    ...mapState({}),
    availablePaydesks() {
      return this.paydesks.filter(paydeks => paydeks.availability === "AVAILABLE");
    },
  }
}
</script>

<style scoped>
.queue_btn {
  border-radius: 10px;
  color: white;
  border: none;
  background-color: #2F1C0B;
}
.text_item {
  padding: 10px 20px 10px 20px;
  background-color: #2F1C0B;
  border-radius: 7px;
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.135em;
  width: fit-content;
}
.paydesk_container {
  background-color: #442911;
  color: white;
  text-align: center;
}


</style>