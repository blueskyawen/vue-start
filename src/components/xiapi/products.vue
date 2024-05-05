<template>
  <div>products ---- 待开发...</div>
</template>

<script>
export default {
  name: "products",
  components: {},
  data() {
    return {
      list: [],
      tableName: "xiapi_dairly",
      loading: false
    };
  },
  created() {
    this.initChart();
  },
  computed: {},
  methods: {
    initChart() {}
  },
  watch: {}
};
</script>

<style scoped></style>
