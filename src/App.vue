<template>
  <v-app>
    <v-content>
      <HomePage/>
    </v-content>
  </v-app>
</template>

<script>
import HomePage from './components/HomePage'

export default {
  name: 'App',
  components: {
    HomePage
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>
  @font-face {
    font-family: 'Adobe Clean Regular';
    src: url('./assets/fonts/AdobeClean-Regular.eot');
    src: url('./assets/fonts/AdobeClean-Regular.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/AdobeClean-Regular.woff') format('woff'),
    url('./assets/fonts/AdobeClean-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  .v-btn {
    text-transform: initial !important;
  }
  .theme--light.application {
    color: #170C3A !important;
  }
  .v-input__slot {
    background-color: #EBEAED !important;
    box-shadow: none !important;
  }
</style>

