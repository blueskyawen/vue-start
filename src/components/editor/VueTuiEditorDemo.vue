<template>
  <div>
    <tui-editor
      v-show="!showViewer"
      ref="toastuiEditor"
      :initialValue="value"
      :options="defaultOptions"
      height="500px"
      initialEditType="markdown"
      previewStyle="tab"
      @load="onEditorLoad"
      @focus="onEditorFocus"
      @blur="onEditorBlur"
      @change="onEditorChange"
      @stateChange="onEditorStateChange"
    ></tui-editor>
    <tui-viewer
      v-if="showViewer"
      :initialValue="content"
      height="500px"
      @load="onEditorLoad"
      @focus="onEditorFocus"
      @blur="onEditorBlur"
      @change="onEditorChange"
      @stateChange="onEditorStateChange"
    ></tui-viewer>
    <vc-button @click="saveDoc">{{ showViewer ? "编辑" : "保存" }}</vc-button>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor, Viewer } from '@toast-ui/vue-editor';
import VcButton from '../vc-cat/vc-button.vue';
export default {
  name: 'VueTuiEditorDemo',
  data() {
    // const { chart, codeSyntaxHighlight, colorSyntax, tableMergedCell, uml } = Editor.plugin;
    return {
      value: '',
      defaultOptions: {
        minHeight: '500px',
        language: 'zh-CN',
        useCommandShortcut: false,
        useDefaultHTMLSanitizer: true,
        usageStatistics: true,
        hideModeSwitch: false,
        toolbarItems: [
          'heading',
          'bold',
          'italic',
          'strike',
          'divider',
          'hr',
          'quote',
          'divider',
          'ul',
          'ol',
          'task',
          'indent',
          'outdent',
          'divider',
          'table',
          'image',
          'link',
          'divider',
          'code',
          'codeblock',
        ],
        placeholder: '请输入内容.',
        // plugins: [[chart, chartOptions], codeSyntaxHighlight, colorSyntax, tableMergedCell, uml]
      },
      showViewer: false,
      content: ''
    };
  },
  mounted () {},
  methods: {
    scroll () {
      this.$refs.toastuiEditor.invoke('scrollTop', 10)
    },
    moveTop () {
      this.$refs.toastuiEditor.invoke('moveCursorToStart')
    },
    getHtml () {
      let html = this.$refs.toastuiEditor.invoke('getHtml')
    },
    onEditorLoad () {
      // implement your code
    },
    onEditorFocus () {
      // implement your code
    },
    onEditorBlur () {
      // implement your code
    },
    onEditorChange () {
      // implement your code
    },
    onEditorStateChange () {
      // implement your code
    },
    saveDoc () {
      this.content = this.$refs.toastuiEditor.invoke('getHtml')
      console.log(this.content)
      setTimeout(() => {
        this.showViewer = !this.showViewer
      }, 100)
    }
  },
  components: {
    'tui-editor': Editor,
    'tui-viewer': Viewer,
    VcButton,
  },
}
</script>

<style scoped>
.VueTuiEditorDemo {
  width: 100%;
  height: 500px;
}
</style>
