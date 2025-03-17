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
                hide-details
                :rules="itemQuantityRules"></v-text-field>
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

    <v-data-table
      :headers="headers"
      :items="groceries"
      item-value="id"
      show-select
  ><template v-slot:item.actions="{ item }">
    <v-btn @click="deleteGroceryItemFromBrowser(item.id)" color="red" variant="text">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  
  </template>
  
  </v-data-table>


    </div>
 
</template>

<script>
import { functions } from '@/firebase';
import axios from 'axios'; 
import { mapGetters } from 'vuex';
import { httpsCallable } from "firebase/functions";
import { getAuth } from "firebase/auth";
import { dexieSaveGroceryItem, dexieGetGroceryItems, dexieDeleteGroceryItem } from '@/db/groceryService';

export default {
  name: 'UploadGroceries',
  data() {
    return {
      headers: [
  { title: "Grocery", value: "name"},
  { title: "Location", value: "location"},
  { title: "Quantity", value: "quantity"},
  { title: "Unit of Measure", value: "UoM"},
  { title: "Delete", value: "actions", sortable:false}
],
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
      ],
      itemQuantityRules: [
        value => !!value || 'Quantity cannot be zero'
      ]
      
    }
  },
  methods: {
    async getGroceryItemsFromCloud(){
      const ownerID = this.$store.state.user.uid; 
      const getUserItems = httpsCallable(functions, "getUserItems");
      try {
        const auth = getAuth();
        const user = auth.currentUser; 

        if(!user){
          console.error("User is not authenticated.");
          return; 
        }
        const response = await getUserItems({ownerID: ownerID});
        console.log("getUserItems():" + JSON.stringify(response.data, null, 2));
        // Firebase always returns 200, so we check if there's data. 
        if(response.data){
          console.log(response);
          this.groceries = response.data.items;
          console.log("this.groceries: " + this.groceries);
      }
      } catch (error) {
        console.error(error);
        window.alert(error);
      }
    },

    async getGroceryItemsFromBrowser(){
      try {
        this.groceries = await dexieGetGroceryItems();
      } catch (error) {
        console.error("Error loading groceries: ", error);
        window.alert(error);
      }
      
    },

    validateGroceryItem(){
      this.$refs.form.validate().then(data => {
        if(data.valid === true){
            this.saveGroceryItemInBrowser()
          } else {
            window.alert("These fields are required.")
          }
        } 
      ).catch(error => {
        console.log(error);
        window.alert(error);
      })
    },

    async saveGroceryItemInBrowser(){
      try{
        await dexieSaveGroceryItem({...this.groceryItem});
        this.groceries.push({...this.groceryItem});
        window.alert("Item Saved Successfully");
      } catch (error){
        console.error("Error saving item: ", error);
        window.alert("An error occurred while saving your item.");
      }
    },

    async saveGroceryItemInCloud() {

      const url = process.env.VUE_APP_CLOUD_FUNCTIONS_URL + '/unpack-the-pantry-fc442/us-central1/saveItem/saveItem'
      const ownerID = "someID"//this.$store.state.user.displayName
      
      try {
        const response = await axios.post(url, {
        ownerID: ownerID,
        groceryItem: this.groceryItem,
        household: this.household
      });

      if(response.status === 200){
        this.groceries.push({...this.groceryItem});
        window.alert('Item Saved Successfully');
        //this.$store.commit('houseRegistered', houseHold)
      }
      } catch (error) {
        console.error(error);
        window.alert('An error occurred while saving your Item.');
      }
    },
    async deleteGroceryItemFromBrowser(id){
      if(! id){
        return;
      }
      try{
        await dexieDeleteGroceryItem(id);
        this.groceries = this.groceries.filter(item => item.id != id);
        window.alert("Item deleted successfully.");
      } catch (error) {
        console.error("Error deleting item:", error);
        window.alert("An error occurred while deleting the item.");
      }
    }
    
  },
  computed: {
    // your computed properties here
    ...mapGetters(['isAuthenticated']),
    
  },
  watch: {
    isAuthenticated(newVal){
      if(newVal){
        this.getGroceryItems();
      }
    }
  },
  mounted() {  
    if(this.isAuthenticated){
      this.getGroceryItemsFromCloud();
    } else {
      this.getGroceryItemsFromBrowser();
    }
  }
}
</script>

<style>
/* your component styles here */
</style>