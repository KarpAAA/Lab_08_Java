<template>

  <div class="block_container  scroll_container">
    <div class="row p-0 m-0">
      <p class="title text-center m-0 mt-4">
        {{ title }}
      </p>
    </div>
    <div class="row mt-5">
      <slot></slot>
    </div>

  </div>

</template>

<script>
export default {
  name: "block-component",
  props: {
    title: {
      required: true
    }
  }
}
</script>

<style scoped>
.title {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 40px;
  font-weight: 1000;
  line-height: 26px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #FFE082;
  -webkit-text-stroke: 3px #000; /* Товщина та колір обводки */
}

.block_container {
  border-radius: 37px;
  border: 6px solid #442911;
  background-color: #7D542D;
}

.scroll_container {
  overflow-y: scroll;
  overflow-x: hidden;
}

.scroll_container::-webkit-scrollbar {
  display: none;
}
</style>