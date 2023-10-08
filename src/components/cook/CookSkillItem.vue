<template>

  <div class="skill-list-item d-flex align-items-center ms-5 me-5 mb-4"
       :class="[{'skill-list-item_owned': ifAvailable}, {'skill-list-item_not_owned': !ifAvailable}]"
       @click="this.$emit('cookLearnSkill')">

    <div class="ms-2" id="skill_item">
      <span class="symbol">&#128214;</span>
      <slot></slot>
    </div>

<!--    <span v-if='ifAvailable' class="symbol">&#10004;</span>-->
<!--    <span v-if='!ifAvailable' class="symbol">&#10006;</span>-->
<!--    <button-->
<!--        v-if='!ifAvailable' class="btn btn-success ms-1"-->
<!--        @click="this.$emit('cookLearnSkill')">-->
<!--      Learn skill-->
<!--    </button>-->
  </div>

</template>

<script>

export default {
  name: "CookSkillItem",
  props: {
    ifAvailable: [Boolean]
  }
}
</script>

<style scoped>

#skill_item {
  margin-top: 10px;
  font-family: 'Press Start 2P', cursive;
  font-weight: 800;
  letter-spacing: 0.135em;
  text-align: left;
  font-size: 20px;
  min-height: 50px;
}
.symbol {
  font-size: 23px;
}


.skill-list-item {
  padding: 8px;
  margin: 5px;
  display: flex;
  align-items: center;
  border-radius: 11px;

}

.skill-list-item_owned {
  background-color: #442911;
  color: white;
}

.skill-list-item_not_owned {
  background-color: #44291166;
  color: #FFFFFF66;
}

</style>