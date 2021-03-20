<template>
  <div class="getter">
    <h2>{{msg}}</h2>
    <p>nums: {{nums}}</p>
    <p>numLen: {{numLen}}, sum: {{getSum}}, delIndex: {{delIndex}}</p>
    <div class="opers">
      <vc-button :type="'cancel'" @click="addNums">addNums</vc-button>
      <vc-button :type="'cancel'" @click="delNumIt">delNums</vc-button>
      <vc-button :type="'cancel'" @click="reverceNums">reverceNums</vc-button>
      <vc-button :type="'cancel'" @click="addNums22">addNums22</vc-button>
    </div>
    <hr/>
    <child-state1></child-state1>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

var childState1 = {
  data () {
    return {
      name: 'child component 01',
      index: 0
    }
  },
  template: `<div><h2>{{name}}</h2>
  <p>title: {{title}}</p>
  <p>nums: {{nums}}</p>
  <p>numLen: {{numLen}}, sum: {{getSum}}</p>
  <p>num[{{index}}]: {{numByIndex}}</p>
  <div class="opers">
    <vc-button :type="'cancel'" @click="reverce">reverce</vc-button>
  </div>
  </div>`,
  computed: {
    numByIndex: function () {
      this.index = Math.round(Math.random() * 12)
      return this.$store.getters.getNum(this.index)
    },
    ...mapGetters([
      'nums', 'numLen'
    ]),
    ...mapGetters({
      getSum: 'numSum'
    }),
    ...mapState([
      'title'
    ])
  },
  methods: {
    ...mapMutations({
      reverce: 'reverceNums'
    })
  }
}

export default {
  name: 'getter',
  data () {
    return {
      msg: 'hello getter',
      delIndex: 0
    }
  },
  components: {
    childState1
  },
  computed: {
    ...mapGetters([
      'nums', 'numLen'
    ]),
    ...mapGetters({
      getSum: 'numSum'
    })
  },
  methods: {
    delNumIt: function () {
      this.delIndex = Math.round(Math.random() * this.numLen)
      this.delNums(this.delIndex)
    },
    ...mapMutations([
      'addNums', 'reverceNums', 'delNums'
    ]),
    ...mapMutations({
      'addNums22': function (commit) {
        commit('addNums')
      }
    })
  }
}
</script>

<style scoped lang="less">
.getter {
  h2 {
    font-weight: normal;
  }
  .opers {
    padding-left: 20px;
  }
}
</style>
