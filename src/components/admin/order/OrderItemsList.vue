<template>
  <ul class="custom-list">
    <li v-for="(o, index) in ordersItems"  :key="index">
      {{o.name}}
    </li>
  </ul>
</template>

<script>
export default {
  name: "OrderItemsList",
  props: {
    ordersItems:{
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.custom-list {
  list-style: none;
  padding-left: 0;
}

.custom-list li::before {
  content: "\1F355";
  color: black;
  font-size: 15px;
  margin-right: 10px;
}

</style>