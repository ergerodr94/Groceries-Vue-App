<template>
    <div>
        <v-app-bar color="#8ee5ec"
        :elevation="24" rounded active="true">
            <v-btn to="/explore">
              Explore
            </v-btn>
            <v-btn to="/upload">
              Upload 
            </v-btn>
            <v-btn to="/household">
              Household 
            </v-btn>
            <v-btn to="/profile">
              Profile 
            </v-btn>
            <v-btn @click="$store.commit('handleLogout')" v-if="$store.state.user" to="/logout">
              Logout
            </v-btn>
            <v-btn v-else to="/login"> Login </v-btn>
        </v-app-bar>
    </div>
  </template>
  <script>
  export default {
    name: 'NavbarItems',
    data() {
      return {
        // your data properties here
      }
    },
    methods: {
      // your methods here
    },
    computed: {
      // your computed properties here
    },
    mounted() {
      // your mounted code here
    }
  }
  </script>
  
  <style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 400px;
}

a.router-link-exact-active {
  color: #42b983;
}  
</style>