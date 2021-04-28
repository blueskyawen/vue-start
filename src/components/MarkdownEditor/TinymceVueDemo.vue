<template>
  <div>
    <editor
      ref="tyEditor"
      :init="editConfig_2"
      v-model="content"
      @onSaveContent="handleSave"
    ></editor>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import "./import_tinymce_plugins";
import axios from "axios";
export default {
  name: "TinymceVueDemo",
  data() {
    var useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const BASE_URL = process.env.NODE_ENV === 'production' ? '/vue-start/' : '/';
    return {
      content: "",
      editConfig: {
        height: 1000, //富文本高度
        max_height: 1000,
        // max_width: 500,
        min_height: 1000,
        toolbar_sticky: true,
        // min_width: 400
        // language_url: '/tinymce/zh_CN.js', //中文包
        language: "zh_CN", //中文
        browser_spellcheck: true, // 拼写检查
        contextmenu: false,
        branding: true, // 去水印
        elementpath: true, //禁用编辑器底部的状态栏
        // statusbar: true, // 隐藏编辑器底部的状态栏
        paste_data_images: true, // 是否允许粘贴图像
        fontsize_formats: "14px 16px 18px 20px 24px 26px 28px 30px 32px 36px", //字体大小
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times", //字体
        file_picker_types: "image",
        images_upload_credentials: true,
        /* plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ], */
        skin: "oxide", // oxide-dark oxide
        content_css: "document", //default dark document writer
        menu: {
          happy: { title: "Happy", items: "newdocument preview" }, // 自定义菜单
        },
        menubar: "file edit view insert format tools table help happy",
        // menubar: true, // 隐藏最上方menu
        /*         toolbar: [ // 分组
          {
            name: 'history',
            items: ['undo', 'redo'],
          },
          {
            name: 'styles',
            items: ['styleselect'],
          },
          {
            name: 'formatting',
            items: ['bold', 'italic'],
          },
          {
            name: 'alignment',
            items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify'],
          },
          {
            name: 'indentation',
            items: ['outdent', 'indent'],
          },
        ], */
        plugins: "code advlist lists link image table media",
        advlist_bullet_styles: "square disc",
        advlist_number_styles:
          "lower-alpha,lower-roman,upper-alpha,upper-roman",
        /* toolbar:
          'fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | ' +
          'alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist ' +
          'preview fullscreen | styleselect outdent indent | undo redo', */
        toolbar:
          "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | link image | print preview media fullpage | " +
          "forecolor backcolor emoticons | code table help ",
        /* toolbar: [
          {
            name: 'history', items: [ 'undo', 'redo' ]
          },
          {
            name: 'styles', items: [ 'styleselect' ]
          },
          {
            name: 'formatting', items: [ 'bold', 'italic']
          },
          {
            name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ]
          },
          {
            name: 'indentation', items: [ 'outdent', 'indent' ]
          }
        ], */
        toolbar_groups: {
          bold: {
            icon: "bold",
            tooltip: "bold",
            items: "italic underline | superscript subscript",
          },
        },
        skin_url: BASE_URL + "static/tinymce/skins/ui/oxide",
        // menubar: false, // 英寸菜单栏
        // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
        images_upload_handler: tiny_image_upload_handler,
        //
      },
      editConfig_2: {
        language_url: BASE_URL + "static/tinymce/langs/zh_CN.js", //引入语言包文件
        language: "zh_CN", //中文
        skin_url: BASE_URL + "static/tinymce/skins/ui/oxide",
        // 开头几个插件时收费的
        // checklist autoresize
        plugins: // quickbars
          "fullpage print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons",
        imagetools_cors_hosts: ["picsum.photos"],
        menubar: "file edit view insert format tools table help",
        toolbar:
          "checklist | hr fullpage restoredraft undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | table insertfile image media template link anchor codesample | ltr rtl",
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: "30s",
        autosave_prefix: "{path}{query}-{id}-",
        autosave_restore_when_empty: false,
        autosave_retention: "2m",
        link_list: [
          { title: "My page 1", value: "https://www.tiny.cloud" },
          { title: "My page 2", value: "http://www.moxiecode.com" },
        ],
        image_list: [
          { title: "My page 1", value: "https://www.tiny.cloud" },
          { title: "My page 2", value: "http://www.moxiecode.com" },
        ],
        image_class_list: [
          { title: "None", value: "" },
          { title: "Some class", value: "class-name" },
        ],
        image_advtab: true,
        importcss_append: true,
        file_picker_callback: function (callback, value, meta) {
          /* Provide file and text for the link dialog */
          if (meta.filetype === "file") {
            callback("https://www.google.com/logos/google.jpg", {
              text: "My text",
            });
          }

          /* Provide image and alt text for the image dialog */
          if (meta.filetype === "image") {
            callback("https://www.google.com/logos/google.jpg", {
              alt: "My alt text",
            });
          }

          /* Provide alternative source and posted for the media dialog */
          if (meta.filetype === "media") {
            callback("movie.mp4", {
              source2: "alt.ogg",
              poster: "https://www.google.com/logos/google.jpg",
            });
          }
        },
        templates: [
          {
            title: "New Table",
            description: "creates a new table",
            content:
              '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
          },
          {
            title: "Starting my story",
            description: "A cure for writers block",
            content: "Once upon a time...",
          },
          {
            title: "New list with dates",
            description: "New List with dates",
            content:
              '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
          },
        ],
        template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
        template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
        height: 800,
        min_height: 800,
        max_height: 800,
        image_caption: true,
        quickbars_selection_toolbar:
          "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: "wrap",
        contextmenu: "link image imagetools table",
        // skin: useDarkMode ? "oxide-dark" : "oxide",
        // content_css: useDarkMode ? "dark" : "document",
        content_css: BASE_URL + "static/tinymce/skins/content/document/content.css",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        /* enable title field in the Image dialog*/
        // 实现图片弹出框的右边点击本地文件选择的功能
        image_title: true,
        /* enable automatic uploads of images represented by blob or data URIs*/
        automatic_uploads: true,
        file_picker_types: "image",
        /* and here's our custom image picker*/
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          /*
      Note: In modern browsers input[type="file"] is functional without
      even adding it to the DOM, but that might not be the case in some older
      or quirky browsers like IE, so you might want to add it to the DOM
      just in case, and visually hide it. And do not forget do remove it
      once you do not need it anymore.
    */

          input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
              /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
              var id = "blobid" + new Date().getTime();
              var blobCache = tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(",")[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              /* call the callback and populate the Title field with the file name */
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
        // 实现图片弹出框的拖动或浏览上传功能
        images_upload_handler: tiny_image_upload_handler,
        readonly: false,
        elementpath: false,
        resize: true,
        file_picker_types: "file image media",
        default_link_target: "_blank",
        autoresize_bottom_margin: 50,
        autoresize_overflow_padding: 50,
        custom_undo_redo_levels: 50,
        object_resizing: true,
      },
    };
  },
  components: {
    editor: Editor,
  },
  methods: {
    handleSave() {
      console.log("handleSave");
      console.log(this.editor);
    },
  },
  mounted() {
    tinymce.init({});
  },
};
// 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
function tiny_image_upload_handler(blobInfo, success, failure, progress) {
  let formdata = new FormData();
  formdata.append("file", blobInfo.blob(), blobInfo.filename());
  // 上传图片接口，跟后端同事协调上传图片
  // http://hh.xxxx.cn/admin/upload为上传图片接口
  axios
    .post("http://hh.xxxx.cn/admin/upload", formdata)
    .then(function (res) {
      success(res.data.data.src);
      // success(json.location)
    })
    .catch((res) => {
      failure("error");
    });
}
</script>

<style lang="less" scoped>
</style>
