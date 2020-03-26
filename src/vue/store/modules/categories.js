import axios from 'axios'
import config from '../../client.config'

/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

const state = {
  categories: []
}

const getters = {
//   getCategories: state => {
//     return state.categories.find(_ => _.idDrink === parseInt(idDrink))
//   }
}

const mutations = {
  addCategory (state, category) {
    const existing = state.categories.findIndex(e => e.strCategory === category.strCategory)
    if (existing !== -1) {
      state.categories[existing] = category
    } else {
      state.categories.push(category)
    }
  }
}

const actions = {
  async fetchCategories ({ commit }) {
    var data = await axios.get(api('list.php?c=list'))
    console.log('data', JSON.parse(JSON.stringify(data.data.drinks)))
    data.data.drinks.forEach(d => commit('addCategory', d))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
