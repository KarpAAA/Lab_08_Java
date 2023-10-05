<template>


  <div class="skill-list-item"
       :class="[{'skill-list-item_owned': ifAvailable}, {'skill-list-item_not_owned': !ifAvailable}]">
    <span class="symbol">&#128214;</span>
    <div class="item-content ms-2">
      <slot></slot>
    </div>

    <span v-if='ifAvailable' class="symbol">&#10004;</span>
    <span v-if='!ifAvailable' class="symbol">&#10006;</span>
    <button v-if='!ifAvailable' class="btn btn-success ms-1"
            @click="this.$emit('cookLearnSkill')"
    >Learn Skill</button>
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
.symbol {
  font-size: 23px;
}

.item-content {
  min-width: 140px;
}

.skill-list-item {
  padding: 8px;
  border: 1px solid #ccc;
  margin: 5px;
  display: flex;
  align-items: center;
  border-radius: 4px;
}

.skill-list-item_owned {
  color: black;
  background-color: white;
}

.skill-list-item_not_owned {
  color: black;
}

</style>