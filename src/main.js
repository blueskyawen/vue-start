// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import VueAxios from 'vue-axios'
import vcCat from './components/vc-cat'
import './mock/mock'

Vue.use(VueAxios, axios)
Vue.use(vcCat)

Vue.config.productionTip = false
Vue.config.keyCodes.awen = 67

Vue.directive('yc-color', {
  bind: function (el, binding, vnode) {
    el.focus()
    el.style.backgroundColor = binding.value
  },
  update: function (el, binding, vnode) {
    if (binding.arg === 'update') {
      el.style.backgroundColor = binding.value
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
