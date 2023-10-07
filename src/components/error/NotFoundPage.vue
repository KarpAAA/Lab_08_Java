<template>
  <error-component><img :src="require('@/assets/404_error_cut.jpg')"></error-component>
</template>

<script>
import ErrorComponent from "@/components/error/ErrorComponent.vue";

export default {
  name: "NotFoundPage",
  components: {ErrorComponent}
}
</script>

<style scoped>

</style>