import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '@/components/hello/Hello'
import helloTemplate from '@/components/hello/hello-template'
// import helloDirective from '@/components/hello/hello-directive'
import helloStyle from '@/components/hello/hello-style'
// import helloForm from '@/components/hello/hello-form'
import helloEvent from '@/components/hello/hello-event'
import Basic from '@/components/basic/Basic'
import Advance from '@/components/advance/advance'
import Vuexd from '@/components/vuex/vuex'
import Dashboard from '@/components/advance/heros/dashborad'
import Herolist from '@/components/advance/heros/hero-list'
import HeroDetail from '@/components/advance/heros/hero-detail'
import AddHero from '@/components/advance/heros/add-hero'
import state from '@/components/vuex/state/state'
import getter from '@/components/vuex/getter/getter'
import action from '@/components/vuex/action/action'
import module from '@/components/vuex/module/module'
import NotFound from '@/components/not-found'
import asyncLoading from '@/components/vc-cat/vc-async-loading.vue'
import asyncError from '@/components/vc-cat/vc-async-error.vue'

import editor from '@/components/editor/editor.vue'

Vue.use(VueRouter)

function lazyLoadView () {
  const asyncComponentForm = () => ({
    component: import('@/components/hello/hello-form'),
    loading: asyncLoading,
    error: asyncError,
    delay: 200,
    timeout: 15000
  })
  return Promise.resolve({
    functional: true,
    render (h, {data, children}) {
      return h(asyncComponentForm, data, children)
    }
  })
}

const routes = [
  { path: '/', redirect: '/hello' },
  { path: '/hello',
    component: Hello,
    children: [
      { path: '', redirect: 'template' },
      { path: 'template', component: helloTemplate },
      { path: 'innerDirective', component: () => import('@/components/hello/hello-directive') },
      { path: 'styles', component: helloStyle },
      { path: 'form', component: () => lazyLoadView() },
      { path: 'event', component: helloEvent }
    ]
  },
  { path: '/basic', component: Basic },
  { path: '/advance',
    component: Advance,
    children: [
      {path: '', component: Dashboard},
      {path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        children: [
          {path: 'detail/:id', component: HeroDetail, props: {navFrom: 'dashboard'}}
        ]
      },
      {path: 'herolist',
        name: 'herolist',
        component: Herolist,
        meta: {requireAuth: true},
        children: [
          {path: 'detail/:id',
            component: HeroDetail,
            props: {navFrom: 'list'},
            beforeEnter: (to, from, next) => { console.log('beforeEnter 01'); next() }
          }
        ]
      },
      {
        path: 'addhero',
        component: AddHero
      }
    ]
  },
  { path: '/vuex',
    component: Vuexd,
    children: [
      { path: '', redirect: 'state' },
      { path: 'state', component: state },
      { path: 'getter', component: getter },
      { path: 'action', component: action },
      { path: 'module', component: module }
    ]
  },
  {
    path: '/editor',
    component: editor
  },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  routes: routes,
  linkActiveClass: 'link-active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
router.beforeEach((to, from, next) => {
  console.log('route beforeEach 01')
  console.log(to)
  console.log(from)
  if (to.matched.some(item => item.meta.requireAuth)) {
    if (from.path === '/advance' && to.path === '/advance/herolist' && to.query.auth === 'false') {
      alert('have to set auth to true !')
      next('/advance')
    } else {
      next()
    }
  } else {
    next()
  }
})
router.beforeEach((to, from, next) => {
  console.log('route beforeEach 02')
  next()
})
router.beforeResolve((to, from, next) => {
  console.log('route beforeResolve 01')
  next()
})
router.beforeResolve((to, from, next) => {
  console.log('route beforeResolve 02')
  next()
})
router.afterEach((to, from, next) => {
  console.log('route afterEach 01')
})
router.afterEach((to, from, next) => {
  console.log('route afterEach 02')
})

export default router
