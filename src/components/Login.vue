
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
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if(user){
  // https://firebase.google.com/docs/reference/js/auth.user
  const uid = user.uid;
  console.log("uid: ", uid)
  } else { 
    // User is signed out
  }
})

export default {
    name: 'LoginComp',
    data() {
        return {
            show1: false,
            email: "",
            fireID: "", 
            password: "",
            loginResponse: ""
        }
    },
    methods: {
      handleLogin(){
        // Replace with your actual API endpoint
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            // Get Google Access Token
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken; 
            console.log("Token: ", token)
            //Signed in user info
            const user = result.user;
          }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(credential);
          });
      },

    },
    computed: {
        // Your computed properties here
    }
}

</script>

<style>
</style>
