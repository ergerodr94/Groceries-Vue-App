
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
        ></v-text-field>
  
        <v-btn type="submit" block class="mt-2">Submit</v-btn>
        <v-btn type="sign-up" block class="mt-3"> Sign Up</v-btn>
        <v-btn type="lost-password" block class="mt-3"> Lost Password</v-btn>
      </v-form>
    </v-sheet>
  </template>

<script>
export default {
    name: 'LoginComp',
    data() {
        return {
            show1: false,
            email: "",
            password: ""
        }
    },
    methods: {
        // Your methods here
    },
    computed: {
        // Your computed properties here
    }
}
</script>

<style>
</style>
