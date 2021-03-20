<template>
  <div class="description-main">
    <div class="description-title">{{ title }}</div>
    <vc-row :type="'flex'" wrap="wrap">
      <slot></slot>
    </vc-row>
  </div>
</template>

<script>
export default {
  name: 'vc-description',
  props: {
    title: {
      type: String,
      default: ''
    },
    column: {
      type: Number,
      default: 3
    }
  },
  provide () {
    return {
      colNum: this.column
    }
  }
}
</script>

<style scoped lang="less">
.description-main {
  width: 100%;
  .description-title {
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 12px;
  }
}
</style>
