<template>
  <div class="loginBox" @keyup.enter="register">
    <div class="loginTitle">
      <h2>CERT</h2>
      <h3>专注IT技术、服务交大师生</h3>
    </div>
    <div class="inputLine">
      <input type="text" placeholder="请输入手机号码" v-model="phone" ref="phone">
    </div>
  
    <div class="inputLine">
      <input type="password" placeholder="请输入密码" v-model="password" ref="password">
      <input type="hidden" :value="token">
    </div>
    <div class="inputLine">
      <input type="password" placeholder="请再次输入密码" v-model="repeatPassword" :class="pwdInput" ref="repeatPassword" @blur="complex()" @keyup="pwdChangeErr">
      <input type="hidden" :value="token">
    </div>
    <div class="checkLine" v-show="!pwdValidation">
      <span class="inputErr">两次输入的密码不同</span>
    </div>
    <div class="inputLine">
      <input type="text" placeholder="请输入注册码" v-model="registerCode" ref="registerCode" :class="regInput" @keyup="regChangeErr">
      <input type="hidden" :value="token">
    </div>
    <div class="checkLine" v-show="!validation">
      <span class="inputErr">注册码或账号错误</span>
    </div>
    <div class="btnLine">
      <button class="btnRegist" @click="register">注册</button>
    </div>
  </div>
</template>
<style lang="stylus">

</style>
<script>
export default {
  name: 'Register',
  data() {
    return {
      validation: true,
      phone: '',
      password: '',
      token: '',
      registerCode: '',
      registerApi: '/register/',
      regfocusStatus: false,
      pwdfocusStatus: false,
      pwdInput: '',
      regInput: '',
      repeatPassword: '',
      pwdValidation: true
    }
  },
  methods: {
    complex() {
      if (this.password != this.repeatPassword) {
        this.pwdValidation = false
        this.$refs.repeatPassword.focus(this.pwdfocusStatus)
      }
    },
    validate(status) { //检测密码是否正确 尚未完成
      if (status == 200 && pwdValidation) { //如果状态码为200，则通过验证，跳转页面
        this.$router.push({ name: "Hello", params: { userID: this.phone } })
      } else if (status == 404) {//如果状态码为404，密码错误，输入框变红，提示信息出现
        this.validation = false
        this.input = "inputErr"
        this.focusStatus = true
        this.$refs.password.focus(this.focusStatus);
      }
    },
    regChangeErr() {//改变input 值
      this.regfocusStatus = true
      if (this.focusStatus) {
        this.regInput = ""
        this.validation = true
      }
    },
    pwdChangeErr() {
      this.pwdfocusStatus = true
      if (this.pwdfocusStatus) {
        this.pwdInput = ""
        this.pwdValidation = true
      }
    },
    register() {
      var vm = this;
      vm.$http.post(this.registerApi, {
        phone: this.phone,
        password: this.password,
        registerCode: this.registerCode,
        token: this.token
      }, {}).then((response) => {

        this.validate(response.data.status)
      })
    }
  },
  created() {

    this.$http.post(this.registerApi, {

    }, {}).then((response) => {
      this.token = response.data.token
    });
  }
}
</script>