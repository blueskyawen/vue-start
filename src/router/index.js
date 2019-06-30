import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/components/hello/Hello'
import helloTemplate from '@/components/hello/hello-template'
import helloDirective from '@/components/hello/hello-directive'
import helloStyle from '@/components/hello/hello-style'
import helloForm from '@/components/hello/hello-form'
import helloEvent from '@/components/hello/hello-event'
import Basic from '@/components/basic/Basic'
import Advance from '@/components/advance/advance'
import Help from '@/components/Help'
import Dashboard from '@/components/advance/heros/dashborad'
import Herolist from '@/components/advance/heros/hero-list'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/hello' },
  { path: '/hello',
    component: Hello,
    children: [
      { path: '', redirect: 'template' },
      { path: 'template', component: helloTemplate },
      { path: 'innerDirective', component: helloDirective },
      { path: 'styles', component: helloStyle },
      { path: 'form', component: helloForm },
      { path: 'event', component: helloEvent }
    ]
  },
  { path: '/basic', component: Basic },
  { path: '/advance',
    component: Advance,
    children: [
      {path: 'dashboard', component: Dashboard},
      {path: 'herolist', component: Herolist}
    ]
  },
  { path: '/help', component: Help }
]

export default new VueRouter({
  routes: routes,
  linkActiveClass: 'link-active'
})
