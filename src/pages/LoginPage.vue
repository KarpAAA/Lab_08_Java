<template>
  <div class="login-container">
      <h2>Sign in</h2>
      <div class="form-group">
        <label for="login">Username: </label>
        <input type="text" v-model="loginInfo.login" id="login" name="login" required>
      </div>
      <div class="form-group">
        <label for="password">Password: </label>
        <input type="password" v-model="loginInfo.password" id="password" name="password" required>
      </div>
      <button class="btn btn-success" @click="loginMethod">Sign in</button>

  </div>
</template>


<script>
import {mapActions} from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      loginInfo:{
        login: "KarpA124",
        password : "1111"
      }
    }
  },
  methods: {
    loginMethod(){
      this.loginToAccount(this.loginInfo);
      this.$router.push('/main')
    },
    ...mapActions({
      loginToAccount: 'loginToAccount'
    })
  }
}
</script>

<style scoped>

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

h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

</style>