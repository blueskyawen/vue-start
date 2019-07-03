<template>
  <div class="hero-detail">
    <div>
      <vc-button @click="goback">Go Back</vc-button>
    </div>
    <div style="margin-top: 10px;width: 50%;">
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">id</vc-form-label>
        <vc-form-control class="vc-from-control">
          <span>{{hero.id}}</span>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">用户名</vc-form-label>
        <vc-form-control class="vc-from-control">
          <span v-if="!isEditState">{{hero.name}}</span>
          <vc-input v-if="isEditState" v-model="hero.name" placeholder="输入用户名"
                    autocomplete="on" required></vc-input>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <label class="vc-from-label"></label>
        <vc-form-control class="vc-from-control">
          <vc-button v-if="!isEditState" @click="edit">Edit</vc-button>
          <vc-button v-if="isEditState" @click="save" :disabled="disabledBtn">{{saveTitle}}</vc-button>
          <vc-button @click="cancel" :type="'cancel'">Cancel</vc-button>
        </vc-form-control>
      </vc-form-group>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'hero-detail',
  props: ['navFrom'],
  data () {
    return {
      isEditState: false,
      hero: {},
      saveTitle: 'Save',
      disabledBtn: false,
      navFrom2: ''
    }
  },
  created () {
    // this.navFrom2 = this.$route.query.navFrom
    // this.getHero(this.$route.params.id)
  },
  beforeRouteEnter: function (to, from, next) {
    console.log('beforeRouteEnter')
    console.log(to)
    Vue.axios
      .get('api/advance/heroDetail/' + to.params.id)
      .then(response => {
        next(vm => vm.setHeroData(response.data.hero))
      })
      .catch(error => {
        console.log(error)
        next('/advance')
      })
  },
  beforeRouteUpdate: function (to, from, next) {
    console.log('beforeRouteUpdate')
    console.log(to)
    Vue.axios
      .get('api/advance/heroDetail/' + to.params.id)
      .then(response => {
        this.setHeroData(response.data.hero)
      })
      .catch(error => {
        console.log(error)
        next('/advance')
      })
  },
  beforeRouteLeave: function (to, from, next) {
    console.log('beforeRouteLeave')
    console.log(to)
    next()
  },
  methods: {
    setHeroData: function (hero) {
      this.hero = hero
    },
    getHero: function (id) {
      this.axios
        .get('api/advance/heroDetail/' + id)
        .then(response => {
          this.hero = response.data.hero
        })
        .catch((error) => { // 请求失败处理
          alert(error)
        })
    },
    goback: function () {
      this.$router.go(-1)
    },
    edit: function () {
      this.isEditState = true
    },
    save: function () {
      this.disabledBtn = true
      this.saveTitle = 'Saving...'
      this.axios.put('api/hero/edit/' + this.hero.id, {hero: this.hero})
        .then(res => {
          setTimeout(() => {
            this.saveTitle = 'Save'
            if (this.navFrom === 'dashboard') {
              this.$router.push('/advance/dashboard')
            }
            if (this.navFrom === 'list') {
              this.$router.push('/advance/herolist')
            }
          }, 2000)
        }).catch(error => {
          console.error(error)
          this.saveTitle = 'Save'
          this.disabledBtn = false
        })
    },
    cancel: function () {
      this.goback()
    }
  },
  watch: {
    '$route': function (to, from) {
      // this.getHero(to.params.id)
    }
  }
}
</script>

<style scoped>
  .hero-detail {
    padding: 20px;
  }
  .vc-from-group {
    width: 100%;
  }
  .vc-from-group .vc-from-label {
    width: 20%;
  }
  .vc-from-group .vc-from-control {
    width: 80%;
  }
</style>
