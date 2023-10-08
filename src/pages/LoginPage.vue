<template>
  <div class="login-container"  :style="{ backgroundImage: 'url(' + require('@/assets/background.png') + ')' }">
    <block-component title="Sign in">
      <div class="d-flex flex-column align-items-center">

        <div class="d-flex mt-2 mb-5 flex-column ps-4 pe-4">
          <label class="mb-1" for="login">Username: </label>
          <input type="text" v-model="loginInfo.login" id="login" name="login" required>
        </div>

        <div class="mt-2 mb-5 d-flex flex-column">
          <label class="mb-1" for="password">Password: </label>
          <input type="password" v-model="loginInfo.password" id="password" name="password" required>
        </div>

        <div v-if='!this.loginState'>
          <p id="errorText" class="text-danger mb-3">Bad credentials</p>
        </div>

        <custom-button
            class="btn btn-success mt-4 mb-5"
            id="login_button"
            @click="loginMethod"
            :style="{ backgroundImage: 'url(' + require('@/assets/log_in_button.png') + ')' }"
        >
          Log in
        </custom-button>

      </div>

    </block-component>
  </div>
</template>


<script>
import {mapActions, mapState} from "vuex";
import BlockComponent from "@/components/generalComponents/BlockComponent.vue";
import CustomButton from "@/components/CustomButton.vue";

export default {
  name: "LoginPage",
  components: {CustomButton, BlockComponent},
  data() {
    return {
      loginInfo: {
        login: "KarpA124",
        password: "1111"
      },
      loginState: true
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  watch: {
    user() {
      if (this.user && this.user.name) {
        this.loginState = true;
        this.$router.push('/main')
      }
      if (this.user && !this.user.name) this.loginState = false;
    }
  },
  methods: {
    loginMethod() {
      this.loginToAccount(this.loginInfo);
    },
    ...mapActions({
      loginToAccount: 'loginToAccount'
    })
  }
}
</script>

<style scoped>
#errorText {
  font-family: 'Press Start 2P', sans-serif;
  font-size: 18px;
  font-weight: 700;
}

#login_button {
  width: 194px;
  height: 62px;
}

.login-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

label {
  min-width: 404px;
  font-family: 'Press Start 2P', sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 14px;
  letter-spacing: 0.135em;
  text-align: left;
  color: white;
}

input[type="text"],
input[type="password"] {
  font-family: 'Press Start 2P', sans-serif;
  min-height: 67px;
  font-size: 20px;
  width: 100%;
  padding: 10px;
  border-radius: 11px;
  background-color: #442911;
  color: white;
}


</style>