<template>
  <div class="CKEditor5">
<!--     <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor> -->
  </div>
</template>

<script>
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  name: "CKEditor5Classical",
  data() {
    return {
      // editor: ClassicEditor,
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
