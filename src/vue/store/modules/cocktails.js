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
    // console.log(state.cocktails.find(_ => _.idDrink === parseInt(idDrink.idDrink)))
    // return state.cocktails.find(_ => _.idDrink === parseInt(idDrink.idDrink))
    return state.cocktail.drinks[0]
  },
  getCocktailRandom: state => {
    return state.cocktail
  },
  getCocktailSearch: state => strDrink => {
    var resultSearch = []
    state.cocktails.forEach(function (cocktail) {
      const regexpSearch = new RegExp(strDrink, 'i')
      if (regexpSearch.test(cocktail.strDrink)) {
        resultSearch.push(cocktail)
      }
    })
    return resultSearch
  },
  getCocktailsByCategory: state => strCategory => {
    var resultSearch = []
    state.cocktails.forEach(function (cocktail) {
      if (cocktail.strCategory === strCategory.strCategory) {
        resultSearch.push(cocktail)
      }
    })
    return resultSearch
  },
  getCocktailsByLetter: state => letter => {
    var resultSearch = []
    state.cocktails.forEach(function (cocktail) {
      if (cocktail.strDrink.charAt(0) === letter.letter) {
        resultSearch.push(cocktail)
      }
    })
    return resultSearch
  },
  getCocktailsByAlcoholic: state => strAlcoholic => {
    var resultSearch = []
    state.cocktails.forEach(function (cocktail) {
      if (cocktail.strAlcoholic === strAlcoholic) {
        resultSearch.push(cocktail)
      }
    })
    return resultSearch
  }
}

const mutations = {
  addCocktails (state, cocktail) {
    const existing = state.cocktails.findIndex(e => e.idDrink === cocktail.idDrink)
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
  async fetchCocktailById ({ commit }, { id }) {
    const { data } = await axios.get(api('/lookup.php?i=' + id))
    console.log('Fetched a cocktail by id ', JSON.parse(JSON.stringify(data)))
    commit('addCocktail', data)
  },

  async fetchCocktailsByName ({ commit }, { strDrink }) {
    const { data } = await axios.get(api('/search.php?s=' + strDrink))
    console.log('Fetched a cocktails by name ', JSON.parse(JSON.stringify(data)))
    if (data.drinks !== null) {
      data.drinks.forEach(d => commit('addCocktails', d))
    }
  },
  async fetchRandomCocktail ({ commit }) {
    const { data } = await axios.get(api('/random.php'))
    console.log('Fetched a random cocktail', JSON.parse(JSON.stringify(data.drinks)))
    commit('addCocktail', data)
  },
  async fetchCocktailsForCategory ({ commit }, { category }) {
    const { data } = await axios.get(api('filter.php?c=' + category.split(' ').join('_')))

    // The API to get cocktails by category just gives us the name + thumbnail + idDrink so we add the property category
    data.drinks.forEach(function (d) { d.strCategory = category })
    console.log('Fetched a cocktails for category', JSON.parse(JSON.stringify(data)))
    data.drinks.forEach(d => commit('addCocktails', d))
  },
  async fetchCocktailsByLetter ({ commit }, { letter }) {
    const { data } = await axios.get(api('search.php?f=' + letter))
    console.log('Fetched a cocktails by letter', JSON.parse(JSON.stringify(data)))
    data.drinks.forEach(d => commit('addCocktails', d))
  },
  async fetchCocktailsByIngredient ({ commit }, { ingredient }) {
    const { data } = await axios.get(api('filter.php?i=' + ingredient))

    // The API to get cocktails by ingredient just gives us the name + thumbnail + idDrink so we add the property strIngrdient to track
    data.drinks.forEach(function (d) { d.strIngredient = ingredient })
    console.log('Fetched a cocktails by ingredient', JSON.parse(JSON.stringify(data)))
    // data.drinks.forEach(d => commit('addCocktails', d))
  },
  async fetchCocktailsByCategory ({ commit }, { category }) {
    const { data } = await axios.get(api('filter.php?c=' + category))

    // The API to get cocktails by ingredient just gives us the name + thumbnail + idDrink so we add the property strCategory to track
    data.drinks.forEach(function (d) { d.strCategory = category })
    console.log('Fetched cocktails by category', JSON.parse(JSON.stringify(data)))
    data.drinks.forEach(d => commit('addCocktails', d))
  },
  async fetchCocktailsByAlcoholic ({ commit }, { isAlcoholic }) {
    const { data } = await axios.get(api('filter.php?a=' + isAlcoholic))

    // The API to get cocktails by ingredient just gives us the name + thumbnail + idDrink so we add the property strAlcoholic to track
    data.drinks.forEach(function (d) { d.strAlcoholic = isAlcoholic })
    console.log('Fetched cocktails by isAlcoholic', JSON.parse(JSON.stringify(data)))
    data.drinks.forEach(d => commit('addCocktails', d))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
