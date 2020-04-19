import axios from 'axios'
import config from '../../client.config'

/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

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
  }
}

const actions = {
  async fetchUser ({ commit }) {
    commit('AUTH_REQUEST')
    try {
      const { data } = await axios.get(api('/me'))
      commit('AUTH_SUCCESS', data)
    } catch (err) {
      commit('AUTH_ERROR')
    }
  },

  async login ({ commit }, { email, password }) {
    commit('AUTH_REQUEST')
    try {
      if (email === 'william.kann@gmail.com' && password === '123') {
        commit('AUTH_SUCCESS', { firstname: 'william', lastname: 'kann', email: email, role: 'client' })
      }
    } catch (err) {
      commit('AUTH_ERROR')
    }
  },

  async logout ({ commit }) {
    commit('AUTH_REQUEST')
    try {
      const { data } = { firstname: 'william', lastname: 'kann', email: null, role: 'client' }
      commit('UNSET_USER', data)
      commit('AUTH_SUCCESS')
    } catch (err) {
      commit('AUTH_ERROR')
    }
  }
}

const mutations = {
  AUTH_REQUEST (state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS (state, { firstname, lastname, email, role }) {
    state.status = 'success'
    state.connected = true
    state.user.firstname = firstname
    state.user.lastname = lastname
    state.user.email = email
    state.user.role = role
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
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
