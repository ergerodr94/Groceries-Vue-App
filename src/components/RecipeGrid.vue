<!-- src/components/RecipeList.vue -->
<template>
    <div>
      <h1>Recipes</h1>
      <input
        type="text"
        v-model.lazy="searchQuery"
        @input="handleSearchInput"
        placeholder="Search for recipes"/>
        <v-btn color="blue">
          Search
        </v-btn>

        <div class="grid">
                <li v-for="recipe in recipes">
                    {{ recipe.recipe.label }}
                    <img src="${recipe.recipe.image}">
                </li>
        </div>

    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        recipes: [], // Store fetched recipes here
        searchQuery: "",
        page: 1
      };
    },
    mounted() {
      // Make an API request to your web2py backend here
      this.fetchRecipes();
    },
    methods: {
      fetchRecipes() {
        // Replace with your actual API endpoint
        const apiUrl = `https://api.edamam.com/api/recipes/v2?q=${this.searchQuery}&app_key=d6b0caf1b79a5d671c8c58fd3ef4428f&app_id=47ad8648&type=public`;
  
        // Use Axios or a similar library to make the GET request
        axios.get(apiUrl)
          .then(response => {
            this.recipes = response.data.hits;
            console.log(response.data.hits);
          })
          .catch(error => {
            console.error('Error fetching recipes:', error);
          });
      },
      handleSearchInput(){
        // Reset page to 1 when the search query changes
        this.page = 1;
        // Fetch data with the updated search query
        this.fetchRecipes();
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add styling here */
  </style>