<template>
  <div class="CKEditor5">
    <h2>CKEditor5经典模式</h2>
<!--     <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig1"
    ></ckeditor> -->
  </div>
</template>

<script>
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";
export default {
  name: "CKEditor5Classical",
  data() {
    return {
      // editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        language: "zh-cn",
        toolbar: {
          items: [
            "textPartLanguage",
            "heading",
            "|",
            "bold",
            "italic",
            "fontBackgroundColor",
            "fontColor",
            "fontSize",
            "fontFamily",
            "highlight",
            "horizontalLine",
            "bulletedList",
            "numberedList",
            "|",
            "alignment",
            "outdent",
            "indent",
            "|",
            "link",
            "imageUpload",
            "imageInsert",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "htmlEmbed",
            "code",
            "codeBlock",
            "|",
            "MathType",
            "ChemType",
            "removeFormat",
            "specialCharacters",
            "strikethrough",
            "subscript",
            "superscript",
            "underline",
            "CKFinder",
            "undo",
            "redo",
          ],
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
    };
  },
  components: {},
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
  padding: auto;
}
</style>
