import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app
  },
  state: {},
  mutations: {},
  getters: {}
})
export default store