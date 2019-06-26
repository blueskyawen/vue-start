import Vue from 'vue'
import Help from '@/components/Help'

describe('Help.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Help)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.help h1').textContent)
      .toEqual('Welcome to Vue.js App')
  })
})
