<template>
  <div class="prise-editor">
    <div class="prise-cfg">
      <vc-button @click="addOneline">新增一行产品</vc-button>
    </div>
    <div class="prise-list">
      <div class="col-head">
        <span class="col-head-item" v-for="col in columns" :key="col.key">
          {{ col.label }}</span
        >
      </div>
      <div class="col-body" v-if="list.length">
        <div class="col-line" v-for="(item, index) in list" :key="index">
          <span class="col-item" v-for="col2 in columns" :key="col2.key">
            <vc-button
              v-if="col2.key == 'oper'"
              size="custom"
              height="24px"
              style="margin-top: 6px;"
              @click="delOneline(index)"
              >删除</vc-button
            >
            <vc-input
              v-else
              v-model="item[col2.key]"
              @change="inputChange(item, col2.key)"
              required
            ></vc-input>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "not-found",
  data() {
    return {
      columns: [
        {
          label: "名称",
          key: "name"
        },
        {
          label: "拿货价",
          key: "oldPrice"
        },
        {
          label: "标价倍数",
          key: "saleB"
        },
        {
          label: "标价",
          key: "newPrice"
        },
        {
          label: "折扣",
          key: "zhekou"
        },
        {
          label: "优惠券",
          key: "youhuiquan"
        },
        {
          label: "平台扣点",
          key: "pingtaikoudian"
        },
        {
          label: "实际售价",
          key: "shijiprice"
        },
        {
          label: "利润",
          key: "lirun"
        },
        {
          label: "利润率",
          key: "lirunlv"
        },
        {
          label: "操作",
          key: "oper"
        }
      ],
      list: []
    };
  },
  methods: {
    delOneline: function(index) {
      this.list.splice(index, 1);
    },
    addOneline: function() {
      this.list.push({
        name: "",
        oldPrice: 0,
        saleB: 1,
        newPrice: 0,
        zhekou: 0.8,
        youhuiquan: 3,
        pingtaikoudian: 0.05,
        shijiprice: 0,
        lirun: 0,
        lirunlv: "0%",
        oper: ""
      });
    },
    inputChange: function(line, key) {
      let value = +line[key];
      if (key !== "name") {
        line.newPrice = (+line.oldPrice * +line.saleB).toFixed(2);
        line.shijiprice = (
          +line.newPrice * +line.zhekou -
          line.youhuiquan
        ).toFixed(2);
        line.lirun = (
          +line.shijiprice -
          +line.oldPrice -
          +line.shijiprice * +line.pingtaikoudian
        ).toFixed(2);
        line.lirunlv =
          ((+line.lirun * 100) / +line.shijiprice).toFixed(2) + "%";
      }
    }
  }
};
</script>

<style scoped>
.prise-editor {
  position: fixed;
  height: calc(100% - 120px);
  width: calc(100% - 60px);
}
.prise-editor .prise-cfg {
  width: 100%;
  display: flex;
  margin-bottom: 8px;
}
.prise-editor .prise-list {
  border: solid 1px #999;
  overflow: auto;
  max-height: calc(100% - 38px);
}
.prise-editor .prise-list .col-head {
  display: flex;
  border-bottom: solid 1px #999;
}
.prise-editor .prise-list .col-head > .col-head-item {
  display: inline-block;
  height: 30px;
  font-weight: bold;
  width: 8%;
  border-left: 1px solid #666;
  line-height: 30px;
}
.prise-editor .prise-list .col-head > .col-head-item:first-of-type {
  width: 20%;
}
.col-item {
  display: inline-block;
  width: 8%;
  border-left: 1px solid #666;
}
.prise-editor .prise-list .col-body .col-line {
  display: flex;
  border-bottom: solid 1px #999;
}
.prise-editor .prise-list .col-body .col-line > .col-item:first-of-type {
  width: 20%;
}
.col-item /deep/ .vc-inputs-item .vc-form-group-item input {
  border: none;
}
.col-item /deep/ .vc-inputs-item .vc-form-group-item {
  min-width: auto;
}
</style>
