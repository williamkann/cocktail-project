import axios from 'axios'
// import config from '../../client.config'

// /** @param {String} path */
// function api (path) {
//   return config.apiURL + path
// }

const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: {}
}

const getters = {

  isLoggedIn: state => !!state.token,
  authStatus: state => state.status
  // isAuthenticated: state => !!state.connected,
  // hasAccessRight: state => right => {
  //   if (state.user.role && state.user.role.rights) {
  //     return !!state.user.role.rights.find(r => r === right)
  //   }
  //   return false
  // }
}

const actions = {
  login ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: 'http://localhost:3000/login', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          // Add the following line:
          axios.defaults.headers.common.Authorization = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  register ({ commit }, { user }) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          // Add the following line:
          axios.defaults.headers.common.Authorization = token
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
      resolve()
    })
  }
  // async fetchUser ({ commit }) {
  //   commit('AUTH_REQUEST')
  //   try {
  //     const { data } = await axios.get(api('/me'))
  //     commit('AUTH_SUCCESS', data)
  //   } catch (err) {
  //     commit('AUTH_ERROR')
  //   }
  // },

  // async login ({ commit }, { email, password }) {
  //   commit('AUTH_REQUEST')
  //   try {
  //     if (email === 'william.kann@gmail.com' && password === '123') {
  //       commit('AUTH_SUCCESS', { firstname: 'william', lastname: 'kann', email: email, role: 'client' })
  //     }
  //   } catch (err) {
  //     commit('AUTH_ERROR')
  //   }
  // },

  // async logout ({ commit }) {
  //   commit('AUTH_REQUEST')
  //   try {
  //     const { data } = { firstname: 'william', lastname: 'kann', email: null, role: 'client' }
  //     commit('UNSET_USER', data)
  //     commit('AUTH_SUCCESS')
  //   } catch (err) {
  //     commit('AUTH_ERROR')
  //   }
  // }
}

const mutations = {
  auth_request (state) {
    state.status = 'loading'
  },
  auth_success (state, token, user) {
    state.status = 'success'
    state.token = token
    state.user = user
  },
  auth_error (state) {
    state.status = 'error'
  },
  logout (state) {
    state.status = ''
    state.token = ''
  }
  // AUTH_REQUEST (state) {
  //   state.status = 'loading'
  // },
  // AUTH_SUCCESS (state, { firstname, lastname, email, role }) {
  //   state.status = 'success'
  //   state.connected = true
  //   state.user.firstname = firstname
  //   state.user.lastname = lastname
  //   state.user.email = email
  //   state.user.role = role
  // },
  // AUTH_ERROR (state) {
  //   state.status = 'error'
  //   state.connected = false
  // },
  // UNSET_USER (state) {
  //   state.user.firstname = ''
  //   state.user.lastname = ''
  //   state.user.email = ''
  //   state.user.role = null
  //   state.connected = false
  // }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
