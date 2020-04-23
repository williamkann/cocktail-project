import axios from 'axios'
// import config from '../../client.config'

/** @param {String} path */
// function api (path) {
//   return config.authURL + path
// }

const state = {
  connected: false,
  user: {
    firstname: '',
    lastname: '',
    email: '',
    role: {
      name: '',
      rights: []
    }
  },
  status: ''
}

const getters = {

  isAuthenticated: state => !!state.connected,
  hasAccessRight: state => right => {
    if (state.user.role && state.user.role.rights) {
      return !!state.user.role.rights.find(r => r === right)
    }
    return false
  },
  getUser: state => {
    return state.user
  }
}

const actions = {

  async login ({ commit }, { email, password }) {
    commit('AUTH_REQUEST')
    const { response } = await axios.post('http://localhost:4000/api/login', {
      login: email,
      password: password,
      withCredentials: true
    })
    console.log('responsfefzefzefzefzfzfefze is:' + response)
    commit('AUTH_SUCCESS')
  },
  async logout ({ commit }) {
    commit('AUTH_REQUEST')
    const { response } = await axios.get('http://localhost:4000/api/logout')
    console.log('logout:' + response)
    commit('UNSET_USER')
  },
  async updateUser ({ commit }, payload) {
    commit('MUTATE_USER', payload)
  }
}

const mutations = {

  AUTH_REQUEST (state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS (state) {
    state.status = 'success'
    state.connected = true
  },
  AUTH_ERROR (state) {
    state.status = 'error'
    state.connected = false
  },
  UNSET_USER (state) {
    state.user.firstname = ''
    state.user.lastname = ''
    state.user.email = ''
    state.user.role = null
    state.connected = false
  },
  MUTATE_USER: function (state, payload) {
    state.user = payload
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
