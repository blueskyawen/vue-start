module.exports = {
  props: ['num'],
  data () {
    return {
      name: '局部组件-AAAAA'
    }
  },
  template: '<div><h1>{{name}}: </h1><div>{{num}}</div></div>'
}
