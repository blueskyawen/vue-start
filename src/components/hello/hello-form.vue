<template>
  <div class="helloForm">
    <form>
      <div class="form-group">
        <label class="for-input">message</label>
        <div class="input-item">
          <input type="text" v-model.trim="message" />
        </div>
      </div>
      <div class="form-group">
        <label class="for-input">{{'areaMsg'}}</label>
        <div class="input-item">
          <textarea v-model.lazy="areaMsg" placeholder="多行文本输入……"></textarea>
        </div>
      </div>
      <div class="form-group">
        <label class="for-input">{{'Age'}}</label>
        <div class="input-item">
          <input type="number" v-model.lazy.number="age" placeholder="输入……" />
        </div>
      </div>
      <div class="form-group">
        <label for="isAggre" class="for-input">{{'Aggrement'}}</label>
        <div class="input-item">
          <span>
            <input type="checkbox" id="isAggre" v-model="isAggre" />
          </span>
        </div>
      </div>
      <div class="form-group">
        <label class="for-input">{{'Likes'}}</label>
        <div class="text-items">
          <div>
            <span>
              <input type="checkbox" id="checkAllLikes" v-model="checkAllLikes" @change="checkAllLikess">
              <label for="checkAllLikes">全选</label>
            </span>
          </div>
          <div>
            <span class="check-item" v-for="like in likeList" :key="like.value">
              <input type="checkbox" :id="like.value" :value="like.value" v-model="likeNames">
              <label :for="like.value">{{like.key}}</label>
            </span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="for-input">Sex</label>
        <div class="text-items">
          <div>
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
      </div>
      <div class="form-group">
        <label class="for-input">City</label>
        <div class="input-item">
          <select v-model="city" name="city">
            <option disabled value="">选择一个</option>
            <option value="shanghai">上海</option>
            <option value="hangzhou">杭州</option>
            <option value="beijing">北京</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="for-input">mutil Citys</label>
        <div class="input-item">
          <select v-model="mutilcitys" name="city" multiple>
            <option disabled value="">选择一个</option>
            <option>上海</option>
            <option>杭州</option>
            <option>北京</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Color</label>
        <div class="input-item">
          <input type="color" v-model="bgColor">
        </div>
      </div>
      <div class="fenge"></div>
      <h4>绑定到动态属性，属性的值可以不是字符串</h4>
      <div class="form-group">
        <label for="isLoveFish" class="for-input">isLoveFish</label>
        <div class="input-item">
          <span>
            <input type="checkbox" id="isLoveFish" v-model="isLoveFish" true-value="Yes" false-value="No" />
          </span>
        </div>
      </div>
      <div class="form-group">
        <label for="isLoveFish" class="for-input">Like-bind-object</label>
        <div class="input-item">
          <select v-model="objLike" name="Likes">
            <option disabled value="">选择一个</option>
            <option v-for="item of likeList" :key="item.value" :value="item">{{item.key}}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label></label>
        <div class="input-item">
          <button @click.prevent="submit">提交</button>
        </div>
      </div>
    </form>
    <p>{{formData}}</p>
  </div>
</template>

<script>
export default {
  name: 'helloForm',
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
      mutilcitys: [],
      obj: {},
      bgColor: '#e6e6e6',
      // Yes or No
      isLoveFish: 'Yes',
      objLike: {}
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
        bgColor: this.bgColor,
        mutilcitys: this.mutilcitys,
        isLoveFish: this.isLoveFish,
        objLike: this.objLike
      }
    }
  },
  watch: {
    likeNames: function () {
      this.checkAllLikes = this.likeNames.length === this.likeList.length
    }
  },
  methods: {
    checkAllLikess: function () {
      if (this.checkAllLikes) {
        this.likeNames = this.likeList.map(item => item.value)
      } else {
        this.likeNames = []
      }
    },
    submit: function (event) {
      alert(JSON.stringify(this.formData, null, 4))
      if (event) {
        console.log(event.target.tagName)
      }
      console.log(this.$data)
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
  .form-group .input-item > textarea {
    width:90%;
    height: 80px;
    max-height: 130px;
    min-width: 150px;
  }
  .form-group .input-item > span {
    float:left;
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
  .form-group .input-oper {
    color: #009973;
    cursor: pointer;
    margin-right: 10px;
  }
  .form-group > .text-items {
    width: 75%;
    color: #666;
    line-height: 26px;
    display: flex;
    flex-direction: column;
  }
  .form-group > .text-items > div .check-item {
    float: left;
    margin-right: 20px;
  }
  form .fenge {
    width: 100%;
    height: 3px;
    margin-bottom: 3px;
    border-bottom: dashed 1px #999;
  }
</style>
