<template>
  <p style="font-size: 50px;font-weight: bold">Main page</p>
  <button @click="this.$router.push('/login')" class="btn btn-success">Log in</button>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>

</style>