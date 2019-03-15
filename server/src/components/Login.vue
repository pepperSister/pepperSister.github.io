<template>
  <div class="loginBox" @keyup.enter="login">
    <div class="loginTitle">
      <h2>CERT</h2>
      <h3>专注IT技术、服务交大师生</h3>
    </div>
    <div class="inputLine">
      <input type="text" placeholder="请输入账号" v-model="account" ref="account">
    </div>
  
    <div class="inputLine">
      <input type="password" placeholder="请输入密码" v-model="password" ref="password" :class="input" @keyup="changeErr">
    </div>
    <div class="checkLine" v-show="!validation">
      <span class="inputErr">名字或密码错误</span>
    </div>
    <div class="checkLine">
      <span class="checkboxBorder" @click="select">
        <span :class="checkboxInside">
        </span>
        <input type="checkbox" class="rememberMe" v-model="remember">
      </span>
      <span class="checkboxWord">记住密码</span>
    </div>
    <div class="btnLine">
      <button class="btnLogin" @click="login">登录</button>
      <button class="btnRegist" @click="register">注册</button>
    </div>
  </div>
</template>

<style lang="stylus">
  @import "../assets/styles/common.styl"
  .loginBox
    border-radius: 5px
    -moz-border-radius: 5px
    background-clip: padding-box
    margin: 0px auto
    width: 350px
    padding: 15px 35px 15px
    background: #fff
    border: 1px solid #eaeaea
    box-shadow: 0 0 25px #cac6c6
    font-size: fontSize * 1.3

  .loginTitle
    font-size: fontSize * 1.6
    padding-bottom: 15px
    h2
      text-shadow: 0px 0px 5px rgba(106, 210, 119, 0.37)

  .btnRegist
    background-color: rgba(106, 210, 119, 1) 
    &:hover
      background-color: #4dc35c
      border-color: #4dc35c

  .checkboxBorder,.checkboxInside,.inside
    cursor: pointer
    display: inline-block
    position: relative
    white-space: nowrap

  .rememberMe
    opacity 0
  .checkboxBorder
    width 18px
    height 20px
    outline 0
    border:1px solid btnColor
    border-radius: 3px
    margin-right: 5px 
    line-height: 1;
    vertical-align: middle;
  .checkboxInside
    width 18px
    height 20px
    background-color: btnColor
    &:after
      content:""
      display:block
      margin: 3px auto
      width:4px
      height: 8px
      border-right:2px white solid
      border-bottom: 2px white solid
      transform: rotateZ(50deg)
  .checkboxWord
    font-size: fontSize * 1.1
    vertical-align: middle
    font-weight: bold

    

</style>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      account: '', //账号
      password: '', //密码 
      input: '',     //input 框class
      remember: false, //记住我
      checkboxInside: 'inside', //checkbox 的内部
      validation: true, //是否验证
      focusStatus: false, //密码框是否选中,
      loginApi: 'http://lj661.cn:8000/login/',//登录的URL
      isLoginApi: "http://lj661.cn:8000/isLogin/"//判断登录状态的URL
    }
  },
  methods: {
    validate(data) { //检测密码是否正确 尚未完成
      if (data.status == 200) { //如果状态码为200，则通过验证，跳转页面
        this.$store.commit("isLogin", { name: data.name, token: data.token });
        window.localStorage.setItem("token", data.token); //设置localStroage token
        window.localStorage.setItem("user", data.name); //设置localStroage user
        this.$router.push({ path: "/famous" })
      } else if (data.status == 404) {//如果状态码为404，密码错误，输入框变红，提示信息出现
        this.validation = false
        this.input = "inputErr"
        this.focusStatus = true
        this.$refs.password.focus(this.focusStatus);
      }
    },
    changeErr() {//改变input 值
      this.focusStatus = true
      if (this.focusStatus) {
        this.input = ""
        this.validation = true
      }
    },
    login() { //登录
      let pwd = this.password
      let account = this.account
      let time;
      if (this.remember) {
        time = new Date().getTime() + 7 * 3600 * 24 * 1000 //记住我 设置token 有效时限 为 30天
      } else {
        time = new Date().getTime() + 3600 * 0.5 * 1000 // token有效时间为 30分钟
      }

      this.$http.post(this.loginApi, { //提交密码账号
        username: account,
        password: pwd,
        remember: this.remember,
        "time": time
      }, {}).then((response) => {//成功后验证
        this.validate(response.data)
      })
    },
    select() { //设置cookie
      this.checkboxInside = (this.checkboxInside == "inside") ? "checkboxInside" : "inside" //改变checkboxInside 的Class
      this.remember = (this.remember) ? false : true //改变remember的值
    },
    register() {
      this.$router.push({ path: "/Register" })
    }
  },
  create() {
    if (window.localStorage.getItem("token")) { //create的时候判断token是否有效
      this.$http.post(this.isLoginApi, { token: window.localStorage.getItem("token") }).then((res) => {
        this.validate(res.body)
      })
    }

  }
}
</script>
