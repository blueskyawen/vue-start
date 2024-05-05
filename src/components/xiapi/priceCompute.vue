<template>
  <div class="price-compute">
    <div class="header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="供应商价格(成本价RMB)">
          <el-input
            v-model="formInline.chengbenPrice"
            @change="handeFormChange('chengchengbenPriceben')"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品重量KG">
          <el-input
            v-model="formInline.weight"
            @change="handeFormChange('weight')"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addLine">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveCoach">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="name" label="站点" width="100">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.name"
              @change="rowInputChange(scope.row, 'name')"
            >
              <el-option label="台湾" value="taiwan"></el-option>
              <el-option label="马来" value="malai"></el-option>
              <el-option label="越南" value="yuenan"></el-option>
              <el-option label="泰国" value="taiguo"></el-option>
              <el-option label="新加坡" value="xinjiapo"></el-option>
              <el-option label="印尼" value="yinni"></el-option>
              <el-option label="菲律宾" value="feilvbin"></el-option>
              <el-option label="巴西" value="baxi"></el-option>
              <el-option label="墨西哥" value="moxige"></el-option>
              <el-option label="哥伦比亚" value="gelunbiya"></el-option>
              <el-option label="智利" value="zhili"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="huilv" label="汇率" width="80">
          <template slot-scope="scope">
            <el-input
              class="col-input"
              v-model="scope.row.huilv"
              @change="rowInputChange(scope.row, 'huilv')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="普件/特件" width="100">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.type"
              @change="rowInputChange(scope.row, 'type')"
            >
              <el-option label="普件" value="pujian"></el-option>
              <el-option label="特件" value="tejian"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="lirunlv" label="利润率%" width="80">
          <template slot-scope="scope">
            <el-input
              class="col-input"
              v-model="scope.row.lirunlv"
              @change="rowInputChange(scope.row, 'lirunlv')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="soldPrice" label="售价(*2)当地货币" width="120">
        </el-table-column>
        <el-table-column
          prop="dangdichengben"
          label="当地成本价(汇率换算)"
          width="120"
        >
        </el-table-column>
        <el-table-column prop="cangjia" label="卖家承担运费(藏价)" width="100">
        </el-table-column>
        <el-table-column prop="wulirunprice" label="无利润定价" width="80">
        </el-table-column>
        <el-table-column prop="myyunfei" label="国内运费RMB" width="80">
          <template slot-scope="scope">
            <el-input
              class="col-input"
              v-model="scope.row.myyunfei"
              @change="rowInputChange(scope.row, 'myyunfei')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="tiedan" label="货代贴单RMB" width="80">
          <template slot-scope="scope">
            <el-input
              class="col-input"
              v-model="scope.row.tiedan"
              @change="rowInputChange(scope.row, 'tiedan')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="yongjin" label="佣金%" width="80">
          <template slot-scope="scope">
            <el-input
              class="col-input"
              v-model="scope.row.yongjin"
              @change="rowInputChange(scope.row, 'yongjin')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="jiaoyishouxu" label="交易手续费%" width="80">
          <template slot-scope="scope">
            <el-input
              class="col-input"
              v-model="scope.row.jiaoyishouxu"
              @change="rowInputChange(scope.row, 'jiaoyishouxu')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="fuwu" label="活动服务费%" width="80">
          <template slot-scope="scope">
            <el-input
              class="col-input"
              v-model="scope.row.fuwu"
              @change="rowInputChange(scope.row, 'fuwu')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="other" label="广告退货其他%" width="80">
          <template slot-scope="scope">
            <el-input
              class="col-input"
              v-model="scope.row.other"
              @change="rowInputChange(scope.row, 'other')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <span class="line-opers">
              <span class="line-oper" @click.stop="delLine(scope.row)"
                >删除</span
              >
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "priceCompute",
  components: {},
  data() {
    return {
      list: [],
      formInline: {
        chengbenPrice: "10",
        weight: "100"
      },
      columns: [
        {
          label: "站点",
          key: "name",
          width: "100px"
        },
        {
          label: "汇率",
          key: "huilv",
          width: "100px"
        },
        {
          label: "普件/特件",
          key: "type",
          width: "80px"
        },
        {
          label: "利润率",
          key: "lvrunlv",
          width: "100px"
        },
        {
          label: "售价(*2)当地货币",
          key: "soldPrice",
          width: "160px"
        },
        {
          label: "当地成本价(汇率换算)",
          key: "dangdichengben",
          width: "180px"
        },
        {
          label: "卖家承担运费(藏价)",
          key: "cangjia",
          width: "180px"
        },
        {
          label: "无利润定价",
          key: "wulirunprice",
          width: "120px"
        },
        {
          label: "国内运费RMB",
          key: "myyunfei",
          width: "100px"
        },
        {
          label: "货代贴单RMB",
          key: "tiedan",
          width: "100px"
        },
        {
          label: "佣金%",
          key: "yongjin",
          width: "100px"
        },
        {
          label: "交易手续费%",
          key: "jiaoyishouxu",
          width: "120px"
        },
        {
          label: "活动服务费%",
          key: "fuwu",
          width: "120px"
        },
        {
          label: "广告退货其他%",
          key: "other",
          width: "120px"
        },
        {
          label: "操作",
          key: "oper"
        }
      ],
      newLine: {
        id: "",
        name: "taiwan",
        huilv: "1",
        type: "pujian",
        lvrunlv: "0",
        soldPrice: "",
        dangdichengben: "",
        cangjia: "",
        wulirunprice: "",
        myyunfei: "0",
        tiedan: "2",
        yongjin: "7",
        jiaoyishouxu: "2",
        fuwu: "0",
        other: "0"
      },
      huilvMap: {
        taiwan: 4.46,
        malai: 0.65,
        yuenan: 3509.8,
        taiguo: 5.07,
        xinjiapo: 0.186,
        yinni: 2221,
        feilvbin: 7.89,
        baxi: 0.7,
        moxige: 2.34,
        gelunbiya: 539.3,
        zhili: 129.68
      }
    };
  },
  created() {
    this.initForm();
  },
  computed: {},
  methods: {
    initForm() {
      let coachStr = localStorage.getItem("xiapidingjiaqi");
      if (coachStr) {
        let coachData = JSON.parse(coachStr);
        this.formInline = coachData.top || {
          chengbenPrice: "10",
          weight: "100"
        };
        this.list = coachData.list || [];
      }
    },
    addLine() {
      let lineID = new Date().valueOf();
      let newRow = { id: lineID, ...this.newLine };
      this.list.push(newRow);
    },
    delLine(row) {
      let delIndex = this.list.findIndex(x => x.id == row.id);
      if (delIndex > -1) {
        this.list.splice(delIndex, 1);
      }
    },
    saveCoach() {
      let coachData = JSON.stringify({
        top: { ...this.formInline },
        list: this.list
      });
      localStorage.setItem("xiapidingjiaqi", coachData);
    },
    handeFormChange(key) {
      if (key === "chengchengbenPriceben") {
        this.handleChengbenPriceChange();
        return;
      }
      if (key === "weight") {
        this.handleWeightChange();
        return;
      }
    },
    rowInputChange(row, key) {
      if (key === "name") {
        row.huilv = this.huilvMap[row.name];
        this.ha;
        row.dangdichengben = (
          row.huilv * +this.formInline.chengbenPrice
        ).toFixed(2);
        this.handleHuilvChange(row);
        return;
      }
      if (key === "huilv") {
        this.handleHuilvChange(row);
        return;
      }
      if (key === "type") {
        this.handleWuliTypeChange(row);
        return;
      }
      if (key === "lirunlv") {
        this.handleLiRunlvChange(row);
        return;
      }
      if (["myyunfei", "tiedan"].includes(key)) {
        this.handleGuoneiyunfeuChange(row);
        return;
      }
      if (["yongjin", "jiaoyishouxu", "fuwu", "other"].includes(key)) {
        this.handleOtherChange(row);
        return;
      }
    },
    // 汇率变化, 引发变化值: 国内运费, 货代贴单费, 当地汇率换算的成本值, 无利润定价, 当地最终商品售价
    handleHuilvChange(row) {
      row.dangdichengben = (
        row.huilv *
        (+this.formInline.chengbenPrice + +row.myyunfei + +row.tiedan)
      ).toFixed(2);
      row.wulirunprice = (
        ((+row.dangdichengben + +row.cangjia) * 100) /
        (100 - +row.yongjin - +row.jiaoyishouxu - +row.fuwu - +row.other)
      ).toFixed(2);
      row.soldPrice = (
        +row.wulirunprice *
        2 *
        (100 / (100 - +row.lirunlv))
      ).toFixed(2);
    },
    // 物流普/特件变化, 引发变化值: 卖家运费(藏价), 无利润定价, 当地最终商品售价
    handleWuliTypeChange(row) {
      this.calcCangjia(row);
      row.wulirunprice = (
        ((+row.dangdichengben + +row.cangjia) * 100) /
        (100 - +row.yongjin - +row.jiaoyishouxu - +row.fuwu - +row.other)
      ).toFixed(2);
      row.soldPrice = (
        +row.wulirunprice *
        2 *
        ((100 - +row.lirunlv) / 100)
      ).toFixed(2);
    },
    // 利润率变化, 引发变化值: 当地最终商品售价
    handleLiRunlvChange(row) {
      row.soldPrice = (
        +row.wulirunprice *
        2 *
        (100 / (100 - +row.lirunlv))
      ).toFixed(2);
    },
    // 国内运费/货代贴单费变化, 引发变化值: 当地汇率换算的成本值, 无利润定价, 当地最终商品售价
    handleGuoneiyunfeuChange(row) {
      this.handleHuilvChange(row);
    },
    // 佣金/广告等其他费变化, 引发变化值: 无利润定价, 当地最终商品售价
    handleOtherChange(row) {
      row.wulirunprice = (
        ((+row.dangdichengben + +row.cangjia) * 100) /
        (100 - +row.yongjin - +row.jiaoyishouxu - +row.fuwu - +row.other)
      ).toFixed(2);
      row.soldPrice = (
        +row.wulirunprice *
        2 *
        (100 / (100 - +row.lirunlv))
      ).toFixed(2);
    },
    // 国内成本价变化, 引发变化值: 汇率换算的当地成本、无利润定价, 当地最终商品售价
    handleChengbenPriceChange() {
      let len = this.list.length;
      if (len > 0) {
        for (let rIndex = 0; rIndex < len; rIndex++) {
          let row = this.list[rIndex];
          this.handleHuilvChange(row);
        }
      }
    },
    // 重量变化, 引发变化值: 卖家运费(藏价), 无利润定价, 当地最终商品售价
    handleWeightChange() {
      let len = this.list.length;
      if (len > 0) {
        for (let rIndex = 0; rIndex < len; rIndex++) {
          let row = this.list[rIndex];
          this.calcCangjia(row);
          row.wulirunprice = (
            ((+row.dangdichengben + +row.cangjia) * 100) /
            (100 - +row.yongjin - +row.jiaoyishouxu - +row.fuwu - +row.other)
          ).toFixed(2);
          row.soldPrice = (
            +row.wulirunprice *
            2 *
            (100 / (100 - +row.lirunlv))
          ).toFixed(2);
        }
      }
    },
    calcCangjia(row) {
      let weight_g = +this.formInline.weight * 1000;
      if (row.name === "taiwan") {
        this.calcTaiwanCangjia(row, weight_g);
      }
      if (row.name === "malai") {
        this.calcMalaiCangjia(row, weight_g);
      }
    },
    getTaiwanXuzhongYunfei(weight, type) {
      if (weight > 2500) {
        return type === "pujian" ? 60 : 70;
      } else if (weight > 2000) {
        return type === "pujian" ? 50 : 60;
      } else if (weight > 1000) {
        return type === "pujian" ? 40 : 50;
      } else if (weight > 500) {
        return type === "pujian" ? 30 : 40;
      } else {
        return 0;
      }
    },
    calcTaiwanCangjia(row, weight) {
      let zhongliang = weight;
      if (row.type === "pujian") {
        let temp = 25;
        while (zhongliang > 500) {
          let xufei = this.getTaiwanXuzhongYunfei(zhongliang, row.type);
          temp += xufei;
          zhongliang -= 500;
        }
        row.cangjia = temp;
      }
      if (row.type === "tejian") {
        let temp = 45;
        while (zhongliang > 500) {
          let xufei = this.getTaiwanXuzhongYunfei(zhongliang, row.type);
          temp += xufei;
          zhongliang -= 500;
        }
        row.cangjia = temp;
      }
    },
    calcMalaiCangjia(row, weight) {
      let tempNum = Math.ceil(weight / 10);
      if (row.type === "pujian") {
        row.cangjia = (tempNum * 0.15).toFixed(2);
      }
    }
  }
};
</script>

<style scoped>
.price-compute {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.price-compute .header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.price-compute .list {
  display: flex;
}
</style>
