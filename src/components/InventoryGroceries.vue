<template>
  <div>
    <v-expansion-panels>
      <!-- Panel 1-->
      <v-expansion-panel>
        <v-expansion-panel-title v-slot="{ open }">
          <v-row no-gutters>
            <v-col cols="4" class="d-flex justify-start">
              Add Groceries
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

          <!-- EXPANSION PANEL FORM FOR ADDING INVENTORY -->
          <v-form ref="form">

            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-checkbox v-model="groceryItem.communal"> Communal</v-checkbox>
              <v-col>
                <v-text-field v-model="groceryItem.name" placeholder="Item Name" :rules="itemNameRules"></v-text-field>
                <v-text-field v-model="groceryItem.quantity" placeholder="Remaining" hide-details
                  :rules="itemQuantityRules"></v-text-field>
                <v-spacer></v-spacer>
              </v-col>
              <v-col cols="5">
              <!-- Adding the `return-object` attribute saves the entire object instead of just the 'id' of the location -->
                <v-select v-model="groceryItem.location" label="Location" :items="locations" item-title="name"
                  item-value="id"> 

                  <!-- Customizing each Location with a delete button -->
                  <template v-slot:item="{ item, props }">
                    <v-list-item v-bind="props">
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                      <v-spacer></v-spacer>

                      <!-- Use native click event to ensure deleteLocation is triggered -->
                      <v-btn icon @click.native.stop="deleteLocation(item.value)" color="red">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item>
                  </template>
                </v-select>
                <v-select v-model="groceryItem.UoM" label="Unit of Measure" :items="UoM"></v-select>
              </v-col>
              <v-divider vertical class="mx-4"></v-divider>
            </v-row>



            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="addNewLocation()" color="primary" variant="text">
                Add New Location
              </v-btn>

              <v-btn @click="validateGroceryItem()" variant="text" color="primary">
                Save
              </v-btn>

            </v-card-actions>
          </v-form>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <!-- End 'Add Grocery' Expansion Panels-->
    </v-expansion-panels>

    <v-data-table :headers="headers" :items="groceries" item-value="name" show-select dense>

      <!-- -->
      <template v-slot:item.name="{ item }">
        <v-text-field v-model="item.name" density="compact" variant="underlined"
          @blur="updateGroceryItemFromBrowser(item)">
        </v-text-field>
      </template>

      <!-- Edit location in Data Table -->
      <template v-slot:item.location="{ item }">
        <v-btn>
          {{ getLocationName(item.location) }}
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                v-for="loc in locations"
                :key="loc.id"
                :value="loc.id"
                @click="selectLocation(loc, item)">

                <v-list-item-title> {{ loc.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>

      <template v-slot:item.UoM="{item}">
        <v-btn>
          {{ item.UoM }}
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                v-for="unit in UoM"
                :key="unit"
                :value="unit"
                @click="selectUnits(unit, item)">
                <v-list-item-title> {{ unit }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>

      <!-- Edit Quantity Field for Data Table. -->
      <template v-slot:item.quantity="{ item }">
        <v-text-field v-model="item.quantity" density="compact" variant="underlined"
          @blur="updateGroceryItemFromBrowser(item)">
        </v-text-field>
      </template>


      <!-- Delete -->
      <template v-slot:item.actions="{ item }">
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
import {
  dexieSaveGroceryItem, dexieGetGroceryItems, dexieDeleteGroceryItem,
  dexieUpdateGroceryItem, dexieGetLocations, dexieSaveLocation, dexieDeleteLocation
} from '@/db/groceryService';

export default {
  name: 'InventoryGroceries',
  data() {
    return {
      headers: [
        { title: "Ingredient", value: "name" },
        { title: "Location", value: "location" },
        { title: "Quantity", value: "quantity" },
        { title: "Unit of Measure", value: "UoM" },
        { title: "Delete", value: "actions", sortable: false }
      ],
      groceryItem: {
        communal: false,
        name: '',
        location: '',
        quantity: '',
        UoM: '',
        household: this.$store.state.household
      },
      locations: [],
      UoM: ["N/A","cups", "fl oz", "oz", "pint", "quart", "gallon", "grams", "milliliters", "pounds"],
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
    async getGroceryItemsFromCloud() {
      const ownerID = this.$store.state.user.uid;
      const getUserItems = httpsCallable(functions, "getUserItems");
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.error("User is not authenticated.");
          return;
        }
        const response = await getUserItems({ ownerID: ownerID });
        console.log("getUserItems():" + JSON.stringify(response.data, null, 2));
        // Firebase always returns 200, so we check if there's data. 
        if (response.data) {
          console.log(response);
          this.groceries = response.data.items;
          console.log("this.groceries: " + this.groceries);
        }
      } catch (error) {
        console.error(error);
        window.alert(error);
      }
    },

    async getGroceryItemsFromBrowser() {
      try {
        this.groceries = await dexieGetGroceryItems();
      } catch (error) {
        console.error("Error loading groceries: ", error);
        window.alert(error);
      }

    },

    async getLocationsFromBrowser() {
      try {
        const storedLocations = await dexieGetLocations();
        this.locations = storedLocations;
        console.log("this.locations:" + JSON.stringify(this.locations));
      } catch (error) {
        console.error("Error loading locations: ", error);
        window.alert(error);
      }
    },

    async deleteLocation(id) {
      console.log("deleteLocation Called: id = ", id);
      const locationInUse = this.groceries.some(item => item.location === id);
      if (locationInUse) {
        window.alert("Cannot delete location: Items are using this location.");
        return;
      }

      try {
        this.locations = this.locations.filter(loc => loc.id !== id);
        await dexieDeleteLocation(id);

      } catch (error) {
        console.error("Error deleting this location: ", error);
        console.log("id: " + id);
        window.alert("An error occured while deleting the location.");
      }
    },

    async updateGroceryItemFromBrowser(item) {
      try {
        await dexieUpdateGroceryItem(item.id, {
          name: item.name,
          quantity: item.quantity,
          location: item.location,
          UoM:item.UoM
        });
        console.log("Updated Item: ", item);
      } catch (error) {
        console.error("Error updating item: ", error);
        window.alert("An error occurred while updating the item: " + error);
      }
    },

    validateGroceryItem() {
      this.$refs.form.validate().then(data => {
        if (data.valid === true) {
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

    async saveGroceryItemInBrowser() {
      try {
        console.log("SaveGIInBrowser: " + JSON.stringify(this.groceryItem));
        await dexieSaveGroceryItem({ ...this.groceryItem });
        this.groceries.push({ ...this.groceryItem });
      } catch (error) {
        console.error("Error saving item: ", error);
        window.alert("An error occurred while saving your item.");
      }
    },

    async addNewLocation() {
      const newLoc = prompt("Enter a new location:");
      if (newLoc && !this.locations.includes(newLoc)) {
        await dexieSaveLocation(newLoc);
        this.locations.push(newLoc);
      }
    },

    selectLocation(location, grocItem){
      grocItem.location = location.id; 
      console.log("Saving Grocery Item: " + JSON.stringify(grocItem));
      this.updateGroceryItemFromBrowser(grocItem);
    },

    selectUnits(unit, grocItem){
      grocItem.UoM = unit;
      this.updateGroceryItemFromBrowser(grocItem)
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

        if (response.status === 200) {
          this.groceries.push({ ...this.groceryItem });
          //this.$store.commit('houseRegistered', houseHold)
        }
      } catch (error) {
        console.error(error);
        window.alert('An error occurred while saving your Item.');
      }
    },
    async deleteGroceryItemFromBrowser(id) {
      if (!id) {
        return;
      }
      try {
        await dexieDeleteGroceryItem(id);
        this.groceries = await dexieGetGroceryItems();
      } catch (error) {
        console.error("Error deleting item:", error);
        window.alert("An error occurred while deleting the item.");
      }
    }

  },
  computed: {
    // your computed properties here
    ...mapGetters(['isAuthenticated']),
    getLocationName() {
    return (locationId) => {
      //There's no need to do a dexie lookup since this.locations already has what we need. 
      const location = this.locations.find(loc => loc.id === locationId);
      return location ? location.name : "Unknown";  // Default to "Unknown" if not found
    };}
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal) {
        this.getGroceryItems();
      }
    }
  },
  mounted() {
    if (this.isAuthenticated) {
      this.getGroceryItemsFromCloud();
    } else {
      this.getGroceryItemsFromBrowser();
      this.getLocationsFromBrowser();
    }
  }
}
</script>

<style>
/* your component styles here */
</style>