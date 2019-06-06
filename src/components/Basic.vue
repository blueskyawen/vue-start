<template>
  <div class="basic">
    <form>
      <div class="form-group">
        <label>编辑Msg</label>
        <div class="input-item">
          <input v-model.trim="message" placeholder="编辑我……">
        </div>
      </div>
      <div class="form-group">
        <label>{{'多行文本'}}</label>
        <div class="input-item">
          <textarea v-model.lazy="areaMsg" placeholder="多行文本输入……"></textarea>
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
          <span v-for="like in likeList" :key="like">
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
    </form>
    <p>{{formData}}</p>
  </div>
</template>

<script>
export default {
  name: 'Basic',
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
      obj: {}
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
        obj: this.obj
      }
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
</style>
