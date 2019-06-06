<template>
  <div class="App">
    <header>
      <div class="head-logo">
        <img src="./assets/logo.png">
        <span class="logo-border"></span>
      </div>
      <div class="head-memu">
        <router-link class="menu-item" to="hello">Hello</router-link>
        <router-link class="menu-item" :to="'basic'">Basic</router-link>
        <router-link class="menu-item" :to="{ path: 'advance' }">Advance</router-link>
        <router-link class="menu-item" v-bind:to="'help'">Help</router-link>
      </div>
    </header>
    <article>
      <router-view></router-view>
    </article>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 100%;
  height:100%;
  margin-left: -8px;
  margin-top: -8px;
}
header {
  display: flex;
  width: inherit;
  height: 60px;
  border-bottom: solid 1px #e6e6e6;
  box-shadow: -8px 0px 10px 2px #e6e6e6;
}
header .head-logo {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  padding: 0 10px 0 30px;
}
header .head-logo img {
  width: 30px;
  height: 30px;
}
header .head-logo .logo-border {
  width: 2px;
  height: 24px;
  background-color: #999;
}
header .head-memu {
  display: inline-flex;
  align-items: center;
}
header .head-memu .menu-item {
  padding: 0 20px;
  font-size: 16px;
  color: #333;
  text-decoration: none;
}
header .head-memu .menu-item:hover {
  text-decoration: underline;
  color: #006600;
}
header .head-memu .menu-item.link-active {
  color: #006600;
  font-size: 18px;
  font-weight: 600;
}
article {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
}

</style>
