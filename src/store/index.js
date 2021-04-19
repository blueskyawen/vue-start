import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './modules/module_a.js'
import moduleB from './modules/module_b.js'
import moduleC from './modules/module_c.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    person: {
      name: 'Jack',
      age: 10,
      weight: 30
    },
    nums: [2, 12, 43, 98, 35, 56, 32, 44, 76, 135, 1, 43, 58],
    title: 'hello to store !',
    count: 0
  },
  getters: {
    city_name: (state) => {
      return '北京'
    },
    personInfo: state => {
      return `name=${state.person.name} , age=${state.person.age} , weight=${state.person.weight}`
    },
    title: state => {
      return `title: ${state.title}`
    },
    count: state => {
      return `count: ${state.count}`
    },
    titleCount: (state, getters) => {
      return `${getters.title}, ${getters.count}`
    },
    nums: state => {
      return state.nums.join(', ')
    },
    numLen: state => {
      return state.nums.length
    },
    getNum: state => (index) => {
      return state.nums[index]
    },
    numSum: (state, getters) => {
      var tmp = 0
      for (var index = 0; index < getters.numLen; index++) {
        tmp += getters.getNum(index)
      }
      return tmp
    }
  },
  mutations: {
    changeAge (state) {
      state.person.age += Math.round(Math.random() * 10)
    },
    changeWeight (state) {
      state.person.weight += Math.round(Math.random() * 30)
    },
    changeWeight2 (state, g) {
      state.person.weight += g
    },
    addNums: state => {
      state.nums.push(Math.round(Math.random() * 10))
    },
    delNums: (state, index) => {
      state.nums.splice(index, 1)
    },
    reverceNums: (state) => {
      state.nums.reverse()
    }
  },
  modules: {
    moduleB,
    moduleA,
    moduleC
  }
})

export default store
