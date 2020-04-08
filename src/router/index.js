import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../components/Homepage.vue'
import Cocktail from '../components/Cocktail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: Homepage
  },
  {
    path: '/cocktail/:id',
    name: 'cocktail',
    component: Cocktail
  }
]

const router = new VueRouter({
  routes
})

export default router
