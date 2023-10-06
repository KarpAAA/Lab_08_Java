<template>
  <div style="background-color: #131e3a; height: 100vh;width: 100vw">
    <div class="error_page">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorComponent"
}
</script>

<style scoped>
.error_page{

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>