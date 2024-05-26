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
        <el-form-item label="站点" :label-width="formLabelWidth">
          <el-select v-model="form.site">
            <el-option
              v-for="item in siteOptions"
              :label="item.name"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="汇率" :label-width="formLabelWidth">
          <span>{{ huilvMap[form.site] }}</span>
        </el-form-item>
        <el-form-item label="普件/特件" :label-width="formLabelWidth">
          <el-select v-model="form.pTYpe">
            <el-option
              v-for="item in rowTypes"
              :label="item.name"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分店名" :label-width="formLabelWidth">
          <el-select v-model="form.dianName">
            <el-option
              v-for="item in dianNameOptions"
              :label="item.name"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-select v-model="form.selectPtype">
            <el-option
              v-for="item in productTypes"
              :label="item.name"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input class="col-input" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="供应商价格(成本价RMB)"
          :label-width="formLabelWidth"
        >
          <el-input class="col-input" v-model="form.oldPrice"></el-input>
        </el-form-item>
        <el-form-item label="重量" :label-width="formLabelWidth">
          <el-input class="col-input" v-model="form.weight"></el-input>
        </el-form-item>
        <el-form-item label="利润率%" :label-width="formLabelWidth">
          <el-input class="col-input" v-model="form.lirunlv"></el-input>
        </el-form-item>
        <el-form-item label="售价(*2)当地货币" :label-width="formLabelWidth">
          <el-input
            class="col-input"
            v-model="form.soldPrice"
            @change="handlezhekouchange"
          ></el-input>
        </el-form-item>
        <el-form-item label="折扣%" :label-width="formLabelWidth">
          <span
            ><el-input
              class="col-input"
              v-model="form.zhekou"
              width="200"
              @change="handlezhekouchange"
            ></el-input>
            <span>
              优惠券:
              <el-input
                class="col-input"
                v-model="form.youhuiquan"
                width="200"
                @change="handlezhekouchange"
              ></el-input
            ></span>
            <span> 折扣及优惠后售价: {{ form.zhekouhouPrice }}</span></span
          >
        </el-form-item>
        <el-form-item label="无利润定价" :label-width="formLabelWidth">
          <el-input class="col-input" v-model="form.wulirunprice"></el-input>
        </el-form-item>
        <el-form-item label="卖家承担运费(藏价)" :label-width="formLabelWidth">
          <el-input class="col-input" v-model="form.cangjia"></el-input>
        </el-form-item>
        <el-form-item
          label="当地成本价(汇率换算)"
          :label-width="formLabelWidth"
        >
          <el-input class="col-input" v-model="form.dangdichengben"></el-input>
        </el-form-item>
        <el-form-item label="国内运费RMB" :label-width="formLabelWidth">
          <el-input class="col-input" v-model="form.myyunfei"></el-input>
        </el-form-item>
        <el-form-item label="货代贴单RMB" :label-width="formLabelWidth">
          <el-input class="col-input" v-model="form.tiedan"></el-input>
        </el-form-item>
        <el-form-item label="佣金%" :label-width="formLabelWidth">
          <el-input class="col-input" v-model="form.yongjin"></el-input>
        </el-form-item>
        <el-form-item label="交易手续费%" :label-width="formLabelWidth">
          <el-input class="col-input" v-model="form.jiaoyishouxu"></el-input>
        </el-form-item>
        <el-form-item label="活动服务费%" :label-width="formLabelWidth">
          <el-input class="col-input" v-model="form.fuwu"></el-input>
        </el-form-item>
        <el-form-item label="广告退货其他%" :label-width="formLabelWidth">
          <el-input class="col-input" v-model="form.other"></el-input>
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
export default {
  name: "addProduct",
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
    },
    dianNameOptions: {
      type: Array,
      default: () => []
    },
    rowTypes: {
      type: Array,
      default: () => []
    },
    productTypes: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {
      titleLabel: "新增",
      formLabelWidth: "180px",
      form: {
        site: "taiwan",
        huilv: "4.46",
        dianName: "",
        selectPtype: "",
        name: "",
        oldPrice: "",
        weight: "",
        pTYpe: "",
        lirunlv: "",
        soldPrice: "",
        zhekou: "100",
        youhuiquan: "0",
        zhekouhouPrice: "",
        dangdichengben: "",
        wulirunprice: "",
        cangjia: "",
        myyunfei: "",
        tiedan: "",
        yongjin: "",
        jiaoyishouxu: "",
        fuwu: "",
        other: ""
      },
      loading: false,
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
      },
      siteOptions: [
        {
          value: "taiwan",
          name: "台湾"
        },
        {
          value: "malai",
          name: "马来"
        },
        {
          value: "yuenan",
          name: "越南"
        },
        {
          value: "taiguo",
          name: "泰国"
        },
        {
          value: "xinjiapo",
          name: "新加坡"
        },
        {
          value: "yinni",
          name: "印尼"
        },
        {
          value: "feilvbin",
          name: "菲律宾"
        },
        {
          value: "baxi",
          name: "巴西"
        },
        {
          value: "moxige",
          name: "墨西哥"
        },
        {
          value: "gelunbiya",
          name: "哥伦比亚"
        },
        {
          value: "zhili",
          name: "智利"
        }
      ]
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
        Object.keys(this.form).forEach(k => {
          this.form[k] = "";
        });
      } else {
        this.titleLabel = "编辑";
        Object.keys(this.form).forEach(k => {
          this.form[k] = this.row[k] || "";
        });
      }
    },
    handleClose() {},
    cancelForm() {
      this.$emit("update:showModal", false);
    },
    okForm() {
      let lineId = new Date().valueOf();
      this.$emit("add-row", {
        ...this.form,
        huilv: this.huilvMap[this.form.site],
        id: this.type == "add" ? lineId : this.row.id,
        siteName: this.siteOptions.find(x => x.value == this.form.site).name
      });
    },
    handlezhekouchange() {
      if (this.form.soldPrice && this.form.zhekou) {
        this.form.zhekouhouPrice = (
          (+this.form.soldPrice * +this.form.zhekou) / 100 -
          +this.form.youhuiquan
        ).toFixed(1);
      }
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
