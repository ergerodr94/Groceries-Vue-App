
<template>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>

        <div v-if="$store.state.user"> 
          <h1>Hello! {{ $store.state.user.displayName }} </h1>
        </div>

        <div v-else>
          <h1>Login</h1>
          <form @submit.prevent="handleEmailLogin">
            <div>
              <label>Email:</label>
              <input type="email" v-model="email" required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
          </form>
           <br>
          Or
          <br>
          <br>
          <v-btn id="signInBtn" @Click="$store.commit('handleLogin')">Sign in with Google &nbsp;
            <img src="../assets/682665_favicon_google_logo_new_icon.png" width="20" height="20"/>
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </template>

<script>
import axios from 'axios';
import firebase from 'firebase/compat/app';
import { mdiGoogle } from '@mdi/js'
import { mapActions } from 'vuex';

export default {
    name: 'LoginComp',
    data() {
        return {
            show1: false,
            email: "",
            user: "", 
            password: "",
            loginResponse: "",
            path: mdiGoogle
        }
    },
    methods: {
      ...mapActions(['emailSignIn']),
      async handleEmailLogin(){
        try {
          console.log("Calling handleEmailLogin()");
          await this.emailSignIn({email: this.email, password: this.password });
          this.$router.push("/explore");
        } catch (error) {
          window.alert("handleEmailLogin(): " + error);
          return;
        }

        

      }

    },
    computed: {
        // Your computed properties here
    }
}

</script>

<style>
</style>
