<template>
  <button class="sign_button">
        <span id="sign_text">
          <slot></slot>
        </span>
  </button>
</template>

<script>
export default {
  name: "CustomButton"
}
</script>

<style scoped>


#sign_text {
  font-family: "Press Start2", sans-serif;
  font-size: 25px;
  font-weight: 800;
  line-height: 21px;
  letter-spacing: 0.16em;
  text-align: left;
  color: #FAF1E6;
  margin-bottom: 10px;
}

.sign_button {
  flex-shrink: 0;
  background: none;
  border: none;
}
</style>