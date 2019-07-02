<template>
  <div class="add-hero">
    <vc-form-group class="vc-from-group">
      <vc-form-label class="vc-from-label">Name</vc-form-label>
      <vc-form-control class="vc-from-control">
        <vc-input v-model="name" placeholder="输入用户名" autocomplete="on" required></vc-input>
      </vc-form-control>
    </vc-form-group>
    <vc-form-group class="vc-from-group">
      <label class="vc-from-label"></label>
      <vc-form-control class="vc-from-control">
        <transition name="save" mode="out-in">
          <vc-button @click="addH" :key="!disabledBtn" :disabled="disabledBtn">{{addTitle}}</vc-button>
        </transition>
        <vc-button @click="cancel" :type="'cancel'">Cancel</vc-button>
      </vc-form-control>
    </vc-form-group>
  </div>
</template>

<script>
export default {
  name: 'add-hero',
  data () {
    return {
      name: '',
      addTitle: 'Add',
      disabledBtn: false
    }
  },
  beforeRouteLeave: function (to, from, next) {
    if (this.name) {
      const answer = window.confirm('Do you really want to leave?')
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  methods: {
    addH: function () {
      this.disabledBtn = true
      this.addTitle = 'Adding...'
      this.axios.post('api/advance/heros/add', {name: this.name})
        .then(res => {
          setTimeout(() => {
            this.addTitle = 'Add'
            this.goback()
          }, 2000)
        }).catch(error => {
          console.error(error)
          this.addTitle = 'Save'
          this.disabledBtn = false
        })
    },
    cancel: function () {
      this.goback()
    },
    goback: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .add-hero {
    width: 600px;
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
  .save-enter, .save-leave-to {
    opacity: 0;
  }
  .save-enter-to, .save-leave {
    opacity: 1;
  }
  .save-enter-active {
    transition: opacity 1s linear;
  }
  .save-leave-active {
    transition: opacity 1s linear;
  }
</style>
