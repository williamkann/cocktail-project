import Vue from 'vue'
import VueRouter from 'vue-router'
import Cocktails from '../components/Cocktails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'cocktails',
    component: Cocktails
  }
]

const router = new VueRouter({
  routes
})

export default router
