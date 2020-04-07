import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../components/Homepage.vue'
import Recipe from '../components/Recipe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: Homepage
  },
  {
    path: '/recipe',
    name: 'recipe',
    component: Recipe
  }
]

const router = new VueRouter({
  routes
})

export default router
