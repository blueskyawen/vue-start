<template>
  <div class="heros">
    <h2>Heros</h2>
    <div>
      <span>Auth: {{auth}}</span>
      <vc-button @click="setAuth">Set Auth</vc-button>
    </div>
    <div class="hero-show">
      <div class="hero-header">
        <router-link class="show-item" to="/advance/dashboard">Dashboard</router-link>
        <router-link class="show-item" :to="`/advance/herolist?auth=${this.auth}`">HeroList</router-link>
      </div>
      <div class="hero-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'heros',
  data () {
    return {
      auth: false
    }
  },
  created: function () {
    Vue.axios.defaults.baseURL = ''
  },
  methods: {
    setAuth: function () {
      this.auth = !this.auth
    }
  },
  computed: {
    getAuth: function () {
      return this.auth
    }
  }
}
</script>

<style scoped>
  .hero-header {
    margin: 15px 0 30px;
  }
  .hero-header .show-item {
    display: inline-block;
    padding: 10px 20px;
    border: solid 1px #f2f2f2;
    border-radius: 2px;
    font-size: 18px;
    color: #666;
    text-decoration: none;
  }
  .hero-header .show-item:hover {
    text-decoration: none;
    border-color: #ccc;
  }
  .hero-header .show-item.link-active {
    border-color: #33cccc;
    background-color: #33cccc;
    color: #fff;
  }
</style>
