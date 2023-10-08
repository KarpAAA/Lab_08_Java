<template>
    <div class="progress-bar__container">
      <div class="progress-bar" :style="{ width: `${currentWidth}%` }">
        <span class="progress-bar__text">{{ progressText }}</span>
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
  watch:{
    targetWidth(){
      this.animateProgressBar();
    }
  },
  methods: {
    animateProgressBar() {
      const endWidth = this.targetWidth;
      gsap.to(this.$el.querySelector('.progress-bar'), {
        width: `${endWidth}%`,
        duration: (this.duration / 1000), // Переводимо в секунди
        onComplete: () => {

          this.ifCompleted = true;

        },
      });
    },
  },

};
</script>

<style scoped>



.progress-bar__container {
  width: 80%;
  height: 18px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  transition: all 0.5s;
  will-change: transform;
  background-color: #442911;
}

.progress-bar {
  position: absolute;
  height: 100%;
  width: 0; /* Початкова ширина 0% */
  content: "";
  background-color: #ACCA66;
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