<template>
  <div class="row m-0" style="height: 10vh;"></div>
  <div class="row  m-0">
    <empty-column :count='1'></empty-column>

    <div class="col-md-5 block_container">
      <block-component title="Orders">
        <div class="d-flex flex-wrap">
          <cook-order-item
              class="m-1"
              v-for="(order, index) in orders"
              :key="index"
              :order='order'
              style="width: 32%">
          </cook-order-item>
        </div>
      </block-component>
    </div>
    <empty-column :count='1'></empty-column>
    <empty-column :count='1'></empty-column>
    <div class="col-md-3 block_container">
      <block-component title="Skills">
        <div class="">
          <div v-for="(skill,index) in allSkills" :key="index">
            <CookSkillItem :if-available="findIfHasSkill(skill.name)">
              <span>{{ skill.name }}</span>
            </CookSkillItem>
          </div>
        </div>
      </block-component>
    </div>
    <div class="row m-0" style="height: 10vh;"></div>
    <empty-column :count='1'></empty-column>
  </div>
</template>

<script>
import EmptyColumn from "@/utils/EmptyColumn.vue";
import BlockComponent from "@/components/BlockComponent.vue";
import CookOrderItem from "@/components/cookComponents/CookOrderItem.vue";
import {mapActions, mapState} from "vuex";
import CookSkillItem from "@/components/cookComponents/CookSkillItem.vue";
export default {
  name: "CookPage",
  components: {CookSkillItem, CookOrderItem, BlockComponent, EmptyColumn},
  beforeMount() {
    this.getCookByUsername();
    this.getAllSkills();
  },
  data(){
    return {
      // orders: [
      //   {
      //     orderNumber: 100,
      //     pizzas: [
      //       {
      //         name:"Pizza1",
      //         steps: [
      //           {
      //             name: "Step1",
      //             ifMade: false
      //           },
      //           {
      //             name: "Step2",
      //             ifMade: true
      //           },
      //           {
      //             name: "Step3",
      //             ifMade: false
      //           }
      //         ]
      //       },
      //       {
      //         name:"Pizza1",
      //         steps: [
      //           {
      //             name: "Step1",
      //             ifMade: false
      //           },
      //           {
      //             name: "Step2",
      //             ifMade: true
      //           },
      //           {
      //             name: "Step3",
      //             ifMade: false
      //           }
      //         ]
      //       },
      //       {
      //         name:"Pizza2",
      //         steps: [
      //           {
      //             name: "Step1",
      //             ifMade: false
      //           },
      //           {
      //             name: "Step2",
      //             ifMade: true
      //           },
      //           {
      //             name: "Step3",
      //             ifMade: false
      //           }
      //         ]
      //       }
      // ]
      //   },
      //   {
      //     orderNumber: 100,
      //     pizzas: [
      //       {
      //         name:"Pizza1",
      //         steps: [
      //           {
      //             name: "Step1",
      //             ifMade: false
      //           },
      //           {
      //             name: "Step2",
      //             ifMade: true
      //           },
      //           {
      //             name: "Step3",
      //             ifMade: false
      //           }
      //         ]
      //       },
      //       {
      //         name:"Pizza2",
      //         steps: [
      //           {
      //             name: "Step1",
      //             ifMade: false
      //           },
      //           {
      //             name: "Step2",
      //             ifMade: true
      //           },
      //           {
      //             name: "Step3",
      //             ifMade: false
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     orderNumber: 100,
      //     pizzas: [
      //       {
      //         name:"Pizza1",
      //         steps: [
      //           {
      //             name: "Step1",
      //             ifMade: false
      //           },
      //           {
      //             name: "Step2",
      //             ifMade: true
      //           },
      //           {
      //             name: "Step3",
      //             ifMade: false
      //           }
      //         ]
      //       },
      //       {
      //         name:"Pizza2",
      //         steps: [
      //           {
      //             name: "Step1",
      //             ifMade: false
      //           },
      //           {
      //             name: "Step2",
      //             ifMade: true
      //           },
      //           {
      //             name: "Step3",
      //             ifMade: false
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     orderNumber: 100,
      //     pizzas: [
      //       {
      //         name:"Pizza1",
      //         steps: [
      //           {
      //             name: "Step1",
      //             ifMade: false
      //           },
      //           {
      //             name: "Step2",
      //             ifMade: true
      //           },
      //           {
      //             name: "Step3",
      //             ifMade: false
      //           }
      //         ]
      //       },
      //       {
      //         name:"Pizza2",
      //         steps: [
      //           {
      //             name: "Step1",
      //             ifMade: false
      //           },
      //           {
      //             name: "Step2",
      //             ifMade: true
      //           },
      //           {
      //             name: "Step3",
      //             ifMade: false
      //           }
      //         ]
      //       }
      //     ]
      //   },{
      //     orderNumber: 100,
      //     pizzas: [
      //       {
      //         name:"Pizza1",
      //         steps: [
      //           {
      //             name: "Step1",
      //             ifMade: false
      //           },
      //           {
      //             name: "Step2",
      //             ifMade: true
      //           },
      //           {
      //             name: "Step3",
      //             ifMade: false
      //           }
      //         ]
      //       },
      //       {
      //         name:"Pizza2",
      //         steps: [
      //           {
      //             name: "Step1",
      //             ifMade: false
      //           },
      //           {
      //             name: "Step2",
      //             ifMade: true
      //           },
      //           {
      //             name: "Step3",
      //             ifMade: false
      //           }
      //         ]
      //       }
      //     ]
      //   },
      // ]
    }
  },
  computed: {
    ...mapState({
      allSkills: state => state.allSkills,
      cook : state => state.cook,
      orders : state => state.restaurant.orders
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
      getAllSkills: 'getAllSkills'
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
  height: 75vh;
}
</style>