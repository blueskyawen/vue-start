<template>
  <div class="prise-xiapi">
    <div class="product-s">
      <span
        v-for="pitem in salePlanes"
        :key="pitem.id"
        :class="{ active: pitem.id == curPlane }"
        @click.stop="changeTable(pitem.id)"
        >{{ pitem.label }}</span
      >
    </div>
    <priceCompute v-show="curPlane === 'price-compute'"></priceCompute>
    <products v-if="curPlane !== 'price-compute'"></products>
  </div>
</template>

<script>
import products from "./products.vue";
import priceCompute from "./priceCompute.vue";
export default {
  name: "xiapi",
  components: {
    products,
    priceCompute
  },
  data() {
    return {
      salePlanes: [
        {
          id: "price-compute",
          label: "价格计算器"
        },
        {
          id: "product",
          label: "商品列表"
        }
      ],
      curPlane: "price-compute"
    };
  },
  created() {},
  methods: {
    changeTable(id) {
      this.curPlane = id;
    }
  }
};
</script>

<style scoped>
.prise-xiapi {
  position: fixed;
  height: calc(100% - 120px);
  width: calc(100% - 60px);
}
.prise-xiapi .product-s {
  width: 100%;
  display: flex;
  margin-bottom: 8px;
}
.prise-xiapi .product-s > span {
  cursor: pointer;
  display: inline-block;
  padding: 0 10px;
  height: 36px;
  line-height: 36px;
}
.prise-xiapi .product-s > span.active {
  color: #1a75ff;
  font-weight: bold;
}
.prise-xiapi .prise-list {
  border: solid 1px #999;
  overflow: auto;
  max-height: calc(100% - 38px);
}
</style>
