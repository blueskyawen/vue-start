<template>
  <span class="vc-mutil-checkbox">
    <span class="checkbox-item" v-for="option in options" :key="option.value">
      <vc-checkbox v-model="option.checked" :value="option.name" @change="handleChange"></vc-checkbox>
    </span>
  </span>
</template>

<script>
import vccheckbox from './vc-checkbox'

export default {
  name: 'vc-mutil-checkbox',
  components: {'vc-checkbox': vccheckbox},
  props: {
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    value: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  created: function () {
    this.options.forEach(option => {
      if (this.value.includes(option.value)) {
        option.checked = true
      }
    })
  },
  methods: {
    handleChange: function () {
      let selects = this.options.filter(option => {
        return option.checked
      }).map(item => item.value)
      this.$emit('input', selects)
    }
  }
}
</script>

<style scoped>
  .vc-mutil-checkbox .checkbox-item {
    margin-right: 20px;
  }
</style>
