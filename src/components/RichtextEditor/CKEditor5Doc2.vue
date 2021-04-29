<template>
  <div class="document-editor">
    <div class="document-editor__toolbar"></div>
    <div class="document-editor__editable-container">
      <div class="document-editor__editable"></div>
    </div>
  </div>
</template>

<script>
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
export default {
  name: "CKEditor5Doc2",
  data() {
    return {
      editor: null,
      editorData: "",
      editorConfig: {
        language: "zh-cn",
        placeholder: "请输入内容...",
      },
    };
  },
  components: {},
  mounted() {
    this.initCKEditor();
  },
  methods: {
    initCKEditor() {
      DecoupledEditor.create(
        document.querySelector(".document-editor__editable"),
        {
          language: "zh-cn",
          title: {
            placeholder: "请输入标题",
          },
          placeholder: "正文内容...",
          toolbar: {
            items: [
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
              // 'textPartLanguage',
              "|",
              "pageBreak",
              "selectAll",
              "CKFinder",
              "undo",
              "redo",
            ],
            shouldNotGroupWhenFull: false,
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
        }
      )
        .then((editor) => {
          const toolbarContainer = document.querySelector(
            ".document-editor__toolbar"
          );
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
          this.editor = editor; //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
          //使用图片上传适配器
          editor.plugins.get("FileRepository").createUploadAdapter = (
            loader
          ) => {
            return new UploadImageAdapter(loader);
          };
          editor.model.document.on("change:data", () => {
            //把富文本编辑器获取到的内容传出去
            this.$emit("input", editor.getData());
          });
          //编辑的时候设置富文本编辑器的内容
          // editor.setData(this.value);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  beforeDestroy() {
    if (this.editor) {
      console.log("destroy editor");
      this.editor
        .destroy()
        .then((res) => {
          console.log("destroy editor **** success");
          this.editor = null;
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
</style>
