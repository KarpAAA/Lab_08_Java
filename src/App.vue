<template>
  <router-view></router-view>
</template>

<script>


export default {
  name: 'App',

  methods:{
    updateCookWorking(id){
      this.cooks[id].ifWorking = !this.cooks[id].ifWorking;
    }
  }
}
</script>

<style>


</style>
