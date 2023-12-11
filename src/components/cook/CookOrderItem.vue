<template>
  <div class="order">
    <div class="order_data d-flex justify-content-around mt-4">
      <div>
        Order: {{ order.number }}
      </div>
      <div>
        💵 {{ order.sum }}
      </div>
    </div>


    <ul class="pizzaList mt-3">
      <li v-for="(pizza,index) in this.order.pizzaList" :key="index" class="pizza mb-4">
        <span class="ms-3 text-start fw-bold">{{ pizza.name }}</span>
        <ul class="stepsList">
          <li v-for="(step,stepIndex) in pizza.needSteps" :key="stepIndex" class="step">
              <span
                  :class="[
                  {'text-decoration-line-through madeStep': step.ifMade},
                  {'active_item': stepIndex === 0 || pizza.needSteps[stepIndex - 1].ifMade}]"
                  class="ms-3 text-start fw-bold">{{ step.name }}</span>


<!--              <button-->
<!--                  v-if="findIfHasSkill(step.name)-->
<!--                && (stepIndex === 0 || pizza.needSteps[stepIndex - 1].ifMade)-->
<!--                && !step.ifMade && !processingItem.isProcessing"-->

<!--                  class="btn ms-2"-->
<!--                  style="background-color: #90AD4D"-->
<!--                  @click="doOrderPizzaStepMethod({-->
<!--                  orderNumber: order.number,-->
<!--                  pizzaIndex: index,-->
<!--                  stepIndex: stepIndex-->
<!--                })"-->
<!--              >-->
<!--                Do-->
<!--              </button>-->
              <step-processing-progress-bar
                  v-if="processingItem.isProcessing
                && processingItem.stepIndex === stepIndex
                && processingItem.pizzaIndex === index
                && processingItem.orderNumber === order.number"
                  total-seconds='3'
                  @setInactive="setInactiveMethod({
                  orderNumber: order.number,
                  pizzaIndex: index,
                  stepIndex: stepIndex
                })"
              ></step-processing-progress-bar>
            <step-processing-progress-bar
                v-if="step.cook && step.cook.id === cookId"
                total-seconds='1'
                @setInactive="setInactiveMethod1()"
            ></step-processing-progress-bar>
          </li>
        </ul>

      </li>
    </ul>

  </div>
</template>


<script>
import {mapActions} from "vuex";
import StepProcessingProgressBar from "@/components/cook/StepProcessingProgressBar.vue";

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
    },
    cookId: {}
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
    setInactiveMethod1(){
      this.$emit('update:processingItem',
          {isProcessing: false,stepIndex: -1,pizzaIndex: -1,orderNumber : -1});
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
* {
  font-family: 'Press Start 2P', cursive;
  font-weight: 800;
  letter-spacing: 0.135em;
  text-align: left;
}
.order_data {
  font-family: 'Press Start 2P', cursive;
  font-weight: 800;
  font-size: 20px;
  line-height: 16px;
  letter-spacing: 0.135em;
  text-align: left;

}
.madeStep {
  color: white;
  opacity: 40%;
}
.active_item {

}

.order {
  background-color:  #442911;
  border-radius: 11px;
  color: white;
}

.pizzaList, .stepsList {
  margin-left: 60px;
  list-style: none;
}

.pizzaList li::before {
  content: "\1F355";
  font-size: 25px;
}


.stepsList li::before {
  content: "";
  font-size: 20px;
}


</style>
