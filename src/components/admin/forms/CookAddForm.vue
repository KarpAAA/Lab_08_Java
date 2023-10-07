<template>
  <div>
    <h2>Cook creation</h2>
    <form @submit.prevent="createCook">
      <div class="form-group">
        <label for="login">Login:</label>
        <input type="text" id="login" v-model="cookData.login" required>
      </div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="cookData.name" required>
      </div>
      <div class="form-group">
        <label for="age">Age:</label>
        <input type="number" min="1" id="age" v-model="cookData.age" required>
      </div>
      <div class="form-group">
        <label for="salary">Salary:</label>
        <input type="number" id="salary" v-model="cookData.salary" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="cookData.password" required>
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CookAddForm",
  data() {
    return {
      cookData: {
        login: "",
        password: "",
        age:{Number},
        name: "",
        salary:{Number}
      },
    };
  },
  methods: {
    createCook() {
      this.$emit('createCook', this.cookData)
      this.cookData.login = "";
      this.cookData.password = "";
      this.cookData.name = "";
      this.cookData.age = {};
      this.cookData.salary = {};
    },
  },
};
</script>

<style scoped>
/* Стилі форми можна додати тут */
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
  border-radius: 5px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
