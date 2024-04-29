<template>
  <vc-drawer
    class="add-darily-drawer"
    v-model="visiable"
    :place="'right'"
    :header="titleLabel"
    :clickShadeClose="false"
  >
    <div class="add-darily-content">
      <el-form :model="form">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="今日" :label-width="formLabelWidth">
          <wang-editor-demo
            v-if="visiable"
            editorId="todayEditor"
            :height="240"
            :contentValue.sync="form.today"
          ></wang-editor-demo>
        </el-form-item>
        <el-form-item label="明日" :label-width="formLabelWidth">
          <wang-editor-demo
            v-if="visiable"
            editorId="tomorrowEditor"
            :height="240"
            :contentValue.sync="form.tomorrow"
          ></wang-editor-demo>
        </el-form-item>
      </el-form>
      <div class="add-darily-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="okForm" :loading="loading">{{
          loading ? "提交中 ..." : "确 定"
        }}</el-button>
      </div>
    </div>
  </vc-drawer>
</template>

<script>
import { get } from "http";
import WangEditorDemo from "../MarkdownEditor/WangEditorDemo.vue";
export default {
  name: "addDairly",
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    showModal: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "add"
    }
  },
  components: {
    WangEditorDemo
  },
  data() {
    return {
      titleLabel: "新增",
      formLabelWidth: "80px",
      form: {
        date: null,
        today: "",
        tomorrow: ""
      },
      loading: false
    };
  },
  created() {
    this.initForm();
  },
  computed: {
    visiable: {
      get() {
        return this.showModal;
      },
      set(v) {
        this.$emit("update:showModal", v);
      }
    }
  },
  methods: {
    initForm() {
      if (this.type === "add") {
        this.titleLabel = "新增";
        this.form.date = new Date();
      } else {
        console.log("%%55555");
        this.titleLabel = "编辑";
        this.form.date = this.row.date;
        this.form.today = this.row.today;
        this.form.tomorrow = this.row.tomorrow;
      }
    },
    handleClose() {},
    cancelForm() {
      this.$emit("update:showModal", false);
    },
    okForm() {
      let lineId = this.form.date.valueOf();
      let name = this.form.date
        .toLocaleString()
        .split(" ")[0]
        .split("/")
        .join("-");
      this.$emit("add-dairly", {
        ...this.form,
        id: this.type == "add" ? lineId : this.row.id,
        name: name
      });
    }
  },
  watch: {
    visiable: function(v) {
      if (v) {
        console.log("%%%%%%%%");
        this.initForm();
      }
    }
  }
};
</script>

<style scoped>
.add-darily-drawer /deep/ .drawer-content {
  width: 60%;
}
.add-darily-content {
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 50px;
}
.add-darily-content .add-darily-footer {
  position: absolute;
  bottom: 0;
  right: 50px;
}
</style>
