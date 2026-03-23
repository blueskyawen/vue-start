<template>
  <div>
    <vc-description title="个人简介">
      <vc-description-item label="名称">{{ city_name }}</vc-description-item>
      <vc-description-item :label="'年龄'">{{ site_name }}</vc-description-item>
      <vc-description-item :label="'国籍'">{{ siteSSSS }}</vc-description-item>
      <vc-description-item :label="'城市'">{{ siteC }}</vc-description-item>
      <vc-description-item :label="'单位单位单位单位单位'" :span="2">{{
        siteCC
      }}</vc-description-item>
      <vc-description-item
        :label="'爱好爱好爱好爱好爱好爱好'"
        :labelWrap="false"
        >{{ sitessObj.likes }}</vc-description-item
      >
      <vc-description-item :label="'描述'" :span="1">{{
        sitessObj.text
      }}</vc-description-item>
    </vc-description>
    <div>
      <vc-button @click="ModSiteName">ModSiteName</vc-button>
    </div>
    <vc-description title="SITe Name">
      <vc-description-item label="state">{{ site_name }}</vc-description-item>
      <vc-description-item label="moduleA/state">{{
        siteSSSS
      }}</vc-description-item>
      <vc-description-item label="moduleB/state">{{
        siteNameB
      }}</vc-description-item>
      <vc-description-item label="moduleC/state">{{
        siteC
      }}</vc-description-item>
      <vc-description-item label="moduleC/cc/state">{{
        siteNameCC
      }}</vc-description-item>
    </vc-description>
    <p>Site_all: {{ allSiteName }}</p>
    <div>
      <vc-button @click="MulationSiteName">MulationSiteName</vc-button>
    </div>
    <p>
      非命名空间的模块与根模块在一个命名空间里,
      不建议声明相同名字的getters,mutations, actions,
      会有警告但不会报错,仍能运行
    </p>
    <p>
      同名的getters属性在获取时候,按照声明顺序返回第一个匹配到的饿, 比如
      根-》modules:[moduleA, moduleB], 如果根store有返回根的,
      否则按顺序搜索modules, 返回第一个匹配到的
    </p>
    <P>同名的mutations, actions在组件使用commit/dispatch时候会顺序挨个触发</P>
    <p>
      带命名空间的模块的getters,mutations, actions的获取和触发必须带模块路径
    </p>
    <div>
      <h3>双向绑定state属性</h3>
      <div><input v-model="mySIte" /></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "module",
  data() {
    return {
      sitessObj: {
        name: "张三",
        age: 23,
        country: "中国",
        city: "杭州恒生电子恒生电子恒生电子恒生电子恒生电子恒生电子恒生电子恒生电子恒生电子",
        company: "恒生电子",
        likes: "跑步，爬山，旅游，美食",
        address: "中国浙江省杭州市滨江区恒生电子有限股份公司",
        text: "我问过你的的脸，你已经不再我的身边，感觉有那么甜和那么依恋，每当我闭上眼，我总是可以看见，死心的诺言全部都会实现的的脸，你已经不再我的身边，感觉有那么甜和那么依恋，每当我闭上眼，我总是可以看",
      },
      handerFn: Function,
    };
  },
  created() {
    this.handerFn = this.$store.watch(
      (state, getters) => {
        return getters.city_name + getters.site_name;
      },
      this.watchCallBack,
      { deep: false }
    );
  },
  destroyed() {
    this.handerFn();
  },
  computed: {
    allSiteName() {
      return (
        this.$store.state.site +
        "--" +
        this.$store.state.moduleA.site +
        "--" +
        this.$store.state.moduleB.site +
        "--" +
        this.$store.state.moduleC.site +
        "--" +
        this.$store.state.moduleC.ccc.site
      );
    },
    /*     siteNameB() {
      return this.$store.getters["moduleB/site_name"];
    }, */
    ...mapGetters(["city_name", "site_name"]),
    ...mapState({ siteNameB: (state) => state.moduleB.site }),
    ...mapState({ siteSSSS: (state) => state.moduleA.site }),
    ...mapState("moduleC", { siteC: (state) => state.site }),
    ...mapState("moduleC/ccc", {
      siteCC: (state) => state.name,
      siteNameCC: (state) => state.site,
    }),
    mySIte: {
      get() {
        return this.$store.state.moduleA.site;
      },
      set(v) {
        this.$store.commit("SET_SITE", v);
      },
    },
  },
  methods: {
    ModSiteName() {
      this.$store.dispatch("getName");
    },
    MulationSiteName() {
      this.$store.commit("SET_SITE", "大A");
    },
    watchCallBack() {
      alert("watchCallBack");
    },
  },
};
</script>

<style scoped lang="less"></style>
