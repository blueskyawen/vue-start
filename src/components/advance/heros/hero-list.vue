<template>
  <div class="hero-list">
    <ul>
      <li v-for="hero in heros" :key="hero.id" class="hero-item">
        <span class="item-index">{{hero.id}}</span>
        <span class="item-name" @click="selectHero(hero)">{{hero.name}}</span>
        <span class="item-del">x</span>
      </li>
    </ul>
    <div class="detail">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hero-list',
  data () {
    return {
      heros: []
    }
  },
  created () {
    this.getHeros()
  },
  methods: {
    getHeros: function () {
      this.axios
        .get('api/advance/heros')
        .then(response => {
          this.heros = response.data.heros
        })
        .catch((error) => { // 请求失败处理
          alert(error)
        })
    },
    selectHero: function (hero) {
      this.$router.push(`/advance/herolist/detail/${hero.id}`)
      // this.$router.push(`/advance/herolist/detail/${hero.id}?navFrom=list`)
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
  .hero-list {
    display: flex;
  }
  ul {
    list-style: none;
    margin: 0;
    display: inline-block;
  }
  .hero-item {
    margin: 10px 0;
    height: 30px;
  }
  .hero-item:hover {
    cursor: pointer;
    margin-left: 5px;
    transition: all .5s;
  }
  .hero-item span {
    display: inline-block;
    float: left;
  }
  .hero-item .item-index {
    height: inherit;
    width: 36px;
    background-color: #607d8b;
    color: #fff;
    text-align: center;
    line-height: 30px;
    border-radius: 3px 0 0 3px;
  }
  .hero-item:hover .item-name {
    background-color: #ddd;
  }
  .hero-item .item-name {
    height: inherit;
    width: 180px;
    background-color: #eee;
    color: #666;
    text-align: center;
    line-height: 30px;
  }
  .hero-item .item-del {
    height: inherit;
    width: 36px;
    background-color: gray;
    color: #fff;
    text-align: center;
    line-height: 30px;
    border-radius: 0 3px 3px 0;
  }
  .detail {
    display: inline-block;
    padding: 30px;
    width: 60%;
  }
</style>
