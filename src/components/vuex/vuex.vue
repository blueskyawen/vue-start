<template>
  <div class="vuex">
    <div class="az">
      <h2>{{ msg }}</h2>
      <p>person: {{person}}</p>
      <div class="opers">
        <vc-button :type="'cancel'" @click="ModAge">Mod-Age</vc-button>
        <vc-button :type="'cancel'" @click="ModWeight">Mod-Weight</vc-button>
      </div>
    </div>
    <div class="vc-tabs">
      <div class="vc-tab-items">
        <router-link class="vc-tab-item" v-for="tabItem in tabItems" :key="tabItem.value"
                     :to="tabItem.routeLink" active-class="tab-actived">
          {{tabItem.label}}</router-link>
      </div>
      <div class="vc-tab-content">
        <transition>
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vuex',
  data () {
    return {
      msg: 'Welcome to vuex !',
      tabItems: [
        {label: 'State', value: 'state', routeLink: 'state'},
        {label: 'Getter', value: 'getter', routeLink: 'getter'},
        {label: 'Action', value: 'action', routeLink: 'action'},
        {label: 'Module', value: 'module', routeLink: 'module'}
      ]
    }
  },
  computed: {
    person: function () {
      return `name=${this.$store.state.person.name} , age=${this.$store.state.person.age} ,
              weight=${this.$store.state.person.weight}`
    }
  },
  methods: {
    ModAge: function () {
      this.$store.commit('changeAge')
    },
    ModWeight: function () {
      this.$store.commit('changeWeight')
    }
  }
}
</script>

<style scoped lang="less">
  h1, h2 {
    font-weight: normal;
  }
  .vuex {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    .vc-tabs {
      width: 100%;
      .vc-tab-items {
        width: inherit;
        border-bottom: solid 1px #ccc;
        .vc-tab-item {
          display: inline-block;
          color: #666;
          font-size: 14px;
          padding: 15px 30px;
          text-decoration: none;
          position: relative;
          &:hover {
            cursor: pointer;
            background: #f2f2f2;
          }
          &:after {
            content: "";
            display: inline-block;
            width: 0;
            background: #00cc99;
            height: 4px;
            position: absolute;
            top: 100%;
            left: 30px;
            margin-top: -2px;
            transition: all .5s;
            max-width: 100%;
          }
          &.tab-actived {
            color: #000;
            &:after {
              width: 60px;
              left: 0
            }
          }
        }
      }
      .vc-tab-content {
        width: inherit;
        padding: 20px;
      }
    }
    .opers {
      padding-left: 20px;
    }
    .v-enter {
      transform: translateX(100%);
    }
    .v-leave-to {
      transform: translateX(-100%);
    }
    .v-enter-to, .v-leave {
      transform: translateX(0%);
    }
    .v-enter-active, .v-leave-active {
      transition: transform .5s linear;
    }
  }
</style>
