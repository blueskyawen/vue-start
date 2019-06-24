<template>
  <div class="basicAnimate">
    <h3>过渡</h3>
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
      <label class="for-input">过渡-使用js在过渡钩子里构造动画---待补充/到多组件了</label>
      <div class="input-item">
        <transition name="fade4"
                    v-bind:css="false"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter"
                    v-on:enter-cancelled="enterCancelled"
                    v-on:before-leave="beforeLeave"
                    v-on:leave="leave"
                    v-on:after-leave="afterLeave"
                    v-on:leave-cancelled="leaveCancelled">
          <span class="voly" v-if="show4">我是过渡的动画004号</span>
        </transition>
      </div>
      <span class="input-oper" @click="show4 = !show4">showIt</span>
    </div>
    <div class="form-group">
      <label class="for-input">过渡-初始渲染-once</label>
      <div class="input-item">
        <transition name="fade5" appear
                    appear-class="fade-enter"
                    appear-to-class="fade-enter-to"
                    appear-active-class="fade-enter-active">
          <span v-if="appear" :style="shtyleobj">我是初始渲染过渡的动画005号</span>
        </transition>
      </div>
      <div class="input-item">
        <transition appear>
          <span v-if="appear" :style="shtyleobj">我是初始渲染过渡的动画00500号</span>
        </transition>
      </div>
      <span class="input-oper" @click="appear = !appear">showIt</span>
    </div>
    <div class="form-group">
      <label class="for-input">过渡-多个元素列表-mode(out-in)</label>
      <div class="input-item">
        <transition name="save" mode="out-in">
          <button :key="isEditing" @click="saveIt">{{saveTitle}}</button>
        </transition>
      </div>
    </div>
    <h3>列表过渡</h3>
    <div class="form-group" style="display: flex;flex-direction: column">
      <label class="for-input">列表元素过渡</label>
      <div class="input-item">
        <transition-group name="numList">
          <span class="numItem" v-for="item in items" :key="item">{{item}}</span>
        </transition-group>
      </div>
      <div class="input-item" style="margin-top: 30px">
        <button @click="addNum">addNum</button>
        <button @click="removeNum">removeNum</button>
        <button v-on:click="reserve">reserve</button>
      </div>
      <div class="fenge"></div>
      <div class="input-item">
        <div>nums大于: <input type="number" v-model.number="num3" /></div>
        <transition-group name="numList">
          <span class="numItem" v-for="item in getNumList" :key="item">{{item}}</span>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'

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
      isEditing: false,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,
      num3: 4
    }
  },
  methods: {
    beforeEnter: function (el) {
      console.log('beforeEnter')
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      console.log('enter')
      Velocity(el, { opacity: 1, fontSize: '2.4em', color: '#ff33bb' }, { duration: 1000 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
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
      Velocity(el, { translateX: '15px', rotateZ: '50deg', color: '#3399ff' }, { duration: 1000 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, { complete: done })
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
    },
    addNum: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    removeNum: function () {
      this.items.splice(this.randomIndex(), 1)
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    reserve: function () {
      this.items.reverse()
    }
  },
  computed: {
    saveTitle: function () {
      return this.isEditing ? 'saving...' : 'save'
    },
    getNumList: function () {
      return this.items.filter(item => item > this.num3)
    }
  }
}
</script>

<style scoped>
  h3 {
    font-size: 24px;
    color: #000080;
    margin-bottom: 5px;
    font-weight: 600;
  }
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
  .form-group > .input-item .voly {
    display: inline-block;
    transform: scale(1);
  }
  .form-group .input-item > input {
    width:90%;
    height: 32px;
  }
  .form-group .input-item .numItem {
    display: inline-block;
    float: left;
    padding: 5px 20px;
    border: solid 1px #e6e6e6;
    border-radius: 2px;
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
  .fenge {
    width: 100%;
    height: 3px;
    margin-bottom: 3px;
    border-bottom: dashed 1px #999;
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
    transition: all 1s linear;
  }
  .v-appear {
    opacity: 0;
  }
  .v-appear-to {
    opacity: 1;
  }
  .v-appear-active {
    transition: all 3s linear;
  }
  .numList-enter-active, .numList-leave-active {
    transition: all 1s;
    position: absolute;
  }
  .numList-enter, .numList-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .numList-move {
    transition: transform 1s;
  }
</style>
