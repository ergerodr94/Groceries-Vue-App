<template>


    <div v-if="householdName == null">
      You are not in a household yet.
      Please join a household or create your own household

      <v-btn @click="redirectToNewUserPage()"> Create Household </v-btn>
    </div>
        
    <div v-else>
      {{ householdName.houseName }} <br> 
      Managed By: {{ householdName.manager }} &nbsp; 
      <br>
      <br>
      Members
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
      redirectToNewUserPage(){
        if(this.$store.state.user){
          this.$router.push('/newuser')
        } else {
          this.$router.push('/login')
        }
        
      }
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