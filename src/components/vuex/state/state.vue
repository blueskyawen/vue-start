<template>
    <div class="state">
      <h2>{{getMsg}}</h2>
      <p>person: name={{name}}, age={{realAge}}, weight={{calWeight}}</p>
      <p>{{sTitle}}</p>
      <div class="opers">
        <vc-button :type="'cancel'" @click="ModAge">Mod-Age</vc-button>
        <vc-button :type="'cancel'" @click="ModWeight">Mod-Weight</vc-button>
      </div>
      <hr/>
      <child-state1></child-state1>
      <hr/>
      <child-state2></child-state2>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

var childState1 = {
  data () {
    return {
      name: 'child component 01'
    }
  },
  template: `<div><h2>{{name}}</h2>
    <p>person: {{getPerson}}</p>
    <p>title: {{title}}, count: {{count}}</p>
    <div class="opers">
      <vc-button :type="'cancel'" @click="ModAge">Mod-Age</vc-button>
    </div>
    </div>`,
  computed: {
    getPerson () {
      return this.$store.getters.personInfo
    },
    ...mapState([
      'title', 'count'
    ])
  },
  methods: {
    ModAge: function () {
      this.$store.commit('changeAge')
    }
  }
}
var childState2 = {
  data () {
    return {
      name: 'child component 02'
    }
  },
  template: `<div><h2>{{name}}</h2>
    <p>person: {{personInfo}}</p>
    <p>title: {{titleCount}}</p></div>`,
  computed: {
    ...mapGetters([
      'personInfo', 'titleCount'
    ]),
    ...mapState([
      'title', 'count'
    ])
  }
}

export default {
  name: 'state',
  data () {
    return {
      msg: 'hello state'
    }
  },
  components: {
    childState1, childState2
  },
  computed: {
    getMsg: function () {
      return this.msg + '!!'
    },
    ...mapState({
      name: state => state.person.name,
      // realAge: 'person.age', 不能用于对象
      sTitle: 'title',
      calWeight: function (state) {
        return state.person.weight + 'Kg'
      },
      realAge (state) {
        return state.person.age + '岁'
      }
    })
  },
  methods: {
    ModAge: function () {
      this.$store.commit('changeAge')
    },
    ModWeight: function () {
      this.$store.commit('changeWeight2', 10)
    }
  }
}
</script>

<style scoped lang="less">
.state {
  h2 {
    font-weight: normal;
  }
  .opers {
    padding-left: 20px;
  }
}
</style>
