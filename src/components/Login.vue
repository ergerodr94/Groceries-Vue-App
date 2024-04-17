
<template>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>

        <div v-if="$store.state.user"> 
          <h1>Hello! {{ $store.state.user.displayName }} </h1>
        </div>

        <div v-else>
          <h1>Create an Account</h1>
          <p><input type="text" placeholder="Email" v-model="email"/></p>
          <p><input type="password" placeholder="password" v-model="password"/></p>
          <p><v-btn @click="register">Submit</v-btn></p>
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

    },
    computed: {
        // Your computed properties here
    }
}

</script>

<style>
</style>
