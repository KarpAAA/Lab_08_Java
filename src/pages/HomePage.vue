<template>
  <div
      class="mainPage"
      :style="{ backgroundImage: 'url(' + require('@/assets/mainPage.jpg') + ')' }">
    <button class="sign_button"
            @click="this.$router.push('/login')"
            :style="{ backgroundImage: 'url(' + require('@/assets/sign_in_button_img.png') + ')' }">
        <span id="sign_text">
          Sign in
        </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1); /* Стан на початку анімації (звичайний розмір) */
  }
  100% {
    transform: scale(1.2); /* Стан в кінці анімації (збільшений розмір) */
  }
}
.sign_button:hover{
  animation: pulse 1s infinite alternate; /* Використовуємо анімацію "pulse" */
  transition: background-color 0.3s ease-in-out; /* Плавна зміна кольору при наведенні */
}
#sign_text{
  font-family: Press Start,serif;
  font-size: 25px;
  font-weight: 800;
  line-height: 21px;
  letter-spacing: 0.135em;
  text-align: left;
  color: #FAF1E6;
  margin-bottom: 10px;
}
.sign_button {
  position: absolute;
  width: 224px;
  height: 83px;
  top: 70%;
  left: 42%;
  flex-shrink: 0;
  background: none;
  border: none;
}
.mainPage {
  width: 100%; /* Розтягнути контейнер на всю ширину сторінки */
  height: 100vh; /* Розтягнути контейнер на всю висоту сторінки */
  background-size: cover; /* Масштабуємо картинку, щоб вона покривала контейнер */
  background-repeat: no-repeat; /* Забороняємо повторення фону */
  background-attachment: fixed; /* Фіксуємо фон, щоб він не прокручувався разом із вмістом контейнера */
}
</style>