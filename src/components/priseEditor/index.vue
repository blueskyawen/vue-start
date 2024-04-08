<template>
  <div class="prise-editor">
    <div class="prise-cfg">
      <vc-button type="add" @click="addOneline">新增一行产品</vc-button>
      <vc-button @click="saveList" style="margin-left: 10px">保存</vc-button>
      <vc-button type="cancel" @click="goClear" style="margin-left: 10px"
        >清空</vc-button
      >
      <vc-button type="cancel" @click="refresh" style="margin-left: 10px"
        >刷新</vc-button
      >
      <div class="product-s">
        <span
          v-for="pitem in products"
          :key="pitem.id"
          :class="{ active: pitem.id == curProducts }"
          @click.stop="changeTable(pitem.id)"
          >{{ pitem.label }}</span
        >
      </div>
      <div class="multi-oper">
        <span>批量操作</span>
        <vc-select
          style="width: 100px;height: 28px;margin-left: 8px;"
          :options="multiActionOptions"
          v-model="mutilOperCol"
        ></vc-select>
        <vc-input class="mul-value" v-model="multiValue" required></vc-input>
        <vc-button
          style="margin-left: 8px;height: 28px"
          :type="'cancel'"
          @click="doMutilOper"
          >设置</vc-button
        >
      </div>
      <span class="prodNum">产品数: {{ list ? list.length : 0 }}</span>
    </div>
    <div class="prise-list">
      <div class="col-head">
        <span class="col-head-item" v-for="col in columns" :key="col.key">
          {{ col.label }}</span
        >
      </div>
      <div class="col-body" v-if="list.length">
        <div class="col-line" v-for="item in list" :key="item.id">
          <span class="col-item" v-for="col2 in columns" :key="col2.key">
            <vc-button
              v-if="col2.key == 'oper'"
              size="custom"
              height="24px"
              style="margin-top: 6px;"
              @click="delOneline(item)"
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
    <vc-info :type="'success'" v-model="msgShow">{{ message }}</vc-info>
    <vc-info :type="'warn'" v-model="warnShow"
      >数据正在处理中,请稍后尝试!</vc-info
    >
    <vc-dialog
      :header="'操作确认'"
      :type="'normal'"
      v-model="modalShow"
      class="clear-product-conf"
    >
      <template v-slot:content>
        确认要删除全部产品数据吗?
      </template>
      <template v-slot:footer>
        <span class="form-btn-group">
          <vc-button @click="clear" type="major">确定</vc-button>
        </span>
        <span class="form-btn-group">
          <vc-button :type="'cancel'" @click="modalShow = false"
            >取消</vc-button
          >
        </span>
      </template>
    </vc-dialog>
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
          label: "运费",
          key: "yunfei"
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
      products: [
        {
          id: "fuli",
          label: "福利款"
        },
        {
          id: "jichu",
          label: "基础活动款"
        },
        {
          id: "lirun",
          label: "利润款"
        },
        {
          id: "xingxiang",
          label: "形象款"
        }
      ],
      curProducts: "fuli",
      curTableName: "fuli_product",
      list: [],
      msgShow: false,
      message: "操作成功",
      isOpering: false,
      warnShow: false,
      modalShow: false,
      multiActionOptions: [
        { label: "运费", value: "yunfei", disable: false },
        { label: "标价倍数", value: "saleB", disable: false },
        { label: "折扣", value: "zhekou", disable: false },
        {
          label: "优惠券",
          value: "youhuiquan",
          disable: false
        }
      ],
      mutilOperCol: "",
      multiValue: ""
    };
  },
  created() {
    setTimeout(() => {
      this.getTableList();
    }, 1000);
  },
  methods: {
    doMutilOper() {
      if (
        !this.list ||
        !this.list.length ||
        !this.multiValue ||
        !this.mutilOperCol
      ) {
        this.multiValue = "";
        return;
      }
      if (isNaN(this.multiValue)) {
        return;
      }
      if (this.columns.find(x => x.key == this.mutilOperCol)) {
        for (let item of this.list) {
          item[this.mutilOperCol] = this.multiValue;
          this.inputChange(item, this.mutilOperCol);
        }
      }
    },
    showWarnMsg() {
      this.warnShow = true;
      setTimeout(() => {
        this.warnShow = false;
      }, 1000);
    },
    showActionMsg(text) {
      if (text) {
        this.message = text || "操作成功";
        this.msgShow = true;
      } else {
        this.message = "操作成功";
      }
    },
    refresh() {
      if (this.isOpering) {
        this.showWarnMsg();
        return;
      }
      this.isOpering = true;
      this.getTableList("refresh");
    },
    getTableList(type) {
      if (this.$IDB) {
        this.$IDB
          .query({
            tableName: this.curTableName
          })
          .then(res => {
            this.list = res.data || [];
            if (type) {
              this.showActionMsg("重新获取表数据成功!");
              this.isOpering = false;
            }
          });
      }
    },
    changeTable(id) {
      this.curProducts = id;
      this.curTableName = this.curProducts + "_product";
      this.list = [];
      this.getTableList();
    },
    delOneline: function(lineitem) {
      if (!this.list || !this.list.length) return;
      let delIndex = this.list.findIndex(x => x.id == lineitem.id);
      if (delIndex > -1) {
        this.list.splice(delIndex, 1);
      }
      if (this.$IDB) {
        this.$IDB
          .delete({
            tableName: this.curTableName,
            condition: (item, index) => item.id === lineitem.id
          })
          .then(res => {
            console.log("删除的数据：", res);
          });
      }
    },
    addOneline: function() {
      let newLine = {
        id: new Date().valueOf(),
        name: "",
        oldPrice: 0,
        saleB: 1,
        yunfei: 0,
        newPrice: 0,
        zhekou: 0.9,
        youhuiquan: 3,
        pingtaikoudian: 0.05,
        shijiprice: 0,
        lirun: 0,
        lirunlv: "0%",
        oper: ""
      };
      this.list.push(newLine);
      if (this.$IDB) {
        this.$IDB
          .add({
            tableName: this.curTableName,
            data: { ...newLine }
          })
          .then(res => {
            console.log("数据添加成功");
          });
      }
    },
    inputChange: function(line, key) {
      let value = +line[key];
      if (isNaN(value)) {
        return;
      }
      if (key !== "name") {
        if (["newPrice", "saleB", "oldPrice", "yunfei"].includes(key)) {
          if (key == "newPrice") {
            line.newPrice = value.toFixed(2);
          } else {
            line.newPrice = (
              +line.oldPrice * +line.saleB +
              +line.yunfei
            ).toFixed(2);
          }
        }

        line.shijiprice = (
          +line.newPrice * +line.zhekou -
          line.youhuiquan
        ).toFixed(2);
        line.lirun = (
          +line.shijiprice -
          +line.oldPrice -
          +line.yunfei -
          +line.shijiprice * +line.pingtaikoudian
        ).toFixed(2);
        line.lirunlv =
          ((+line.lirun * 100) / +line.shijiprice).toFixed(2) + "%";
      }
    },
    saveList: function() {
      if (this.$IDB) {
        if (this.isOpering) {
          this.showWarnMsg();
          return;
        }
        this.isOpering = true;
        this.$IDB
          .update({
            tableName: this.curTableName,
            handler: (row, index) => {
              let fdRow = this.list.find(x => x.id === row.id);
              if (fdRow) {
                row.name = fdRow.name;
                row.oldPrice = fdRow.oldPrice;
                row.saleB = fdRow.saleB;
                row.yunfei = fdRow.yunfei;
                row.newPrice = fdRow.newPrice;
                row.zhekou = fdRow.zhekou;
                row.youhuiquan = fdRow.youhuiquan;
                row.pingtaikoudian = fdRow.pingtaikoudian;
                row.shijiprice = fdRow.shijiprice;
                row.lirun = fdRow.lirun;
                row.lirunlv = fdRow.lirunlv;
              }
            }
          })
          .then(res => {
            this.showActionMsg("全部产品数据保存成功!");
            this.isOpering = false;
          });
      }
    },
    goClear() {
      this.modalShow = true;
    },
    clear() {
      this.modalShow = false;
      if (this.isOpering) {
        this.showWarnMsg();
        return;
      }
      this.list = [];
      if (this.$IDB) {
        this.isOpering = true;
        this.$IDB
          .delete({
            tableName: this.curTableName
          })
          .then(res => {
            this.showActionMsg("删除全部产品数据成功!");
            this.isOpering = false;
          });
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
.prise-editor .prise-cfg .product-s {
  margin-left: 36px;
}
.prise-editor .prise-cfg .product-s > span {
  cursor: pointer;
  display: inline-block;
  padding: 0 10px;
  height: 36px;
  line-height: 36px;
}
.prise-editor .prise-cfg .prodNum {
  display: inline-block;
  height: 36px;
  line-height: 36px;
  padding-right: 30px;
  position: absolute;
  right: 0;
}
.prise-editor .prise-cfg .product-s > span.active {
  color: #1a75ff;
  font-weight: bold;
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
.prise-editor .clear-product-conf /deep/ .myDialog {
  width: 420px;
}
.prise-editor .clear-product-conf /deep/ .myDialog .form-btn-group {
  margin: 10px;
}
.prise-editor .prise-cfg .multi-oper {
  display: flex;
  align-items: center;
  height: 36px;
  position: absolute;
  right: 115px;
}
.prise-editor .prise-cfg .multi-oper .mul-value {
  width: 80px;
  margin-left: 8px;
}
.prise-editor .prise-cfg .multi-oper .mul-value /deep/ .vc-form-group-item {
  min-width: auto;
  height: 30px !important;
}
</style>
