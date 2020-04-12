import axios from 'axios'
import config from '../../client.config'

/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

const state = {
  ingredients: [],
  ingredient: {}
}

const getters = {
  getIngredient: state => {
    return state.ingredient
  }
}

const mutations = {
  addIngredients (state, ingredient) {
    const existing = state.ingredients.findIndex(i => i.idIngredient === ingredient.idIngredient)
    if (existing !== -1) {
      console.log('ex')
      state.ingredients[existing] = ingredient
    } else {
      console.log('New')
      state.ingredients.push(ingredient)
    }
  },
  addIngredient (state, ingredient) {
    state.ingredient = ingredient
  }
}

const actions = {
  async fetchIngredients ({ commit }) {
    const { data } = await axios.get(api('/list.php?i=list'))
    console.log('Fetched all ingredients', JSON.parse(JSON.stringify(data)))
    // data.data.drinks.forEach(d => commit('addIngredients', d))
  },

  async fetchIngredientByName ({ commit }, { ingredient }) {
    const { data } = await axios.get(api('search.php?i=' + ingredient.split(' ').join('_')))
    console.log('Fetched ingredient by name', JSON.parse(JSON.stringify(data)))
    commit('addIngredient', data)
  }
  // async fetchIngredientById ({ commit }, { id }) {
  //   const { data } = await axios.get(api('/lookup.php?iid=' + id))
  //   commit('addModule', data)
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
