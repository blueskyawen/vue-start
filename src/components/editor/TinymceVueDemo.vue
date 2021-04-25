<template>
  <div>
    <editor
      api-key="0du12wancmdh8u2beh8jknd708tymkahaz0qe73g9xlv2v1r"
      :init="editConfig"
      v-model="content"
    ></editor>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "TinymceVueDemo",
  data() {
    return {
      content: "",
      editConfig: {
        height: 700, //富文本高度
        max_height: 700,
        // max_width: 500,
        min_height: 700,
        // min_width: 400
        // language_url: "/tinymce/zh_CN.js", //中文包
        language: "zh_CN", //中文
        browser_spellcheck: true, // 拼写检查
        branding: false, // 去水印
        elementpath: true, //禁用编辑器底部的状态栏
        statusbar: true, // 隐藏编辑器底部的状态栏
        paste_data_images: true, // 是否允许粘贴图像
        fontsize_formats: "14px 16px 18px 20px 24px 26px 28px 30px 32px 36px", //字体大小
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue;PingFang SC;sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun;serifsans-serif;Terminal=terminal;monaco;Times New Roman=times new roman;times", //字体
        file_picker_types: "image",
        images_upload_credentials: true,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        skin: "oxide", // oxide-dark oxide
        content_css: "document", //default dark document writer
        menu: {
          happy: { title: "Happy", items: "newdocument preview" }, // 自定义菜单
        },
        menubar: "file edit view insert format tools table help happy",
        // menubar: true, // 隐藏最上方menu
        /*         toolbar: [ // 分组
          {
            name: "history",
            items: ["undo", "redo"],
          },
          {
            name: "styles",
            items: ["styleselect"],
          },
          {
            name: "formatting",
            items: ["bold", "italic"],
          },
          {
            name: "alignment",
            items: ["alignleft", "aligncenter", "alignright", "alignjustify"],
          },
          {
            name: "indentation",
            items: ["outdent", "indent"],
          },
        ], */
        plugins: "code advlist lists link image table media",
        advlist_bullet_styles: "square disc",
        advlist_number_styles:
          "lower-alpha,lower-roman,upper-alpha,upper-roman",
        toolbar:
          "fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote table numlist bullist preview fullscreen | styleselect outdent indent | undo redo",
        toolbar:
          "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | link image | print preview media fullpage | " +
          "forecolor backcolor emoticons | code table help ",
        // menubar: false, // 英寸菜单栏
        // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
        images_upload_handler: function (blobInfo, success, failure) {
          let formdata = new FormData();
          formdata.append("file", blobInfo.blob());
          // 上传图片接口，跟后端同事协调上传图片
          // http://hh.xxxx.cn/admin/upload为上传图片接口
          axios
            .post("http://hh.xxxx.cn/admin/upload", formdata)
            .then(function (res) {
              success(res.data.data.src);
            })
            .catch((res) => {
              failure("error");
            });
        },
      },
    };
  },
  components: {
    editor: Editor,
  },
};
</script>

<style lang="less" scoped>
</style>
