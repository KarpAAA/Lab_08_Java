<template>

    <div class="progress-bar" :style="progressBarStyle"></div>


</template>

<script>
export default {
  name: "StepProcessingProgressBar",
  props: {
    totalSeconds: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      maxWidth: 70,
      progress: 0,
    };
  },
  computed: {
    progressBarStyle() {
      return {
        width: `${this.progress}%`,
      };
    },
  },
  methods: {
    updateProgressBar() {
      const interval = 1000; // Інтервал оновлення прогресу в мілісекундах (1 секунда)
      const step = 100 / (this.totalSeconds * 1000 / interval);
      const stepToWidth = step / (100 / this.maxWidth);
      const timer = setInterval(() => {
        if (this.progress < this.maxWidth) {
          this.progress += stepToWidth;
        } else {
          clearInterval(timer);
          this.$emit("setInactive");
        }
      }, interval);
    },
  },
  mounted() {
    this.updateProgressBar();
  },
};
</script>

<style scoped>
.progress-bar {
  border-radius: 20px;
  height: 20px;
  background-color: #ACCA66;
  border: solid black 1px;
}
</style>
