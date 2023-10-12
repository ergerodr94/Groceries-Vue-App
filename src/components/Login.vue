
<template>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="email"
          label="Email"
        ></v-text-field>
  
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye-off': 'mdi-eye'"
          :type="show1 ? 'text' : 'password'"
          label="Password"
          @click:append="show1 = !show1"
        ></v-text-field>
  
        <v-btn 
          type="log-in" 
          block 
          class="mt-2"
          @click="handleLogin">Log in</v-btn>
        <v-btn type="sign-up" block class="mt-3"> Sign Up</v-btn>
        <v-btn type="lost-password" block class="mt-3"> Lost Password</v-btn>
      </v-form>
    </v-sheet>
  </template>

<script>
import axios from 'axios';

export default {
    name: 'LoginComp',
    data() {
        return {
            show1: false,
            email: "",
            password: "",
            loginResponse: ""
        }
    },
    methods: {
      handleLogin(){
        // Replace with your actual API endpoint
        const apiUrl = `http://localhost:8000/groceriesapi/groceriesapi/loginVue`;
        var body = {
          email: this.email,
          password: this.password
        }

        // Use Axios or a similar library to make the GET request
        axios.post(apiUrl, body)
          .then(response => {
            this.loginResponse = response.data;
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error during authentication:', error);
          });
      }
    },
    computed: {
        // Your computed properties here
    }
}
</script>

<style>
</style>
