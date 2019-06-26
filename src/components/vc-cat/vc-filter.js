/**
 * @return {string}
 */
export let lowercase = function (value) {
  if (!value) return ''
  return String(value).toLowerCase()
}
/**
 * @return {string}
 */
export let upperCase = function (value) {
  if (!value) return ''
  return String(value).toUpperCase()
}
/**
 * @return {Array}
 */
export let keyValue = function (value) {
  if (value.toString() !== '[object Object]') return []
  var tmps = []
  for (var key in value) {
    tmps.push([key, value[key]])
  }
  return tmps
}
/**
 * @return {string | Array}
 */
export let slice = function (value, start, end) {
  if (!value) return ''
  var scli = {start: 0, end: 0}
  scli.start = start && !isNaN(start) ? +start : 0
  scli.end = end && !isNaN(end) ? +end : 0
  if (Array.isArray(value)) {
    return scli.end ? value.slice(scli.start, scli.end) : value.slice(scli.start)
  } else {
    return scli.end ? value.toString().slice(scli.start, scli.end) : value.toString().slice(scli.start)
  }
}
/**
 * @return {string}
 */
export let percent = function (value, digitsInfo) {
  if (!value || isNaN(value)) return ''
  if (digitsInfo && !isNaN(digitsInfo)) {
    return Number(value * 100).toFixed(+digitsInfo) + '%'
  } else {
    return Math.floor(value * 100) + '%'
  }
}
/**
 * @return {string}
 */
export let json = function (value, space) {
  if (!value) return ''
  if (space) {
    var tmpSp = !isNaN(space) ? Math.floor(Number(space)) : space.toString()
    return JSON.stringify(value, null, tmpSp)
  } else {
    return JSON.stringify(value)
  }
}
/**
 * @return {string}
 */
export let date = function (value, format) {
  if (!value) return ''
  if (value instanceof Date) {
    var dateP = {
      year: value.getFullYear(),
      month: value.getMonth(),
      date: value.getDate(),
      day: value.getDay(),
      hour: value.getHours(),
      minute: value.getMinutes(),
      second: value.getSeconds()
    }
    var weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    if (format) {
      return value.toString()
    } else {
      return dateP.year + '/' + dateP.month + '/' + dateP.date + ' ' + weekDay[dateP.day] + ' ' +
        dateP.hour + ':' + dateP.minute + ':' + dateP.second
    }
  } else {
    return value.toString()
  }
}
