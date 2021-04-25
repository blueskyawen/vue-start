<template>
  <div class="mavonEditor">
    <h5>mavonEditor-MarkDown</h5>
    <!--:ishljs为高亮-->
    <!--:v-model获取到编辑的 Markdown代码，需要用marked解析成html-->
    <!--change为更改事件，一更改触发-->
    <!--imgAdd为添加图片调用的函数-->
    <!--imgDel为删除图片调用的函数-->
    <mavon-editor
      ref="md"
      style="height: 100%"
      :ishljs="true"
      :boxShadow="false"
      :previewBackground="'#fff'"
      v-model="value"
      @change="chang"
      @imgAdd="imgAdd"
      @imgDel="imgDel"
    ></mavon-editor>
    <vc-button @click="uploadImg">统一上传图片</vc-button>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import marked from "marked";
export default {
  name: "mavonEditorDemo",
  data() {
    return {
      value: '',
      markedValue: '', // html,
      imgList: [],
      img_file: {}
    }
  },
  components: {
    mavonEditor,
  },
  methods: {
     chang: function (val,render) {
      //解析成html
      // console.log('****解析成html***');
      // console.log(val);
      // console.log(render);
      // console.log('****************');
      this.markedValue=marked(this.value)
       // console.log(this.value);
      // console.log(this.markedValue);
    },
        // 绑定@imgAdd event
    imgAdd(pos, file) {
      // 缓存图片信息（当前还是本地图片状态）
      this.imgList[pos] = file;
      // // console.log(pos)
      // console.log("添加图片：" + this.imgList[pos]);
      // 将图片上传到服务器.
/*       var formdata = new FormData();
      formdata.append('image', $file);
      this.$http({
          url: '/api/edit/uploadimg',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
      }).then((res) => {
          let _res = res.data;
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          this.$refs.md.$img2Url(pos, _res.url);
      }) */
    },
    imgDel(pos) {
      delete this.imgList[pos];
      // console.log("删除图片：" + this.imgList[pos]);
    },
    uploadImg() {
      // 第一步.将图片上传到服务器（一次性上传）.
      for (var i in this.imgList) {
        // console.log("上传图片" + this.imgList[i]);
        //接口提供了一种表示表单数据的键值对的构造方式，经过它的数据可以使用
        //multipart/form-data
        var formdata = new FormData();
        formdata.append("file", this.imgList[i]);

        this.$axios({
          url: "上传图片的后台地址",
          method: "post",
          data: formdata,
          headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
          // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          // console.log(res);
           //pos为在编辑框中对应的位置0。。。，第二个为上传后的url
            this.$refs.md.$img2Url(pos,url)
        });
      }
    }
  },
}

/* //导入对应样式表
import 'mavon-editor/dist/css/index.css';
//要显示的div设置类
<div  class="markdown-body"   v-html="markdown_code"/>
//这里的newDate[0].content就是取出来的md格式的文本内容
this.markdown_code=marked(newData[0].content||‘‘,{
   sanitize:true
})
*/
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 500px;
}
</style>
