<template>
  <div class="CKEditor5">
    <ckeditor
      style="border: solid 1px #f2f2f2"
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      @ready="onReady"
    ></ckeditor>
  </div>
</template>

<script>
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
export default {
  name: "CKEditor5Doc",
  data() {
    return {
      editor: DecoupledEditor,
      editorData: "",
      editorConfig: {
        language: "zh-cn",
        title: {
          placeholder: "请输入标题",
        },
        placeholder: "正文内容...",
        toolbar: {
          items: [
            'textPartLanguage',
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "horizontalLine",
            "removeFormat",
            "highlight",
            "|",
            "alignment",
            "numberedList",
            "bulletedList",
            'todoList',
            "outdent",
            "indent",
            "|",
            "link",
            "blockQuote",
            "imageTextAlternative",
            "uploadImage",
            "imageInsert",
            "mediaEmbed",
            "insertTable",
            "code",
            "codeBlock",
            "htmlEmbed",
            "|",
            'subscript',
            'superscript',
            "MathType",
            'ChemType',
            'specialCharacters',
            "|",
            "pageBreak",
            "selectAll",
            "CKFinder",
            "undo",
            "redo",
          ],
          shouldNotGroupWhenFull: true,
        },
        image: {
          toolbar: [
            "imageTextAlternative",
            "imageStyle:full",
            "imageStyle:side",
            "linkImage",
          ],
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableCellProperties",
            "tableProperties",
          ],
        },
      },
      editorInstance: null
    };
  },
  components: {},
  methods: {
    onReady(editor) {
      // Insert the toolbar before the editable area.
       editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
       this.editorInstance = editor;
    },
  },
  beforeDestroy() {
    if (this.editorInstance) {
      console.log("destroy editor");
      this.editorInstance
        .destroy()
        .then((res) => {
          console.log("destroy editor **** success");
          this.editorInstance = null;
        })
        .catch((error) => {
          console.log("destroy editor **** fail");
          console.error(error);
        });
    }
  },
};
</script>

<style>
.CKEditor5 {
  width: 100%;
  height: 500px;
}
.ck-editor__editable_inline {
  height: 500px !important;
}
ul {
  padding: auto !important;
}
</style>
