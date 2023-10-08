<template>
  <div
      class="mainPage"
      :style="{ backgroundImage: 'url(' + require('@/assets/mainPage.jpg') + ')' }">
    <custom-button
        id="sign_button"
        @click="this.$router.push('/login')"
        :style="{ backgroundImage: 'url(' + require('@/assets/sign_in_button_img.png') + ')' }"
    >
      Sign in
    </custom-button>

  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";

export default {
  name: "HomePage",
  components: {CustomButton}
}
</script>

<style scoped>


@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}

#sign_button{
  position: absolute;
  width: 224px;
  height: 83px;
  top: 70%;
  left: 42%;
}
#sign_button:hover {
  animation: pulse 1s infinite alternate;
  transition: background-color 0.3s ease-in-out;
}

.mainPage {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>