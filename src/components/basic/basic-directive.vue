<template>
  <div class="basicDirective">basicDirective</div>
</template>

<script>
export default {
  name: 'basicDirective',
  beforeCreate: function () {
    console.log('basicDirective ===== beforeCreate')
  },
  created: function () {
    console.log('basicDirective ===== created')
  },
  beforeMount: function () {
    console.log('basicDirective ===== beforeMount')
  },
  mounted: function () {
    console.log('basicDirective ===== mounted')
  },
  beforeUpdate: function () {
    console.log('basicDirective ===== beforeUpdate')
  },
  updated: function () {
    console.log('basicDirective ===== updated')
  },
  beforeDestroy: function () {
    console.log('basicDirective ===== beforeDestroy')
  },
  destroyed: function () {
    console.log('basicDirective ===== destroyed')
  }
}
</script>

<style scoped>

</style>
