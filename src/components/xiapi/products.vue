<template>
  <div class="xiapi-prou-list">
    <div class="head">
      <span class="oper"
        ><el-button type="primary" @click="addLine">新增</el-button>
        <vc-button @click="saveList" style="margin-left: 10px"
          >保存</vc-button
        ></span
      >
      <span class="search">搜索区</span>
    </div>
    <div class="list">
      <el-table :data="list" border style="width: 100%" :height="tableHeight">
        <el-table-column prop="siteName" label="站点" width="100">
        </el-table-column>
        <el-table-column prop="huilv" label="汇率" width="80">
        </el-table-column>
        <el-table-column prop="pTYpe" label="普件/特件" width="100">
          <template slot-scope="scope">
            <span>{{ rowTypeMap[scope.row.pTYpe] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dianName" label="分店名" width="80">
          <template slot-scope="scope">
            <span>{{ dianNameMap[scope.row.dianName] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="selectPtype" label="分类" width="80">
          <template slot-scope="scope">
            <span>{{ selectPtypeeMap[scope.row.selectPtype] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="240">
        </el-table-column>
        <el-table-column
          prop="oldPrice"
          label="供应商价格(成本价RMB)"
          width="80"
        >
        </el-table-column>
        <el-table-column prop="weight" label="重量KG" width="80">
        </el-table-column>
        <el-table-column prop="lirunlv" label="利润率%" width="80">
        </el-table-column>
        <el-table-column prop="soldPrice" label="售价(*2)当地货币" width="120">
        </el-table-column>
        <el-table-column
          prop="dangdichengben"
          label="当地成本价(汇率换算)"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="zhekou" label="折扣%" width="80">
        </el-table-column>
        <el-table-column prop="zhekouhouPrice" label="折扣后售价" width="80">
        </el-table-column>
        <el-table-column prop="wulirunprice" label="无利润定价" width="80">
        </el-table-column>
        <el-table-column prop="cangjia" label="卖家承担运费(藏价)" width="100">
        </el-table-column>
        <el-table-column prop="myyunfei" label="国内运费RMB" width="80">
        </el-table-column>
        <el-table-column prop="tiedan" label="货代贴单RMB" width="80">
        </el-table-column>
        <el-table-column prop="yongjin" label="佣金%" width="80">
        </el-table-column>
        <el-table-column prop="jiaoyishouxu" label="交易手续费%" width="80">
        </el-table-column>
        <el-table-column prop="fuwu" label="活动服务费%" width="80">
        </el-table-column>
        <el-table-column prop="other" label="广告退货其他%" width="80">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <span class="line-opers">
              <span class="line-oper" @click.stop="editLine(scope.row)"
                >编辑</span
              >
              <span class="line-oper" @click.stop="delOneline(scope.row)"
                >删除</span
              >
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <addProduct
      v-bind:showModal.sync="showAddModal"
      :type="addType"
      :row="editRow"
      :rowTypes="rowTypes"
      :dianNameOptions="dianNameOptions"
      :productTypes="productTypes"
      @add-row="handleAddRow"
    ></addProduct>
  </div>
</template>

<script>
import addProduct from "./addProduct.vue";
export default {
  name: "products",
  components: {
    addProduct
  },
  data() {
    return {
      list: [],
      cloneList: [],
      tableName: "xiapi_products",
      loading: false,
      dianNameOptions: [
        {
          value: "taiwan1",
          name: "台湾一店(家居)",
          site: "taiwan"
        },
        {
          value: "taiwan2",
          name: "台湾二店(宠物)",
          site: "taiwan"
        }
      ],
      dianNameMap: {},
      productTypes: [
        {
          value: "yingliu",
          name: "引流款"
        },
        {
          value: "jichu",
          name: "基础款"
        },
        {
          value: "lirun",
          name: "利润款"
        }
      ],
      selectPtype: "",
      selectPtypeeMap: {},
      rowTypes: [
        {
          value: "pujian",
          name: "普件"
        },
        {
          value: "tejian",
          name: "特件"
        }
      ],
      rowTypeMap: {},
      showAddModal: false,
      addType: "add",
      editRow: {},
      disableTableAction: false,
      curTableName: "xiapi_products",
      fenleiSortMap: {
        yingliu: 1,
        jichu: 2,
        lirun: 3
      },
      tableHeight: 300
    };
  },
  created() {
    this.tableHeight = window.innerHeight - 180;
    this.initData();
    this.getTableList();
  },
  watch: {
    dianName: function(v) {
      console.log("&&&&&&&: " + v);
      if (v) {
        console.log(v);
      }
    }
  },
  methods: {
    initData() {
      this.dianNameOptions.forEach(x => {
        if (!this.dianNameMap[x.value]) {
          this.dianNameMap[x.value] = x.name;
        }
      });
      this.rowTypes.forEach(x => {
        if (!this.rowTypeMap[x.value]) {
          this.rowTypeMap[x.value] = x.name;
        }
      });
      this.productTypes.forEach(x => {
        if (!this.selectPtypeeMap[x.value]) {
          this.selectPtypeeMap[x.value] = x.name;
        }
      });
    },
    getTableList() {
      if (this.$IDBM2) {
        this.$IDBM2
          .query({
            tableName: this.curTableName
          })
          .then(res => {
            this.list = res.data || [];
            this.list.sort(
              (x, y) =>
                this.fenleiSortMap[x.selectPtype] -
                this.fenleiSortMap[y.selectPtype]
            );
            this.cloneList = JSON.parse(JSON.stringify(this.list));
          });
      }
    },
    editLine(item) {
      this.addType = "edit";
      this.editRow = { ...item };
      this.showAddModal = true;
    },
    addLine: function() {
      if (this.disableTableAction) return;
      this.addType = "add";
      this.showAddModal = true;
    },
    handleAddRow(v) {
      let newLine = { ...v, oper: "" };
      if (this.addType === "add") {
        this.list.push(newLine);
        this.cloneList.push(newLine);
        if (this.$IDBM2) {
          this.$IDBM2
            .add({
              tableName: this.curTableName,
              data: { ...newLine }
            })
            .then(res => {
              console.log("添加成功");
            });
        }
      } else {
        let fdRow = this.list.find(x => x.id === newLine.id);
        if (fdRow) {
          Object.keys(newLine).forEach(k => {
            if (k !== "id") {
              fdRow[k] = newLine[k];
            }
          });
          let fdRow2 = this.cloneList.find(x => x.id === newLine.id);
          if (fdRow2) {
            Object.keys(newLine).forEach(k => {
              if (k !== "id") {
                fdRow2[k] = newLine[k];
              }
            });
          }
          console.log(this.list);
          if (this.$IDBM2) {
            this.$IDBM2
              .update({
                tableName: this.curTableName,
                condition: (item, index) => item.id === newLine.id,
                handler: (row, index) => {
                  let fdRow = this.list.find(x => x.id === row.id);
                  if (fdRow) {
                    Object.keys(fdRow).forEach(k => {
                      if (k !== "id") {
                        row[k] = fdRow[k];
                      }
                    });
                  }
                }
              })
              .then(res => {
                console.log("更新数据：", res);
              });
          }
        }
      }

      this.showAddModal = false;
    },
    delOneline: function(lineitem) {
      if (!this.list || !this.list.length) return;
      let delIndex = this.list.findIndex(x => x.id == lineitem.id);
      if (delIndex > -1) {
        this.list.splice(delIndex, 1);
        let delIndex2 = this.cloneList.findIndex(x => x.id == lineitem.id);
        this.cloneList.splice(delIndex2, 1);
        if (this.$IDBM2) {
          this.$IDBM2
            .delete({
              tableName: this.curTableName,
              condition: (item, index) => item.id === lineitem.id
            })
            .then(res => {
              console.log("删除的数据：", res);
            });
        }
      }
    },
    saveList() {
      if (this.$IDBM2) {
        this.$IDBM2
          .update({
            tableName: this.curTableName,
            handler: (row, index) => {
              let fdRow = this.cloneList.find(x => x.id === row.id);
              if (fdRow) {
                Object.keys(fdRow).forEach(k => {
                  row[k] = fdRow[k];
                });
                if (this.curPlane === "xiapi") {
                  // this.columns = this.columns_xiapi;
                }
              }
            }
          })
          .then(res => {
            // this.showActionMsg("保存成功!");
            this.$message({
              message: "保存成功",
              type: "success"
            });
          });
      }
    },
    showActionMsg(text) {
      /*       if (text) {
        this.message = text || "操作成功";
        this.msgShow = true;
      } else {
        this.message = "操作成功";
      } */
    }
  },
  watch: {}
};
</script>

<style scoped>
.xiapi-prou-list .head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.xiapi-prou-list .list {
  width: 100%;
}
.xiapi-prou-list .line-oper {
  cursor: pointer;
}
</style>
