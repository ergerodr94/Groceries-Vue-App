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


          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-checkbox> Communal</v-checkbox>
            <v-col>
              <v-text-field placeholder="Item Name" hide-details></v-text-field>
              <v-text-field placeholder="Remaining" hide-details></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-select placeholder="location" :items="locations" chips flat variant="solo"></v-select>
            </v-col>
            <v-divider vertical class="mx-4"></v-divider>
          </v-row>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" color="secondary">
              Cancel
            </v-btn>
            <v-btn variant="text" color="primary">
              Save
            </v-btn>
          </v-card-actions>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <!-- End Panels-->
    </v-expansion-panels>





    My Items
  </div>
</template>

<script>
export default {
  name: 'UploadGroceries',
  data() {
    return {
      locations: ["freezer", "Cabinet1", "Cabinet2", "spice_rack"]
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