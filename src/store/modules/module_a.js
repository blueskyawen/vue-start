export default {
  state: {
    city: 'hangzhou',
    name: 'xuxian',
    site: '雷峰塔'
  },
  getters: {
    city_name: (state) => {
      return state.city
    },
    person_name: (state) => {
      return state.name
    },
    site_name: (state) => {
      return state.site
    },
    full_name: (state, getters, rootState, rootGetters) => {
      return state.city + getters.site_name
    }
  },
  mutations: {
    SET_SITE (state, site) {
      state.site = site
    }
  },
  actions: {
    getName ({state, commit, dispatch, getters, rootState, rootGetters}) {
      setTimeout(() => {
        commit('SET_SITE', getters.site_name + rootGetters.title)
      }, 1000)
    }
  }
}
