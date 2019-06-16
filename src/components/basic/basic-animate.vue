<template>
  <div class="basicAnimate">
    <div class="form-group">
      <label class="for-input">过渡-no-name</label>
      <div class="input-item">
        <transition>
          <span v-show="show1">我是过渡的动画001号</span>
        </transition>
      </div>
      <span class="input-oper" @click="show1 = !show1">showIt</span>
    </div>
    <div class="form-group">
      <label class="for-input">过渡-with-name</label>
      <div class="input-item">
        <transition name="fade">
          <span v-if="show2">我是过渡的动画002号</span>
        </transition>
      </div>
      <span class="input-oper" @click="show2 = !show2">showIt</span>
    </div>
    <div class="form-group">
      <label class="for-input">过渡-自定义效果</label>
      <div class="input-item">
        <transition name="fade3"  enter-class="bounce-enter" leave-class="bounce-leave"
                    enter-to-class="bounce-enter-to" leave-to-class="bounce-leave-to"
                    enter-active-class="animated bounce-enter-active" leave-active-class="animated bounce-leave-active"
                    :duration="{enter: 1000, leave: 2000}">
          <span v-if="show3" :style="shtyleobj">我是过渡的动画003号</span>
        </transition>
      </div>
      <span class="input-oper" @click="show3 = !show3">showIt</span>
    </div>
    <div class="form-group">
      <label class="for-input">过渡-使用js在过渡钩子里构造动画</label>
      <div class="input-item">
        <transition name="fade4" v-bind:css="false"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter"
                    v-on:enter-cancelled="enterCancelled"
                    v-on:before-leave="beforeLeave"
                    v-on:leave="leave"
                    v-on:after-leave="afterLeave"
                    v-on:leave-cancelled="leaveCancelled">
          <span v-show="show4">我是过渡的动画004号</span>
        </transition>
      </div>
      <span class="input-oper" @click="show4 = !show4">showIt</span>
    </div>
    <div class="form-group">
      <label class="for-input">过渡-初始渲染-once</label>
      <div class="input-item">
        <transition name="fade5"   appear
                    appear-class="fade-enter"
                    appear-to-class="fade-enter-to"
                    appear-active-class="fade-enter-active">
          <span v-if="appear" :style="shtyleobj">我是初始渲染过渡的动画005号</span>
        </transition>
      </div>
      <span class="input-oper" @click="appear = !appear">showIt</span>
    </div>
    <div class="form-group">
      <label class="for-input">过渡-多个元素列表</label>
      <div class="input-item">
        <transition name="save">
          <button :key="isEditing" @click="saveIt">{{saveTitle}}</button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'basicAnimate',
  data () {
    return {
      show1: true,
      show2: true,
      show3: true,
      show4: true,
      shtyleobj: {
        display: 'inline-block',
        width: '200px',
        height: '30px'
      },
      appear: true,
      isEditing: false
    }
  },
  methods: {
    beforeEnter: function (el) {
      console.log('beforeEnter')
    },
    enter: function (el, done) {
      console.log('enter')
      done()
    },
    afterEnter: function (el) {
      console.log('afterEnter')
    },
    enterCancelled: function (el) {
      console.log('enterCancelled')
    },
    beforeLeave: function (el) {
      console.log('beforeLeave')
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    leave: function (el, done) {
      console.log('Leave')
      done()
    },
    afterLeave: function (el) {
      console.log('afterLeave')
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled: function (el) {
      console.log('leaveCancelled')
    },
    saveIt: function () {
      if (this.isEditing) return
      this.isEditing = true
      setTimeout(() => {
        this.isEditing = false
      }, 2000)
    }
  },
  computed: {
    saveTitle: function () {
      return this.isEditing ? 'saving...' : 'save'
    }
  }
}
</script>

<style scoped>
  .form-group {
    width: 600px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .form-group > label {
    width: 25%;
    margin-right: 20px;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .form-group > label.for-input:after {
    content: ":";
  }
  .form-group > .input-item {
    width: 75%;
    color: #666;
    line-height: 32px;
  }
  .form-group .input-item > input {
    width:90%;
    height: 32px;
  }
  .form-group .input-oper {
    color: #009973;
    cursor: pointer;
    margin-right: 10px;
  }
  .form-group .input-item > button {
    background: #3cc;
    padding: 10px 30px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  .v-enter, .v-leave-to {
    opacity: 0;
  }
  .v-enter-to, .v-leave {
    opacity: 1;
  }
  .v-enter-active, .v-leave-active {
    transition: all 1s linear;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    margin-left: -150px;
  }
  .fade-leave-to {
    opacity: 0;
    margin-left: 150px;
  }
  .fade-enter-to, .fade-leave {
    opacity: 1;
    margin-left: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 1s linear;
  }
  .bounce-enter-active {
    animation: bounce-in 1s;
  }
  .bounce-leave-active {
    animation: bounce-in 1s reverse;
  }
  .bounce-enter, .bounce-leave-to {
    color: blue;
  }
  .bounce-enter-to, .bounce-leave {
    color: red
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(2);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  .save-enter, .save-leave-to {
    opacity: 0;
  }
  .save-enter-to, .save-leave {
    opacity: 1;
  }
  .save-enter-active {
    transition: all 1s linear;
  }
  .save-leave-active {
    transition: all 50ms linear;
  }
</style>
