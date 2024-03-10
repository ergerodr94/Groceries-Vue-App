<template>


    <div v-if="householdName == null">
      You are not in a household yet.
      Please join a household or create your own household
    </div>
        
    <div v-else>
      {{ householdName }}
    </div>

 
</template>
  
  <script>
  export default {
    name: 'HouseHold',
    data() {
      return {
        // your data properties here
        householdName: this.$store.state.household
        
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
  /* your component styles here */
  </style>