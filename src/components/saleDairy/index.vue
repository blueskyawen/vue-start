<template>
  <div class="prise-editor">
    <div class="prise-cfg">
      <vc-button type="add" @click="addOneline" :disabled="disableTableAction"
        >新增</vc-button
      >
      <vc-button
        @click="saveList"
        style="margin-left: 10px"
        :disabled="disableTableAction"
        >保存</vc-button
      >
      <vc-button
        type="cancel"
        @click="refresh"
        style="margin-left: 10px"
        :disabled="disableTableAction"
        >刷新</vc-button
      >
      <div class="product-s">
        <span
          v-for="pitem in salePlanes"
          :key="pitem.id"
          :class="{ active: pitem.id == curPlane }"
          @click.stop="changeTable(pitem.id)"
          >{{ pitem.label }}</span
        >
      </div>
      <div class="multi-oper">
        <span>
          <el-date-picker
            class="filter-dates"
            v-model="searchValue"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </span>
        <vc-button
          style="margin-left: 8px;height: 34px"
          :type="'cancel'"
          @click="filterDate"
          >筛选</vc-button
        >
      </div>
      <span class="prodNum">行数: {{ list ? list.length : 0 }}</span>
    </div>
    <el-table
      v-if="showTable"
      v-show="!disableTableAction"
      :data="list"
      :height="tableHeight"
      border
      style="width: 100%"
    >
      <el-table-column prop="name" label="日期" width="160"></el-table-column>
      <el-table-column prop="today" label="今日计划" width="420">
        <template slot-scope="scope">
          <p style="padding: 5px" v-html="scope.row['today']"></p>
        </template>
      </el-table-column>
      <el-table-column prop="tomorrow" label="今日进展">
        <template slot-scope="scope">
          <p style="padding: 5px" v-html="scope.row['tomorrow']"></p>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template slot-scope="scope">
          <span class="line-opers">
            <i
              class="line-oper el-icon-edit"
              title="编辑"
              @click.stop="editOneLine(scope.row)"
            ></i>
            <i
              class="line-oper el-icon-delete"
              title="删除"
              @click.stop="delOneline(scope.row)"
            ></i>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <xiapiStatic v-if="disableTableAction"></xiapiStatic>
    <vc-info :type="'success'" v-model="msgShow">{{ message }}</vc-info>
    <vc-info :type="'warn'" v-model="warnShow"
      >数据正在处理中,请稍后尝试!</vc-info
    >
    <addDairly
      v-bind:showModal.sync="showAddLine"
      :type="addType"
      :row="editRow"
      @add-dairly="handleAddDairly"
    ></addDairly>
  </div>
</template>

