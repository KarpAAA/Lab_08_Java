<template>
  <div class="col-md-1" v-for="c in count" :key="c"></div>
</template>

<script>
export default {
  name: "EmptyColumn",
  props: {
    count: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>

</style>