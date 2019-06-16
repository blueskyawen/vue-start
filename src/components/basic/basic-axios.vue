<template>
  <div class="basicAxios">
    <div class="form-group">
      <label>axios-get</label>
      <div class="input-item">
        <button @click.stop="getHttp()">Get</button>
      </div>
    </div>
    <p>{{rspInfo}}</p>
    <p style="color: red">{{errInfo}}</p>
  </div>
</template>

<script>
export default {
  name: 'basicAxios',
  data () {
    return {
      rspInfo: {},
      errInfo: {}
    }
  },
  methods: {
    getHttp: function () {
      this.axios
        .get('data01.json')
        .then(response => (this.dataInfo = response))
        .catch((error) => { // 请求失败处理
          this.errInfo = error
        })
      /* Vue.axios.get(api).then((response) => {
        console.log(response.data)
      })

      this.axios.get(api).then((response) => {
        console.log(response.data)
      })

      this.$http.get(api).then((response) => {
        console.log(response.data)
      }) */
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
</style>
