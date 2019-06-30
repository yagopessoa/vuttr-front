<template>
  <v-container>
    <v-layout wrap mt-4 pb-4>
      <v-flex 
        my-4
        xs12
        sm10 offset-sm1
        md8 offset-md2
        lg6 offset-lg3
      >
        <h1 class="display-3 font-weight-bold mb-2">
          VUTTR
        </h1>
        <p class="display-1 mb-4">Very Useful Tools to Remember</p>

        <v-flex pt-4>
          <v-text-field
            label="Search"
            prepend-inner-icon="search"
            placeholder="Type what you are searching for..."
            solo
            class="search-input"
          ></v-text-field>

          <!-- toggle button -->

          <!-- <v-btn class="info">Click me</v-btn> -->
        </v-flex>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      
    })
  }
</script>

<style>
  .search-input {
    width: 30%;
    min-width: 280px;
  }
</style>
