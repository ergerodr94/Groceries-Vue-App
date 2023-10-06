<template>
    <div>
        <v-app-bar color="#8ee5ec"
        :elevation="24" rounded active="true">
            <v-btn>
              <RouterLink to="/explore"> Explore </RouterLink>
            </v-btn>
            <v-btn>
              <RouterLink to="/upload"> Upload </RouterLink>
            </v-btn>
            <v-btn>
              <RouterLink to="/household"> Household </RouterLink>
            </v-btn>
            <v-btn>
              <RouterLink to="/profile"> Profile </RouterLink>
            </v-btn>
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