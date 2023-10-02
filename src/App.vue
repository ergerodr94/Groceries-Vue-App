<template>
  <v-app>
    <!-- Route components will dynamically be injected here-->
    <NavbarItem/>
    <RecipeGrid/>
    <router-view/>
  </v-app>
</template>

<script setup>
import NavbarItem from './components/NavbarItems.vue';
import RecipeGrid from './components/RecipeGrid.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
