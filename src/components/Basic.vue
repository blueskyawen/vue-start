<template>
  <div class="basic">
    <form>
      <div class="form-group">
        <label>编辑Msg</label>
        <div class="input-item">
          <input v-model.trim="message" placeholder="编辑我……" v-yc-color="bgColor">
        </div>
      </div>
      <div class="form-group">
        <label>{{'多行文本'}}</label>
        <div class="input-item">
          <textarea v-model.lazy="areaMsg" placeholder="多行文本输入……" v-yc-color:update="bgColor"></textarea>
        </div>
      </div>
      <div class="form-group">
        <label>{{'Age'}}</label>
        <div class="input-item">
          <input type="number" v-model.lazy.number="age" placeholder="输入……" />
        </div>
      </div>
      <div class="form-group">
        <label>Likes</label>
        <div class="input-item">
          <span>
            <input type="checkbox" id="checkAllLikes" v-model="checkAllLikes" @change="checkAllLikess">
            <label for="checkAllLikes">全选</label>
          </span>
          <span v-for="like in likeList" :key="like.value">
            <input type="checkbox" :id="like.value" :value="like.value" v-model="likeNames">
            <label :for="like.value">{{like.key}}</label>
          </span>
        </div>
      </div>
      <div class="form-group">
        <label for="isAggre">{{'Aggrement'}}</label>
        <div class="input-item">
          <span>
            <input type="checkbox" id="isAggre" v-model="isAggre">
          </span>
        </div>
      </div>
      <div class="form-group">
        <label>Sex</label>
        <div class="input-item">
          <span>
            <input type="radio" id="man" value="man" v-model="sex">
            <label for="man">Man</label>
          </span>
          <span>
            <input type="radio" id="woman" value="woman" v-model="sex">
            <label for="woman">Woman</label>
          </span>
        </div>
      </div>
      <div class="form-group">
        <label>City</label>
        <div class="input-item">
          <select v-model="city" name="city">
            <option value="">选择一个</option>
            <option value="shanghai">上海</option>
            <option value="hangzhou">杭州</option>
            <option value="beijing">北京</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Color</label>
        <div class="input-item">
          <input type="color" v-model="bgColor">
        </div>
      </div>
      <div class="form-group">
        <div class="button-item">
          <button @click.prevent="submit()">提交</button>
        </div>
      </div>
    </form>
    <p>{{formData}}</p>
    <div class="zujian">
      <runoob :message="message" :num="age"></runoob>
      <button-counter :prop-c="'232'" v-on:increment="incrementTotal($event)"></button-counter>
      <yc-child :propha="555" @childChange="ycChange"></yc-child>
    </div>
    <div class="donghua">
      <div>
        <transition>
          <span v-show="donghua.show1">我是过渡的动画001号</span>
        </transition>
        <span @click="donghua.show1=!donghua.show1">动画显示切换1</span>
      </div>
      <div>
        <transition name="fade" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled" v-on:before-leave="beforeLeave" v-on:leave="leave" v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled">
          <span v-if="donghua.show2">我是过渡的动画002号</span>
        </transition>
        <span @click="donghua.show2=!donghua.show2">动画显示切换2</span>
      </div>
      <div>
        <transition name="fade3"  enter-class="bounce-enter" leave-class="bounce-leave"
                    enter-to-class="bounce-enter-to" leave-to-class="bounce-leave-to"
                    enter-active-class="animated bounce-enter-active" leave-active-class="animated bounce-leave-active"
        :duration="{enter: 500, leave: 2000}">
          <span v-show="donghua.show3" style="display: inline-block;width: 100px;height:30px;">我是过渡的动画003号</span>
        </transition>
        <span @click="donghua.show3=!donghua.show3">动画显示切换3</span>
      </div>
      <div>
        <transition>
          <button @click="saveIt" v-if="docState === 'saved'" key="saved">
            Edit
          </button>
          <button v-if="docState === 'edited'" key="edited">
            Save
          </button>
          <button v-if="docState === 'editing'" key="editing">
            Cancel
          </button>
        </transition>
      </div>
    </div>
    <div class="hunru">
      <p>当混入的是组建生命钩子函数时，如created,则混入的和原组建生命钩子函数将合并，调用顺序：混入 --》 组件；</p>
      <p>当混入的methods方法时，调用是先搜索组建方法，再搜索混入的方法；所以组件方法调用优先级会高一些</p>
      <button @click="hellworld">method-hello</button>
      <button @click="samemethod">method-samemethod</button>
    </div>
    <div class="setanddel">
      <p>直接使用对象添加删除属性不能出发组件内对象的变化，必须使用VUE的set和delete方法</p>
      <p>{{setanddeltete}}</p>
    </div>
    <div class="axios">
      <p>{{dataInfo}}</p>
      <p style="color: red;">{{errorInfo}}</p>
      <button @click="getHttp">get_data</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
