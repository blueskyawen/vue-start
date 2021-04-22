<template>
  <div>
    <h5>WangEditorDemo富文本</h5>
    <div class="WangEditorDemo" id="demo1"></div>
  </div>
</template>

<script>
import wangEditor from "wangeditor";
import hljs from 'highlight.js'

export default {
  name: "WangEditorDemo",
  data() {
    return {
      editor: null,
      editorData: "",
    };
  },
  mounted() {
    const editor = new wangEditor(`#demo1`);
    editor.config.showMenuTooltips = false
    editor.config.height = 400;
    editor.config.placeholder = "请输入内容...";
    editor.config.focus = true;
    editor.highlight = hljs
    // 默认情况下，显示所有菜单
    editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "link",
      "list",
      "todo",
      "justify",
      "quote",
      "emoticon",
      "image",
      "video",
      "table",
      "code",
      "splitLine",
      "undo",
      "redo",
    ];
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml;
    };

    // 创建编辑器
    editor.create();

    this.editor = editor;
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
  methods: {
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html();
      alert(data);
    },
  },
};
</script>

<style lang="less" scoped>
.WangEditorDemo {
  width: 100%;
  height: 500px;
}
</style>
