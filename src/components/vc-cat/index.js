import vcButton from './vc-button'
import vcFromGroup from './vc-form-group'
import vcFromControl from './vc-form-control'
import vcFromLabel from './vc-form-label'
import vcInput from './vc-input'
import vcTextArea from './vc-textarea'
import vcCheckbox from './vc-checkbox'
import vcMutilCheckbox from './vc-mutil-checkbox'
import vcRadio from './vc-radio'

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
  }
}

export default vcCat
