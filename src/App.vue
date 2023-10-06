<template>
  <v-app>
  <NavbarItem/>
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
            <RouterView v-slot="{ Component }">
              <Transition name="route" mode="out-in">
                <component :is="Component"></component>
              </Transition>
            </RouterView>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
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

.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-enter-active{
  transition: all 0.3s ease-out;
}

.route-leave-to{
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active{
  transition: all 0.3s ease-in;
}
</style>
