import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    username: ""
  },
  getters: {
    username: state => state.username,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token)
    },

    SET_USERNAME: (state, username) => {
      state.username = username;
    },

    resetState: (state) => {
      state.token = "";//将token清空.
      state.username = "";//清除username
    },

    //保存到localStorage中
    SAVE_USERNAME: (state, username) => {
      state.username = username;
      localStorage.setItem("userName", username);
    }






  },
  actions: {
  },
  modules: {

  }
})
