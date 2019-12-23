export let comptBB = {
  props: ['num'],
  data () {
    return {
      name: '局部组件-BBBBB'
    }
  },
  template: '<div><h1>{{name}}: </h1><div>{{num}}</div></div>'
}
export let comptCC = {
  props: ['num'],
  data () {
    return {
      name: '局部组件-CCCCC'
    }
  },
  template: '<div><h1>{{name}}: </h1><div>{{num}}</div></div>'
}
