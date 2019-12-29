import vcButton from './vc-button'
import vcFromGroup from './vc-form-group'
import vcFromControl from './vc-form-control'
import vcFromLabel from './vc-form-label'
import vcInput from './vc-input'
import vcTextArea from './vc-textarea'
import vcCheckbox from './vc-checkbox'
import vcMutilCheckbox from './vc-mutil-checkbox'
import vcRadio from './vc-radio'
import vcSwitch from './vc-switch'
import vcLoading from './vc-loading'
import * as vcFilter from './vc-filter'

const vcCat = {
  install: function (Vue) {
    Vue.component('vc-button', vcButton)
    Vue.component('vc-form-group', vcFromGroup)
    Vue.component('vc-form-control', vcFromControl)
    Vue.component('vc-form-label', vcFromLabel)
    Vue.component('vc-input', vcInput)
    Vue.component('vc-textarea', vcTextArea)
    Vue.component('vc-checkbox', vcCheckbox)
    Vue.component('vc-mutil-checkbox', vcMutilCheckbox)
    Vue.component('vc-radio', vcRadio)
    Vue.component('vc-switch', vcSwitch)
    Vue.component('vc-loading', vcLoading)
    Vue.directive('regIf', function (el, binding) {
      if (binding.value.reg.test(binding.value.value)) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    })
    Vue.filter('vcLowercase', vcFilter.lowercase)
    Vue.filter('vcUppercase', vcFilter.upperCase)
    Vue.filter('vcKeyValue', vcFilter.keyValue)
    Vue.filter('vcSlice', vcFilter.slice)
    Vue.filter('vcPercent', vcFilter.percent)
    Vue.filter('vcJson', vcFilter.json)
    Vue.filter('vcDate', vcFilter.date)
  }
}

export default vcCat
