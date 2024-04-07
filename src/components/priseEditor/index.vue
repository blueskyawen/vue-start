<template>
  <div class="prise-editor">
    <div class="prise-cfg">
      <vc-button type="add" @click="addOneline">新增一行产品</vc-button>
      <vc-button @click="saveList" style="margin-left: 10px">保存</vc-button>
      <vc-button type="cancel" @click="clear" style="margin-left: 10px"
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
      list: []
    };
  },
  created() {
    setTimeout(() => {
      this.getTableList();
    }, 1000);
  },
  methods: {
    refresh() {
      this.getTableList();
    },
    getTableList() {
      if (this.$IDB) {
        this.$IDB
          .query({
            tableName: this.curTableName
          })
          .then(res => {
            console.log("** getTableList **");
            this.list = res.data || [];
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
            console.log("全部数据修改: ", res);
          });
      }
    },
    clear() {
      this.list = [];
      if (this.$IDB) {
        this.$IDB
          .delete({
            tableName: this.curTableName
          })
          .then(res => {
            console.log("删除的数据：", res);
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
</style>
