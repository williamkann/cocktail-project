import axios from 'axios'
import config from '../../client.config'

/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

const state = {
  cocktails: [],
  cocktail: {}
}

const getters = {
  getCocktailById: state => idDrink => {
    console.log(idDrink)
    return state.cocktails.find(_ => _.idDrink === parseInt(idDrink))
  },
  getCocktailRandom: state => {
    return state.cocktail
  },
  getCocktailSearch: state => {
    return state.cocktails
  }
}

const mutations = {
  addCocktails (state, cocktail) {
    const existing = state.cocktails.findIndex(e => e.idDrink === cocktail.id)
    if (existing !== -1) {
      state.cocktails[existing] = cocktail
    } else {
      state.cocktails.push(cocktail)
    }
  },
  addCocktail (state, cocktail) {
    state.cocktail = cocktail
  }
}

// var range = (function () {
//   var data = []
//   while (data.length < 128) data.push(String.fromCharCode(data.length))
//   return function (start, stop) {
//     start = start.charCodeAt(0)
//     stop = stop.charCodeAt(0)
//     return (start < 0 || start > 127 || stop < 0 || stop > 127) ? null : data.slice(start, stop + 1)
//   }
// })()

const actions = {
  // async fetchCocktails ({ commit }) {
  //   var charAlphaNum = [...range('A', 'Z'), ...range('0', '9')]
  //   charAlphaNum.forEach(async function (character) {
  //     var data = await axios.get(api('/search.php?f=' + character))
  //     if (data !== null) {
  //       // console.log('data', JSON.parse(JSON.stringify(data.data.drinks)))
  //       data.data.drinks.forEach(d => commit('addCocktail', d))
  //     }
  //   })
  // },

  async fetchCocktail ({ commit }, { id }) {
    const { data } = await axios.get(api('/lookup.php?i=' + id))
    console.log('Fetched a cocktail by id ', JSON.parse(JSON.stringify(data)))
    commit('addCocktail', data)
  },

  async fetchCocktailByName ({ commit }, { strDrink }) {
    const { data } = await axios.get(api('/search.php?s=' + strDrink))
    console.log('Fetched a cocktails by name ', JSON.parse(JSON.stringify(data)))
    data.drinks.forEach(d => commit('addCocktails', d))
    console.log(state.cocktails)
  },
  async fetchRandomCocktail ({ commit }) {
    const { data } = await axios.get(api('/random.php'))
    console.log('Fetched a random cocktail', JSON.parse(JSON.stringify(data.drinks)))
    commit('addCocktail', data)
  },
  async fetchCocktailsForCategory ({ commit }, { category }) {
    const { data } = await axios.get(api('/filter.php?c=' + category))
    data.drinks.forEach(d => commit('addCocktail', d))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
