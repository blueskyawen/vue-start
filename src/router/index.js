import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Basic from '@/components/Basic'
import Advance from '@/components/Advance'
import Help from '@/components/Help'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/hello', component: HelloWorld },
  { path: '/basic', component: Basic },
  { path: '/advance', component: Advance },
  { path: '/help', component: Help }
]

export default new VueRouter({
  routes: routes,
  linkActiveClass: 'link-active'
})
