<template>
  <div>
    <vc-description title="个人简介">
      <vc-description-item label="名称">{{ city_name }}</vc-description-item>
      <vc-description-item :label="'年龄'">{{ site_name }}</vc-description-item>
      <vc-description-item :label="'国籍'">{{ siteSSSS }}</vc-description-item>
      <vc-description-item :label="'城市'">{{ siteC }}</vc-description-item>
      <vc-description-item :label="'单位单位单位单位单位'" :span="2">{{ siteCC }}</vc-description-item>
      <vc-description-item :label="'爱好爱好爱好爱好爱好爱好'" :labelWrap="false">{{ sitessObj.likes }}</vc-description-item>
      <vc-description-item :label="'描述'" :span="1">{{ sitessObj.text }}</vc-description-item>
    </vc-description>
    <div>
      <vc-button @click="ModSiteName">ModSiteName</vc-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'module',
  data () {
    return {
      sitessObj: {
        name: '张三',
        age: 23,
        country: '中国',
        city: '杭州恒生电子恒生电子恒生电子恒生电子恒生电子恒生电子恒生电子恒生电子恒生电子',
        company: '恒生电子',
        likes: '跑步，爬山，旅游，美食',
        address: '中国浙江省杭州市滨江区恒生电子有限股份公司',
        text: '我问过你的的脸，你已经不再我的身边，感觉有那么甜和那么依恋，每当我闭上眼，我总是可以看见，死心的诺言全部都会实现的的脸，你已经不再我的身边，感觉有那么甜和那么依恋，每当我闭上眼，我总是可以看'
      },
      handerFn: Function
    }
  },
  created () {
    this.handerFn = this.$store.watch((state, getters) => {
      return getters.city_name + getters.site_name
    }, this.watchCallBack, { deep: false })
  },
  destroyed () {
    this.handerFn()
  },
  computed: {
    ...mapGetters(['city_name', 'site_name']),
    ...mapState({ siteSSSS: state => state.moduleA.site }),
    ...mapState('moduleC', { siteC: state => state.site }),
    ...mapState('moduleC/ccc', { siteCC: state => state.name })
  },
  methods: {
    ModSiteName () {
      this.$store.dispatch('getName')
    },
    watchCallBack () {
      alert('watchCallBack')
    }
  }
}
</script>

<style scoped lang="less">

</style>
