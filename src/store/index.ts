import Vuex from 'vuex'

export default () => {
  return new Vuex.Store({
    state: {
      a: 11
    },
    mutations: {
      increment(state) {
        state.a++
      }
    }
  })
}
