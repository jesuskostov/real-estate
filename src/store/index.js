import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    homes: null
  },
  mutations: {
    TEST: (state, homes) => {
      state.homes = homes
    }
  },
  actions: {
    test: ({commit}, homes) => {
      commit('TEST', homes)
    }
  },
  modules: {
  }
})
