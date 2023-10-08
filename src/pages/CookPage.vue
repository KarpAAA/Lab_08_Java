<template>
  <div v-if="cook.ifWorking" :style="{ backgroundImage: 'url(' + require('@/assets/background.png') + ')' }">
    <div class="row m-0" style="height: 10vh;"></div>
    <div class="row m-0" style="height: 90vh;">
      <empty-column :count='1'></empty-column>

      <div class="col-md-5 block_container">
        <block-component title="Orders">
          <div class="d-flex justify-content-center">
            <cook-order-item
                v-model:processingItem="processingItem"
                v-for="(order, index) in orders"
                :key="index"
                :order='order'
                style="width: 85%"
                :cookSkills='cook.skills'>
            </cook-order-item>
          </div>
        </block-component>
      </div>

      <div class="col-md-5 block_container">
        <block-component title="Skills">
          <div class="">
            <div v-for="(skill,index) in allSkills" :key="index">
              <CookSkillItem
                  :if-available="findIfHasSkill(skill.name)"
                  @cookLearnSkill="cookLearnSkill({cookId: cook.id, stepId: skill.id})"
              >
                <span>{{ skill.name }}</span>
              </CookSkillItem>
            </div>
          </div>
        </block-component>
      </div>
    </div>
  </div>

  <div v-else>
    <error-component><img :src="require('@/assets/error_403.jpg')"></error-component>
  </div>

</template>

<script>
import EmptyColumn from "@/components/generalComponents/EmptyColumn.vue";
import BlockComponent from "@/components/generalComponents/BlockComponent.vue";
import CookOrderItem from "@/components/cook/CookOrderItem.vue";
import {mapActions, mapState} from "vuex";
import CookSkillItem from "@/components/cook/CookSkillItem.vue";
import ErrorComponent from "@/components/generalComponents/error/ErrorComponent.vue";
export default {
  name: "CookPage",
  components: {ErrorComponent, CookSkillItem, CookOrderItem, BlockComponent, EmptyColumn},
  beforeMount() {
    this.getCookByUsername();
    this.getAllSkills();
  },
  data(){
    return{
      processingItem: {
        isProcessing: false,
        stepIndex: -1,
        pizzaIndex: -1,
        orderNumber : -1
      },
    }
  },

  computed: {
    ...mapState({
      allSkills: state => state.allSkills,
      cook : state => state.cook,
      orders : state => state.restaurant.currentOrders
    }),
  },

  methods:{
    findIfHasSkill(skillName) {
      if (this.cook.skills && Array.isArray(this.cook.skills)) {
        return this.cook.skills.some(skill => skill === skillName);
      }
      return false;
    },
    ...mapActions({
      getCookByUsername: 'getCookByUsername',
      getAllSkills: 'getAllSkills',
      cookLearnSkill: 'cookLearnSkill',
    })
  }
}
</script>

<style scoped>
.item-content {
  display: flex;
  align-items: center;
  min-width: 130px;
}
.block_container{
  height: 80vh;
}
</style>