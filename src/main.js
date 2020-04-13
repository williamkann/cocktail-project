import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import store from './vue/store/index.js'
import VueAxios from 'vue-axios'

// Use axios
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

var filter = function (text, length, clamp) {
  clamp = clamp || '...'
  var node = document.createElement('div')
  node.innerHTML = text
  var content = node.textContent
  return content.length > length ? content.slice(0, length) + clamp : content
}
Vue.filter('truncate', filter)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
