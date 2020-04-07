import axios from 'axios'
import config from '../../client.config'

/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

const state = {
  ingredients: []
}

const getters = {
  getIngredientById: state => id => state.ingredients.find(_ => _.idIngredient === parseInt(id))
}

const mutations = {
  addIngredients (state, ingredient) {
    const existing = state.ingredients.findIndex(i => i.idIngredient === ingredient.idIngredient)
    if (existing !== -1) {
      state.ingredients[existing] = ingredient
    } else {
      state.ingredients.push(ingredient)
    }
  }
}

const actions = {
  async fetchIngredients ({ commit }) {
    const { data } = await axios.get(api('/list.php?i=list'))
    console.log('data ingredients', JSON.parse(JSON.stringify(data)))
    // data.data.drinks.forEach(d => commit('addIngredients', d))
  },

  async fetchIngredient ({ commit }, { id }) {
    const { data } = await axios.get(api('/lookup.php?iid=' + id))
    commit('addModule', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
