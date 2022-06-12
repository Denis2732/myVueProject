import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      count: 1,
      task:[],
      historyTask: [],
    }
  },
  mutations: {
    addToCardNumber(state, payload){
      state.count = payload
    },
    addTask(state, payload){
      state.task = payload
    },
    removeTask(state, payload){
      state.history = payload
    }
  }
})

export default store