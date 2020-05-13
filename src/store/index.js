// src/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    token: '',
    user: {},
    menu: []
  }
}

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isLoggedIn: state => {
      return state.token
    },
    getUser: state => {
      return state.user
    },
    menu: state => {
      return state.menu
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    RESET: state => {
      Object.assign(state, getDefaultState())
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
    },
    UPDATE_MENU_ITEM: (state, item) => {
      state.menu.map(arrItem => {
        if (arrItem.id === item.id) {
          // eslint-disable-next-line no-unused-expressions
          arrItem.name = item.name
          arrItem.ingredients = item.ingredients
          arrItem.price = item.price
        }
      })
    }
  },
  actions: {
    login: ({ commit, dispatch }, { token, user }) => {
      commit('SET_TOKEN', token)
      commit('SET_USER', user)
      // set auth header
      Axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    set_menu: ({ commit, dispatch }, { menu }) => {
      commit('SET_MENU', menu)
    },
    update_menu_item: ({ commit, dispatch }, data) => {
      console.log(data)
      commit('UPDATE_MENU_ITEM', data)
    },
    logout: ({ commit }) => {
      commit('RESET', '')
    }
  }
})
