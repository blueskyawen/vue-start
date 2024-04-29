<template>
  <div class="WangEditorDemo" :id="editorId"></div>
  <!--   <div>
    <div class="WangEditorDemo" :id="editorId"></div>
    <div
      class="WangEditorDemo"
      id="todayEditor"
      v-if="editorId === 'todayEditor'"
    ></div>
    <div
      class="WangEditorDemo"
      id="tomorrowEditor"
      v-if="editorId === 'tomorrowEditor'"
    ></div>
  </div> -->
</template>

<script>
import wangEditor from "wangeditor";
import hljs from "highlight.js";

export default {
  name: "WangEditorDemo",
  props: {
    height: {
      type: Number | String
    },
    contentValue: String,
    editorId: {
      type: String,
      default: "demo1"
    }
  },
  data() {
    return {
      editor: null,
      editorData: ""
    };
  },
  mounted() {
    const editor = new wangEditor("#" + this.editorId);
    editor.config.showMenuTooltips = false;
    editor.config.height = this.height || 400;
    editor.config.placeholder = "请输入内容...";
    editor.config.focus = true;
    editor.highlight = hljs;
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
      "redo"
    ];
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = newHtml => {
      this.editorData = newHtml;
      this.$emit("update:contentValue", this.editorData);
    };

    // 创建编辑器
    editor.create();
    this.editor = editor;
    if (this.contentValue) {
      this.editor.txt.html(this.contentValue);
    }
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
      return data;
    }
  }
};
</script>

<style lang="less" scoped>
.WangEditorDemo {
  width: 100%;
}
</style>
