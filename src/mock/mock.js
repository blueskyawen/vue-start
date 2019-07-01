import Mock from 'mockjs'
var heros = require('./heros')

Mock.setup({
  timeout: '200-600'
})

Mock.mock('api/advance/heros', 'get', heros)

Mock.mock(/api\/advance\/heroDetail\/[\w*]/, 'get', function (req, res) {
  var id = req.url.split('/').reverse()[0]
  var temp = heros.heros.find(item => { return item.id === id })
  return {hero: temp || {}}
})

Mock.mock(/api\/hero\/edit\/[\w*]/, 'put', function (req, res) {
  var id = req.url.split('/').reverse()[0]
  var temp = heros.heros.find(item => { return item.id === id })
  if (temp) {
    temp.name = JSON.parse(req.body).hero.name
    return temp
  } else {
    return {}
  }
})
