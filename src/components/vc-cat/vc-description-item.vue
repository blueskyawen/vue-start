<template>
  <vc-col :lg="getCols" class="description-item">
    <div class="description-item-label wrap" v-if="labelWrap" :style="getLabelWidth"
         :class="getLabelClass">{{ label }}</div>
    <div class="description-item-label ellipsis" v-else :title="label" :style="getLabelWidth" :class="getLabelClass">{{ label }}</div>
    <div class="description-item-content" v-if="contentWrap" :style="getContentWidth" :class="getContentClass">
      <slot></slot>
    </div>
    <div class="description-item-content" v-else :title="content" :style="getContentWidth" :class="getContentClass">
      <slot></slot>
    </div>
  </vc-col>
</template>

<script>
export default {
  name: 'vc-description-item',
  inject: ['colNum'],
  props: {
    label: {
      type: String,
      default: '--'
    },
    span: {
      type: Number,
      default: 1
    },
    labelWidth: {
      type: Number,
      default: 80
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWrap: {
      type: Boolean,
      default: true
    },
    contentWrap: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      content: '',
      preSpan: 1
    }
  },
  created () {
    this.preSpan = this.colNum
    this.content = this.$slots.default[0].text
  },
  computed: {
    getLabelWidth: function () {
      return {
        width: this.labelWidth + 'px',
        'text-align': this.labelPosition
      }
    },
    getContentWidth: function () {
      return {
        width: `calc(100% - ${this.labelWidth}px)`
      }
    },
    getCols: function () {
      return {span: this.span * 12 / this.colNum, type: 'inline-flex'}
    },
    getContentClass: function () {
      return {
        wrap: this.contentWrap,
        ellipsis: !this.contentWrap
      }
    },
    getLabelClass: function () {
      return {
        wrap: this.labelWrap,
        ellipsis: !this.labelWrap
      }
    }
  }
}
</script>

<style scoped lang="less">
.description-item {
  float: left;
  margin-bottom: 8px;
  align-items: center;
  .description-item-label {
    // display: inline-flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    position: relative;
    &:after {
      content: ":";
    }
    &.wrap {
      word-break: break-all;
    }
    &.ellipsis {
      display: inline-block;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      &:after {
        position: absolute;
        right: 0;
      }
    }
  }
  .description-item-content {
    vertical-align: center;
    font-size: 14px;
    color: #666;
    box-sizing: border-box;
    padding-left: 12px;
    padding-right: 10px;
    &.wrap {
      word-break: break-all;
    }
    &.ellipsis {
      overflow:hidden;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
    }
  }
}
</style>
