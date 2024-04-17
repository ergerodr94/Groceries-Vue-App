<template>
  <div>
    <p>{{ questions[currentQuestion].text }}</p>
    <v-form v-if="currentQuestion == 1">
      <v-text-field
        v-model="householdName"
        label="Name of Household"></v-text-field>
      <v-btn @click="createHousehold()"> Create HouseHold! </v-btn>
    </v-form>
    <v-btn v-for="answer in questions[currentQuestion].answers" :key="answer.text" @click="handleAnswer(answer)">
      {{ answer.text }}
    </v-btn>  
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewUserSetup',
  data() {
    return {
      currentQuestion: 0,
      individual: null, 
      householdName: "",
      questions: [
        {
          text: "Unpack the Pantry uses \'households\' to keep inventory of the groceries you upload to the app. \
          You can use it individually with yourself as the head of a household or join an existing one a friend has created. \
          You can always add friends to your household later. Are you planning on using Unpack the Pantry by yourself, or with friends?",
          answers: [
            { text: 'Individually', nextQuestion: 1 },
            { text: 'With an Existing Household', nextQuestion: 2 },
          ],
        },
        {
          text: 'As an individual user, you control all aspects of your online household! Please provide a name for your Household!',
          answers: [
            { text: 'Back', nextQuestion: 0 },
          ],
        },
        {
          text: 'Did you want to join an existing household, or create a new One?',
          answers: [
            { text: 'Join Existing', nextQuestion: 3 },
            { text: 'Create New', nextQuestion: 3 },
          ],
        },
        // More questions...
      ],
    };
  },
  methods: {
    handleAnswer(answer) {
      this.currentQuestion = answer.nextQuestion;
    },
    async createHousehold(){
      const url = 'http://localhost:5001/unpack-the-pantry-fc442/us-central1/createHousehold/createHousehold'
      const houseHold = this.householdName
      const userUid = this.$store.state.user.uid
      const displayName = this.$store.state.user.displayName
      const response = await axios.post(url, { 
        household: houseHold,
        displayName: displayName,
        userId: userUid })
        .then(response => {
          if(response.status === 200){
            window.alert('Household created successfully');
            this.$store.commit('houseRegistered', houseHold)
            this.$router.push('/household')
          }
        })
        .catch(error => {
          console.error(error);
          console.log("RESPOSNE: ");
          console.log(error.data);
          window.alert('An error occurred while creating the house.');
        });
    }
  },
};
</script>