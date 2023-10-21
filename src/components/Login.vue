
<template>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>

        <v-btn id="signInBtn"
        @Click="handleLogin">Sign in with Google</v-btn>
  
      </v-form>
    </v-sheet>


  </template>

<script>
import axios from 'axios';
import firebase from 'firebase/compat/app';
import { auth } from '../firebase.js'

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
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
      }
    },
    computed: {
        // Your computed properties here
    }
}

</script>

<style>
</style>