var Child = {
  template: '<div><h1 @click="event2">{{msg}}222</h1><h2>{{propha}}</h2><h3>{{propB}}</h3></div>',
  props: {
    propha: Number,
    propB: {type: String, default: 'propbb'}
  },
  data () {
    return {
      msg: '自定义组件!'
    }
  },
  methods: {
    event2: function () {
      this.$emit('childChange', 99)
    }
  }
}
var mixin = {
  created: function () {
    console.log('混入调用')
  },
  methods: {
    hellworld: function () {
      console.log('混入-HelloWorld 方法')
    },
    samemethod: function () {
      console.log('混入-Mixin：相同方法名')
    }
  }
}
var myproduct = {id: 1, name: 'book', price: 20}
export default {
  name: 'Basic',
  components: {'yc-child': Child},
  mixins: [mixin],
  created: function () {
    console.log('组件调用')
  },
  data () {
    return {
      message: 'Runoob',
      areaMsg: '菜鸟教程\r\nhttp://www.runoob.com',
      age: 18,
      likeNames: ['taobao'],
      likeList: [
        {key: '淘宝', value: 'taobao'}, {key: '京东', value: 'jd'},
        {key: '阿里巴巴', value: 'alibaba'}, {key: '亚马逊', value: 'amazon'},
        {key: '苏宁', value: 'suning'}, {key: '拼多多', value: 'pingdd'}
      ],
      checkAllLikes: false,
      isAggre: true,
      sex: 'man',
      city: 'shanghai',
      obj: {},
      bgColor: '#e6e6e6',
      donghua: {show1: false, show2: true, show3: false},
      docState: 'saved',
      products: myproduct,
      dataInfo: {},
      errorInfo: {}
    }
  },
  computed: {
    formData: function () {
      return {
        message: this.message,
        areaMsg: this.areaMsg,
        likeNames: this.likeNames,
        isAggre: this.isAggre,
        sex: this.sex,
        city: this.city,
        age: this.age,
        obj: this.obj,
        bgColor: this.bgColor
      }
    },
    buttonMessage: function () {
      switch (this.docState) {
        case 'saved': return 'Edit'
        case 'edited': return 'Save'
        case 'editing': return 'Cancel'
      }
    },
    setanddeltete: function () {
      return JSON.stringify(this.products)
    }
  },
  methods: {
    checkAllLikess: function () {
      if (this.checkAllLikes) {
        this.likeNames = this.likeList.map(item => item.value)
        this.obj['hello'] = 'world'
      } else {
        this.likeNames = []
      }
    },
    submit: function () {
      alert(this.formData)
    },
    incrementTotal: function (type) {
      console.log(type)
    },
    ycChange: function (num) {
      console.log('ycchange: ' + num)
    },
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
      this.docState = 'edited'
      setTimeout(() => { this.docState = 'editing' }, 2000)
      setTimeout(() => { this.docState = 'saved' }, 4000)
    },
    samemethod: function () {
      console.log('组件-Main：相同方法名')
      // this.products.qty = 22无效
      // delete (this.products.price)无效
      Vue.set(this.products, 'qty', 22)
      Vue.delete(this.products, 'price')
    },
    getHttp: function () {
      axios
        .get('data01.json')
        .then(response => (this.dataInfo = response))
        .catch(function (error) { // 请求失败处理
          console.log(error)
        })
    }
  },
  watch: {
    likeNames: function () {
      this.checkAllLikes = this.likeNames.length === this.likeList.length
    },
    obj: function () {
      alert('obj hello')
    }
  }
}
</script>

<style scoped>
.form-group {
  width: 420px;
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
.form-group > label:after {
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
.form-group .input-item > span {
  float:left;
  margin-right: 10px;
}
.form-group .input-item > textarea {
  width:90%;
  height: 80px;
  max-height: 120px;
  max-width: 420px;
}
.form-group .input-lint {
  height: 32px;
  line-height: 32px;
  margin:5px 0 5px 100px;
}
.form-group .button-item {
  height: 32px;
  line-height: 32px;
  margin:5px 0 5px 100px;
}
.v-enter, .v-leave-to {
  opacity: 0;
  margin-left: -80px;
}
.v-enter-to, .v-leave {
  opacity: 1;
  margin-left: 0;
}
.v-enter-active, .v-leave-active {
  transition: all 1s linear;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  margin-left: -80px;
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
</style>
