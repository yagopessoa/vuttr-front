import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#170C3A',
    secondary: '#8F8A9B',
    accent: '#30C3FC',
    error: '#F95E5A',
    info: '#365DF0',
    success: '#12DB89',
    warning: '#FFBB43'
  }
})
