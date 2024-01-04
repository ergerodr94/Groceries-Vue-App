
<template>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>

        <div v-if="$store.state.user"> 
          <h1>Hello! {{ $store.state.user.displayName }} </h1>
        
        </div>

        <v-btn v-else id="signInBtn"
        @Click="$store.commit('handleLogin')">Sign in with Google</v-btn>
  
      </v-form>
    </v-sheet>


  </template>

<script>
import axios from 'axios';
import firebase from 'firebase/compat/app';



export default {
    name: 'LoginComp',
    data() {
        return {
            show1: false,
            email: "",
            user: "", 
            password: "",
            loginResponse: ""
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
