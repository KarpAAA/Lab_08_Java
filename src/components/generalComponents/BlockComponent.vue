<template>

  <div class="block_container scroll_container">
    <div class="row p-0 m-0">
      <p class="title text-center m-0">
        {{ title }}
      </p>
    </div>

    <div class="row">
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
  font-family: Inter;
  font-size: 47px;
  font-weight: 400;
  line-height: 57px;
  letter-spacing: 0em;
  text-align: left;
  color: black;
}

.block_container {
  border-radius: 15px;
  background-color: #D9D9D9;
  border: 1px solid #000000;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3); /* Добавляем тень */
}
.block_container:hover {
  background-color: #e7e7e7;
}
.scroll_container {
  overflow-y: scroll;
  overflow-x: hidden;
}

.scroll_container::-webkit-scrollbar {
  display: none;
}
</style>