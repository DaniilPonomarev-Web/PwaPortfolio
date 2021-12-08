import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    MySkills: [],
    Reviews: [],
  },
  mutations: {
    SET_MYSKILLS(state, MySkills) {
      state.MySkills = MySkills
    },
    SET_REVIEWS(state, Reviews) {
      state.Reviews = Reviews
    }
  },
  actions: {
    async getMySkills({ commit }) {
      axios.get('http://api.ponomarevdaniil.fun:8080/api/skills')
          .then(response => {
              commit('SET_MYSKILLS', response.data);
      })
    },
    async getReviews({ commit }) {
      axios.get('http://api.ponomarevdaniil.fun:8080/api/rewiews')
          .then(response => {
              commit('SET_REVIEWS', response.data)
      })
    },
  },
  getters: {
  },
  modules: {
  }
})
