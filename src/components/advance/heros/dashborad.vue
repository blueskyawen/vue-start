<template>
  <div class="dashboard">
    <div class="dashboard-head">Top Heros</div>
    <div class="dashboard-content">
      <div class="dash-item" v-for="hero in heros" :key="hero.id">
        <div class="dash" @click="selectHero(hero)">{{hero.name}}</div>
      </div>
    </div>
    <div style="width: 100%">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashborad',
  data: function () {
    return {
      heros: []
    }
  },
  created: function () {
    this.getHeros()
  },
  methods: {
    getHeros: function () {
      this.axios
        .get('api/advance/heros')
        .then(response => {
          this.heros = response.data.heros.slice(0, 4)
        })
        .catch((error) => { // 请求失败处理
          alert(error)
        })
    },
    selectHero: function (hero) {
      this.$router.push(`/advance/dashboard/detail/${hero.id}`)
      // this.$router.push(`/advance/dashboard/detail/${hero.id}?navFrom=dashboard`)
    }
  },
  watch: {
    '$route': function (to, from) {
      if (from.path.indexOf('detail') !== -1) {
        this.getHeros()
      }
    }
  }
}
</script>

<style scoped>
  .dashboard-head {
    width: 100%;
    padding: 15px 0;
    display: flex;
    justify-content: center;
    font-size: 20px;
    color: #333333;
    font-weight: 500;
  }
  .dashboard-content {
    width: 100%;
  }
  .dash-item {
    width: 25%;
    padding: 10px;
    box-sizing: border-box;
    display: inline-block;
  }
  .dash {
    height: 60px;
    width: 100%;
    background-color: #607d8b;
    border-radius: 3px;
    color: #fff;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dash:hover {
    cursor: pointer;
    background-color: #e6e6e6;
    color: #607d8b;
  }
</style>
