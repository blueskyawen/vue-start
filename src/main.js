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
import VcCat from 'vc-shadow-cat'
import 'vc-shadow-cat/vc-shadow-cat.css'

Vue.use(VueAxios, axios)
Vue.use(vcCat)
Vue.use(VcCat)

// mavonEditor - markdown
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor)

import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

import VueTinymce from "@packy-tang/vue-tinymce"
Vue.use(VueTinymce)

import 'highlight.js/styles/monokai-sublime.css'

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

/* import CKEditor from '@ckeditor/ckeditor5-vue2';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';
// import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn';
Vue.use(CKEditor); */

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
