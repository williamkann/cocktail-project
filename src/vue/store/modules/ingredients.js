import axios from 'axios'
import config from '../../client.config'

/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

/** @param {String} path */
function image (path) {
  return config.imageURL + path
}

const state = {
  ingredients: [],
  images: []
}

const getters = {
  getIngredientByName: state => strIngredient => {
    const found = state.ingredients.find(_ => _.strIngredient === strIngredient)
    return found
  },
  getIngredientImage: state => strIngredient => {
    const found = state.images.find(_ => _.strIngredient === strIngredient.strIngredient)
    return found
  }
}

const mutations = {
  addIngredients (state, ingredient) {
    const existing = state.ingredients.findIndex(i => i.idIngredient === ingredient.idIngredient)
    if (existing !== -1) {
      state.ingredients[existing] = ingredient
    } else {
      state.ingredients.push(ingredient)
    }
  },
  addIngredient (state, ingredient) {
    state.ingredient = ingredient
  },
  addImages (state, image) {
    const existing = state.images.findIndex(i => i === image)
    if (existing !== -1) {
      // console.log(image)
      state.images[existing] = image
    } else {
      // console.log(image)
      state.images.push(image)
    }
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
    commit('addIngredients', data)
  },

  async fetchImagesForIngredient ({ commit }, { ingredient }) {
    // The image doesn't contain a string identifier so we added strIngredient to identify each image
    const data = { strImage: image('' + ingredient + '.png'), strIngredient: ingredient }
    console.log(typeof data.strImage)
    console.log('Fetched ingredient by name', JSON.parse(JSON.stringify(data)))
    commit('addImages', data)
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
