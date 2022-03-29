import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    drawer: false,
    fab: true,
    countryList: [],
    version: 'v1.1'
  },
  getters: {
  },
  mutations: {
    SET_DRAWER(state, payload) {
      state.drawer = payload
    },
    SET_FAB(state, payload) {
      state.fab = payload
    },
    ADD_COUNTRIES_DATA(state, payload) {
      state.countryList = payload
    }
  },
  actions: {
    loadCountryList: ({ commit }) => {
      axios
        .get(`https://api.coronastatistics.live/countries`)
        .then(response => {
          commit('ADD_COUNTRIES_DATA', response.data);
        }).catch(error => {
          throw new Error(`API ${error}`);
        });
    }
  }
})
