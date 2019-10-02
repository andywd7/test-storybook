import Vue from 'vue'
import App from './App/App.vue'
import router from './App/router'

Vue.config.productionTip = false

// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
