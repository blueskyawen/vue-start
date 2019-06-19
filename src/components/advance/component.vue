<template>
  <div class="component">
    <form :style="{width: width}">
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">用户名</vc-form-label>
        <vc-form-control class="vc-from-control">
          <vc-input v-model="name"></vc-input>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">密码</vc-form-label>
        <vc-form-control class="vc-from-control">
          <vc-input type="password" v-model="password"></vc-input>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">数量</vc-form-label>
        <vc-form-control class="vc-from-control">
          <vc-input type="number" v-model="num"></vc-input>
        </vc-form-control>
      </vc-form-group>
      <vc-form-group class="vc-from-group">
        <vc-form-label class="vc-from-label">文本域</vc-form-label>
        <vc-form-control class="vc-from-control">
          <vc-textarea v-model="description"></vc-textarea>
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
import vcinput from '@/components/share/vc-input'
import vctextarea from '@/components/share/vc-textarea'
import vcformgroup from '@/components/share/vc-form-group'
import vcformcontrol from '@/components/share/vc-form-control'
import vcformlabel from '@/components/share/vc-form-label'
import vcbutton from '@/components/share/vc-button'
import vcradio from '@/components/share/vc-radio'
import vccheckbox from '@/components/share/vc-checkbox'
import vcmutilcheckbox from '@/components/share/vc-mutil-checkbox'

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
        {value: 'pid', name: '猪肉', checked: false},
        {value: 'apple', name: '苹果', checked: false}
      ],
      selectedLikes: ['fish']
    }
  },
  components: {
    'vc-input': vcinput,
    'vc-textarea': vctextarea,
    'vc-form-group': vcformgroup,
    'vc-form-control': vcformcontrol,
    'vc-form-label': vcformlabel,
    'vc-button': vcbutton,
    'vc-radio': vcradio,
    'vc-checkbox': vccheckbox,
    'vc-mutil-checkbox': vcmutilcheckbox
  },
  computed: {
    dataInfo: function () {
      return this.$data
    }
  },
  methods: {
    login: function () {
      alert('===login===')
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
</style>