<script>
import addDairly from "./addDarily.vue";
import xiapiStatic from "./xiapiStatic.vue";
export default {
  name: "sale-dairy",
  components: {
    addDairly,
    xiapiStatic
  },
  data() {
    return {
      columns_doudian: [
        {
          label: "日期",
          key: "name",
          width: "160px"
        },
        {
          label: "今日记录",
          key: "today",
          width: "calc(50% - 120px)"
        },
        {
          label: "明日计划",
          key: "tomorrow",
          width: "calc(50% - 120px)"
        },
        {
          label: "操作",
          key: "oper",
          width: "80px"
        }
      ],
      columns_xiapi: [
        {
          label: "日期",
          key: "name",
          width: "160px"
        },
        {
          label: "今日",
          key: "today"
        },
        {
          label: "明日",
          key: "tomorrow"
        },
        {
          label: "操作",
          key: "oper"
        }
      ],
      columns: [],
      salePlanes: [
        {
          id: "doudian",
          label: "抖店"
        },
        {
          id: "xiapi",
          label: "虾皮"
        },
        {
          id: "xiapi_static",
          label: "虾皮数据分析"
        }
      ],
      curPlane: "doudian",
      curTableName: "doudian_dairly",
      list: [],
      cloneList: [],
      showAddLine: false,
      msgShow: false,
      message: "操作成功",
      isOpering: false,
      warnShow: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchValue: [],
      searchArr: [],
      addType: "add",
      editRow: {},
      showTable: false,
      tableHeight: 300
    };
  },
  created() {
    this.setColumns();
    this.tableHeight = window.innerHeight - 145;
    this.showTable = true;
    setTimeout(() => {
      this.getTableList();
    }, 1000);
  },
  computed: {
    disableTableAction() {
      return !["doudian", "xiapi"].includes(this.curPlane);
    }
  },
  methods: {
    setColumns() {
      if (this.curPlane === "doudian") {
        this.curTableName = "doudian_dairly";
        this.columns = this.columns_doudian;
      }
      if (this.curPlane === "xiapi") {
        this.curTableName = "xiapi_dairly";
        this.columns = this.columns_xiapi;
      }
    },
    isShowLine(item) {
      if (!this.searchArr || !this.searchArr.length) return true;
      let lineDate = item.date ? new Date(item.date) : null;
      return (
        lineDate && lineDate > this.searchArr[0] && lineDate < this.searchArr[1]
      );
    },
    filterDate() {
      if (!this.cloneList || !this.cloneList.length) {
        return;
      }
      console.log(this.searchValue);
      if (!this.searchValue || this.searchValue.length < 2) {
        this.searchValue = [];
        this.searchArr = [];
        this.refresh();
        return;
      }
      this.searchArr = [
        new Date(this.searchValue[0].toLocaleDateString() + " 00:00:00"),
        new Date(this.searchValue[1].toLocaleDateString() + " 23:59:59")
      ];
      console.log(this.cloneList);
      this.list = this.cloneList.filter(x => this.isShowLine(x));
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
      if (this.disableTableAction) return;
      if (this.isOpering) {
        this.showWarnMsg();
        return;
      }
      this.isOpering = true;
      this.getTableList("refresh");
    },
    getTableList(type) {
      if (this.$IDBM) {
        this.$IDBM
          .query({
            tableName: this.curTableName
          })
          .then(res => {
            this.list = res.data || [];
            this.list.sort((x, y) => x.date - y.date);
            this.cloneList = JSON.parse(JSON.stringify(this.list));
            if (type) {
              this.showActionMsg("重新获取数据成功!");
              this.isOpering = false;
            }
          });
      }
    },
    changeTable(id) {
      this.curPlane = id;
      if (!["doudian", "xiapi"].includes(id)) {
        return;
      }
      this.setColumns();
      this.list = [];
      this.getTableList();
    },
    delOneline: function(lineitem, type) {
      if (!this.list || !this.list.length) return;
      let delIndex = this.list.findIndex(x => x.id == lineitem.id);
      if (delIndex > -1) {
        this.list.splice(delIndex, 1);
        let delIndex2 = this.cloneList.findIndex(x => x.id == lineitem.id);
        this.cloneList.splice(delIndex2, 1);
        if (this.$IDBM) {
          this.$IDBM
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
    editOneLine(item) {
      this.addType = "edit";
      this.editRow = { ...item };
      this.showAddLine = true;
    },
    addOneline: function() {
      if (this.disableTableAction) return;
      this.addType = "add";
      this.showAddLine = true;
    },
    handleAddDairly(v) {
      let newLine = { ...v, oper: "" };
      if (this.addType === "add") {
        this.list.push(newLine);
        this.cloneList.push(newLine);
        if (this.$IDBM) {
          this.$IDBM
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
          fdRow.name = newLine.name;
          fdRow.date = newLine.date;
          fdRow.today = newLine.today;
          fdRow.tomorrow = newLine.tomorrow;
          let fdRow2 = this.cloneList.find(x => x.id === newLine.id);
          if (fdRow2) {
            fdRow2.name = newLine.name;
            fdfdRow2Row.date = newLine.date;
            fdRow2.today = newLine.today;
            fdRow2.tomorrow = newLine.tomorrow;
          }
          if (this.$IDBM) {
            this.$IDBM
              .update({
                tableName: this.curTableName,
                condition: (item, index) => item.id === newLine.id,
                handler: (row, index) => {
                  let fdRow = this.list.find(x => x.id === row.id);
                  if (fdRow) {
                    row.name = newLine.name;
                    row.date = newLine.date;
                    row.today = newLine.today;
                    row.tomorrow = newLine.tomorrow;
                  }
                }
              })
              .then(res => {
                console.log("更新数据：", res);
              });
          }
        }
      }

      this.showAddLine = false;
    },
    saveList: function() {
      if (this.disableTableAction) return;
      if (this.$IDBM) {
        if (this.isOpering) {
          this.showWarnMsg();
          return;
        }
        this.isOpering = true;
        this.$IDBM
          .update({
            tableName: this.curTableName,
            handler: (row, index) => {
              let fdRow = this.cloneList.find(x => x.id === row.id);
              if (fdRow) {
                row.name = fdRow.name;
                row.date = fdRow.date;
                row.today = fdRow.today;
                row.tomorrow = fdRow.tomorrow;
                if (this.curPlane === "xiapi") {
                  // this.columns = this.columns_xiapi;
                }
              }
            }
          })
          .then(res => {
            this.showActionMsg("保存成功!");
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
  min-height: 30px;
  font-weight: bold;
  border-left: 1px solid #666;
  line-height: 30px;
  padding-left: 8px;
  box-sizing: border-box;
}
.col-item {
  display: inline-block;
  border-left: 1px solid #666;
}
.prise-editor .prise-list .col-body .col-line {
  display: flex;
  border-bottom: solid 1px #999;
  flex-direction: column;
}
.prise-editor .prise-list .col-body .col-line .main-line {
  display: flex;
  background: #ffffff;
}
.prise-editor .prise-list .col-body .col-line .main-line .normal-col {
  font-size: 14px;
  padding: 8px;
  box-sizing: border-box;
}
.prise-editor .line-opers {
  display: inline-flex;
  align-items: center;
  height: 35px;
}
.prise-editor .line-opers .line-oper {
  cursor: pointer;
  font-size: 14px;
  padding: 8px;
}
.prise-editor .line-opers .line-oper:hover {
  color: #0099ff;
}
.col-item /deep/ .vc-inputs-item .vc-form-group-item input {
  border: none;
}
.col-item /deep/ .vc-inputs-item .vc-form-group-item {
  min-width: auto;
}
.prise-editor .prise-cfg .multi-oper {
  position: absolute;
  right: 110px;
}
.prise-editor .prise-cfg .multi-oper .filter-dates /deep/ .el-date-editor {
  height: 34px;
  line-height: 34px;
}
.prise-editor
  .prise-cfg
  .multi-oper
  .filter-dates
  /deep/
  .el-date-editor
  .el-range-separator {
  line-height: 26px;
}
</style>
