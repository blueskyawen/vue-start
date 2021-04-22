<template>
  <div>
    <tui-editor
      :initialValue="value"
      :options="defaultOptions"
      height="500px"
      initialEditType="markdown"
      previewStyle="vertical"
    ></tui-editor>
  </div>
</template>

<script>
import { Editor } from "@toast-ui/vue-editor";
export default {
  name: "VueTuiEditorDemo",
  data() {
    return {
      value: "",
      defaultOptions: {
        minHeight: "500px",
        language: "zh-CN",
        useCommandShortcut: false,
        useDefaultHTMLSanitizer: true,
        usageStatistics: true,
        hideModeSwitch: false,
        toolbarItems: [
          "heading",
          "bold",
          "italic",
          "strike",
          "divider",
          "hr",
          "quote",
          "divider",
          "ul",
          "ol",
          "task",
          "indent",
          "outdent",
          "divider",
          "table",
          "image",
          "link",
          "divider",
          "code",
          "codeblock",
        ],
      },
    };
  },
  mounted() {},
  methods: {
    name() {},
  },
  components: {
    "tui-editor": Editor,
  },
};
</script>

<style scoped>
.VueTuiEditorDemo {
  width: 100%;
  height: 500px;
}
</style>
