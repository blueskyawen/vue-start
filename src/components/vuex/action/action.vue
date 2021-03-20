<template>
  <div class="action">
    <p>{{ content }}</p>
  </div>
</template>

<script>
import myName from '../../../mock/add.js'
export default {
  name: 'action',
  data () {
    return {
      content: ''
    }
  },
  created () {
    this.content = myName
  }
}
</script>

<style scoped lang="less">

</style>
