import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../components/Homepage.vue'
import Cocktail from '../components/Cocktail.vue'
import Search from '../components/Search.vue'
import Category from '../components/Category.vue'

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
  },
  {
    path: '/category/:categoryName',
    name: 'category',
    component: Category
  },
  {
    path: '/search/:value',
    name: 'search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
