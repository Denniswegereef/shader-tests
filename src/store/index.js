import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dimensions: {
      innerHeight: null,
      innerWidth: null,
    },
  },

  getters: {
    dimensions: (state) => state.dimensions,
  },

  mutations: {
    dimensions(state, n) {
      state.dimensions.innerWidth = n.innerWidth;
      state.dimensions.innerHeight = n.innerHeight;
    },
  },
});
