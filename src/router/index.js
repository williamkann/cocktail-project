import Vue from 'vue'
import VueRouter from 'vue-router'
import Cocktails from '../components/Cocktails.vue'
import Recipe from '../components/Recipe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'cocktails',
    component: Cocktails
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
