<template>
  <div class="component">
    <form :style="{width: width}">
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">用户名</vc-form-label>
        <vc-form-control class="vc-from-control">
          <vc-input v-model="name" placeholder="输入用户名" autocomplete="on" required></vc-input>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">密码</vc-form-label>
        <vc-form-control class="vc-from-control">
          <vc-input type="password" v-model="password" placeholder="输入密码" autocomplete="off" required>
          </vc-input>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">数量</vc-form-label>
        <vc-form-control class="vc-from-control">
          <vc-input type="number" v-model="num" required></vc-input>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">文本域</vc-form-label>
        <vc-form-control class="vc-from-control">
          <vc-textarea v-model="description" placeholder="输入文本"></vc-textarea>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">My Friend</vc-form-label>
        <vc-form-control class="vc-from-control">
          <vc-radio :options="checkOptions" v-model="myfriend"></vc-radio>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">Like Fish</vc-form-label>
        <vc-form-control class="vc-from-control">
          <vc-checkbox v-model="likeFish"></vc-checkbox>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">食物</vc-form-label>
        <vc-form-control class="vc-from-control">
          <vc-checkbox v-for="like in likes" v-model="like.checked" style="margin-right: 20px"
                       :value="like.name" :key="like.value"></vc-checkbox>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">食物2</vc-form-label>
        <vc-form-control class="vc-from-control">
          <vc-mutil-checkbox v-model="selectedLikes" :options="likes2"></vc-mutil-checkbox>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">是否同意</vc-form-label>
        <vc-form-control class="vc-from-control">
          <vc-switch v-model="isAggre[0]"></vc-switch>
          <vc-switch v-model="isAggre[1]" :tip-labels="['是','否']"></vc-switch>
          <vc-switch v-model="isAggre[2]" :type="'min'" :disabled="true"></vc-switch>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">虚拟滚动</vc-form-label>
        <vc-form-control class="vc-from-control">
          <div class="list-group" @scroll="handleScroll()">
            <div class="list-item" v-for="num of virtualNums" :key="num">{{num}}</div>
          </div>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <label class="vc-from-label"></label>
        <vc-form-control class="vc-from-control">
          <vc-button @click="login">登录</vc-button>
        </vc-form-control>
      </vc-form-group>
    </form>
    <p>{{dataInfo}}</p>
  </div>
</template>

<script>
export default {
  name: 'component',
  data () {
    return {
      name: 'Jack',
      password: '',
      num: '18',
      description: '',
      width: '600px',
      checkOptions: [
        {label: '何炅', value: 'hejiong', disabled: false},
        {label: '黄磊', value: 'huanlei', disabled: false},
        {label: '大华', value: 'dahua', disabled: true}
      ],
      myfriend: 'huanlei',
      likeFish: true,
      likes: [
        {value: 'fish', name: '鱼肉', checked: false},
        {value: 'pid', name: '猪肉', checked: false},
        {value: 'apple', name: '苹果', checked: false}
      ],
      likes2: [
        {value: 'fish', name: '鱼肉', checked: false},
        {value: 'pig', name: '猪肉', checked: false},
        {value: 'apple', name: '苹果', checked: false},
        {value: 'duck', name: '烤鸭', checked: false},
        {value: 'watermelon', name: '西瓜', checked: false}
      ],
      selectedLikes: ['fish'],
      isAggre: [true, false, true],
      numList: [],
      virtualNums: []
    }
  },
  created: function () {
    for (let i = 0; i < 1000; i++) {
      this.numList.push(i)
    }
  },
  computed: {
    dataInfo: function () {
      return this.$data
    }
  },
  methods: {
    login: function () {
      alert('===login===')
    },
    handleScroll: function (e) {
      console.log(e.target.nodeName)
    }
  }
}
</script>

<style scoped>
  .vc-from-group {
    width: 100%;
  }
  .vc-from-group .vc-from-label {
    width: 20%;
  }
  .vc-from-group .vc-from-control {
    width: 80%;
  }
  .list-group {
    height: 200px;
    border: solid 1px #666;
    overflow-y: auto;
  }
  .list-group .list-item {
    height: 30px;
    border-top: solid 1px #999;
    line-height: 30px;
    padding-left: 30px;
    box-sizing: border-box;
  }
  .list-group .list-item:first-child {
    border-top: none;
  }
</style>
