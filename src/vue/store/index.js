import Vue from 'vue'
import Vuex from 'vuex'
import cocktailsStore from './modules/cocktails'
import categoriesStore from './modules/categories'
import ingredientsStore from './modules/ingredients'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    cocktails: cocktailsStore,
    categories: categoriesStore,
    ingredients: ingredientsStore
  }
})
