<template>
<div>
  <CookPage v-if="userRole === 'COOK'"></CookPage>
  <AdminPage v-if="userRole === 'ADMIN'"></AdminPage>
</div>
</template>

<script>
import CookPage from "@/pages/CookPage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import {mapState} from "vuex";

export default {
  name: "MainPage",
  components: {AdminPage, CookPage},
  computed: {
    ...mapState({
      userRole: state => state.user.role
    })
  }
}
</script>

<style scoped>

</style>