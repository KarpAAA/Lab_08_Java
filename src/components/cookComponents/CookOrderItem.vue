<template>
  <div class="order">
    <p class="ms-3 text-start fw-bold mb-0">Order: {{ order.number }}</p>
    <p class="ms-3 text-start fw-bold mb-0">Price: {{ order.sum }}</p>

    <ul class="pizzaList">
      <li v-for="(pizza,index) in this.order.pizzaList" :key="index" class="pizza mb-4">
        <span class="ms-3 text-start fw-bold">{{ pizza.name }}</span>
        <ul class="stepsList">
          <li v-for="(step,stepIndex) in pizza.needSteps" :key="stepIndex" class="step">
              <span
                  :class="[
                  {'text-decoration-line-through text-black': step.ifMade},
                  {'active_item': stepIndex === 0 || pizza.needSteps[stepIndex - 1].ifMade}]"
                  class="ms-3 text-start fw-bold">{{ step.name }}</span>
            <div>

            </div>
            <div class="container-fluid d-flex justify-content-center">
              <button
                  v-if="findIfHasSkill(step.name)
                && (stepIndex === 0 || pizza.needSteps[stepIndex - 1].ifMade)
                && !step.ifMade && !processingItem.isProcessing"

                  class="btn btn-success"
                  @click="doOrderPizzaStepMethod({
                  orderNumber: order.number,
                  pizzaIndex: index,
                  stepIndex: stepIndex
                })"
              >
                Do
              </button>
              <step-processing-progress-bar
                  v-if="processingItem.isProcessing
                && processingItem.stepIndex === stepIndex
                && processingItem.pizzaIndex === index
                && processingItem.orderNumber === order.number"
                  total-seconds="3"
                  @setInactive="setInactiveMethod({
                  orderNumber: order.number,
                  pizzaIndex: index,
                  stepIndex: stepIndex
                })"

              ></step-processing-progress-bar>
            </div>
          </li>
        </ul>

      </li>
    </ul>

  </div>
</template>


<script>
import {mapActions} from "vuex";
import StepProcessingProgressBar from "@/components/cookComponents/StepProcessingProgressBar.vue";

export default {
  components: {StepProcessingProgressBar},
  mounted() {
    console.log(this.order);
  },
  name: "CookOrderItem",
  props: {
    processingItem: {},
    cookSkills: [Array],
    order: {
      required: true
    }
  },
  methods: {
    ...mapActions({
      doOrderPizzaStep: 'doOrderPizzaStep',
    }),
    doOrderPizzaStepMethod(reqData){
      this.$emit('update:processingItem',
          {isProcessing: true, stepIndex: reqData.stepIndex,pizzaIndex: reqData.pizzaIndex,orderNumber : reqData.orderNumber})

    },
    setInactiveMethod(reqData){
      this.$emit('update:processingItem',
          {isProcessing: false,stepIndex: -1,pizzaIndex: -1,orderNumber : -1});
      this.doOrderPizzaStep(reqData);
    },
    findIfHasSkill(skillName) {
      if (this.cookSkills && Array.isArray(this.cookSkills)) {
        return this.cookSkills.some(skill => skill === skillName);
      }
      return false;
    },
  }
}
</script>

<style scoped>
.active_item {
  color: red;
}

.disabled_item {
  color: grey;
}

.order {
  border-radius: 30px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
}

.pizzaList, .stepsList {
  list-style: none;
}

.pizzaList li::before {
  content: "\1F355";
  font-size: 25px;
}


.stepsList li::before {
  content: "\1F52A";
  font-size: 20px;
}

.pizzaList li,
.stepsList li {
  white-space: pre;
}
</style>
