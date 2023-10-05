<template>
    <div class="progress-bar__container">
      <div class="progress-bar" :style="{ width: `${currentWidth}%` }">
        <span class="progress-bar__text">{{ targetWidth }}%</span>
      </div>
    </div>
</template>

<script>
import {gsap} from "gsap";
export default {
  name:'OrderProgressBar',
  mounted() {
    this.animateProgressBar();
  },
  data() {
    return {
      currentWidth: 0, // Початкова ширина прогрес-бара
      progressText: '', // Текст прогресу
      ifCompleted: false
    };
  },
  props: {
    targetWidth: Number, // Кількість процентів, на яку повинен заповнитися прогрес-бар
    duration: Number, // Час заповнення прогрес-бара (в мілісекундах)
  },
  methods: {
    animateProgressBar() {
      const endWidth = this.targetWidth;
      gsap.to(this.$el.querySelector('.progress-bar'), {
        width: `${endWidth}%`,
        duration: (this.duration / 1000), // Переводимо в секунди
        onComplete: () => {},
      });
    },
  },

};
</script>

<style scoped>



.progress-bar__container {
  width: 80%;
  height: 2rem;
  border-radius: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.5s;
  will-change: transform;
  box-shadow: 0 0 5px #155b02;
}

.progress-bar {
  position: absolute;
  height: 100%;
  width: 0; /* Початкова ширина 0% */
  content: "";
  background-color: #01a921;
  top: 0;
  bottom: 0;
  left: 0; /* Змінено на 0, так як ширина буде анімованою */
  border-radius: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: sans-serif;
}

.progress-bar__text {
  color: white;
}
</style>