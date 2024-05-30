<template>
  <div>
    <v-expansion-panels>
      <!-- Panel 1-->
      <v-expansion-panel>
        <v-expansion-panel-title v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4" class="d-flex justify-start">
              Upload Groceries
            </v-col>
            <v-col cols="4" class="d-flex justify-start">

            </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>

              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>

          <v-form ref="form">

          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-checkbox v-model="groceryItem.communal"> Communal</v-checkbox>
            <v-col>
              <v-text-field v-model="groceryItem.name"
                placeholder="Item Name"
                :rules="itemNameRules" ></v-text-field>
              <v-text-field v-model="groceryItem.quantity" 
                placeholder="Remaining" 
                hide-details></v-text-field>
                <v-spacer></v-spacer>
            </v-col>
            <v-col cols="5">
              <v-select v-model="groceryItem.location" label="Location" :items="locations"  ></v-select>
            </v-col>
            <v-divider vertical class="mx-4"></v-divider>
          </v-row>
        


          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="validateGroceryItem()" variant="text" color="primary">
              Save
            </v-btn>
            
          </v-card-actions>
        </v-form>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <!-- End Panels-->
    </v-expansion-panels>


    My Items
  </div>
</template>

<script>
import { db } from '@/firebase';
import axios from 'axios'; 

export default {
  name: 'UploadGroceries',
  data() {
    return {
      groceryItem:{
        communal: false,
        name: '',
        location: '',
        quantity: '',
        household: this.$store.state.household
      },
      locations: ["freezer", "Cabinet1", "Cabinet2", "spice_rack"],
      groceries: [],
      itemNameRules: [
        value => !!value || 'This field is required'
      ]
      
    }
  },
  methods: {
    validateGroceryItem(){
      this.$refs.form.validate().then(data => {
        if(data.valid === true){
            this.saveGroceryItem()
          } else {
            window.alert("This field is required.")
          }
        } 
      ).catch(error => {
        console.log(error);
        window.alert(error);
      })
    },

    async saveGroceryItem() {

      const url = 'http://localhost:5001/unpack-the-pantry-fc442/us-central1/saveItem/saveItem'
      const ownerID = "someID"//this.$store.state.user.displayName
      
      try {
        const response = await axios.post(url, {
        ownerID: ownerID,
        groceryItem: this.groceryItem,
        household: this.household
      });

      if(response.status === 200){
        window.alert('Item Saved Successfully');
        //this.$store.commit('houseRegistered', houseHold)
      }
      } catch (error) {
        console.error(error);
        window.alert('An error occurred while saving your Item.');
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