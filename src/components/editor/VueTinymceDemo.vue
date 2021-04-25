<template>
  <div>
    <h5>VueTinymce富文本</h5>
    <vue-tinymce v-model="content" :setup="setup" :setting="setting" />
  </div>
</template>

<script>
export default {
  name: 'VueTinymceDemo',
  data () {
    return {
      content: '<p>html content</p>',
      setting: {
        height: 500
      }
    }
  },
  methods: {
    setup (editor) {
      // console.log(editor);
    }
  }
}
</script>

<style lang="less" scoped>
</style>
