<template>
  <div class="wrap">
    <header>
      <div class="navbar">
        <div class="navbarHeader">
          <a href="http://blog.lj661.cn" class="navbarTitle" title="社团名">CERT</a>
        </div>
        <div class="navbarContent">
          <ul class="navbarItem">
            <li v-for="item in navItem">
              <router-link :to="item.router">
                <i class="iconfont" :class="item.icon"></i>
                {{item.name}}
              </router-link>
              <li>
                <a href="javascript:;" @click="logOut()">
                  <i class="iconfont icon-fanhui"></i>退出</a>
              </li>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <main class="mainContent">
      <div class="mainSidebar">
        <ul class="sidebarItem sidebarTop">
          <li v-for="item in topItem">
            <router-link :to="item.router">
              <i class="iconfont" :class="item.icon"></i>
              {{item.name}}
            </router-link>
          </li>
        </ul>
  
        <ul class="sidebarItem">
          <li v-for="item in bottomItem">
            <router-link :to="item.router">
              <i class="iconfont" :class="item.icon"></i>
              {{item.name}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="content">
  
        <slot name="content">
  
        </slot>
      </div>
    </main>
    <footer>
      技术支持：CERT 联系方式：JL@lj661.cn
    </footer>
  </div>
</template>
<style lang="stylus">
@import "../assets/styles/common.styl"
@import "../assets/styles/icons/iconfont.css"
  
</style>
<script>
export default {
  name: 'home',
  data() {
    return {
      navItem: [
        { icon: "icon-geren", router: "", name: "" },
      ],
      topItem: [
        { icon: "icon-bianji", router: "/famous", name: "名人堂" },
        { icon: "icon-xinxi", router: "/works", name: "作品集" },
        { icon: "icon-process", router: "/photo", name: "社团照" },
        { icon: "icon-geren", router: "/fresh", name: "新生报名" }
      ],
      bottomItem: [
        { icon: "icon-orderlisto", router: "/advice", name: "建议反馈" },
      ],
      isLoginApi: "http://lj661.cn:8000/isLogin/"
    }
  },
  methods: {
    logOut() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.$router.push({ path: "/" });
    },
  },
  created() {
    this.navItem[0].name = window.localStorage.getItem("user"); //通过判断localStroage 是否存在token 来判断登录状态
    if (window.localStorage.getItem("token")) { //如果存在token 则判断token是否过期
      this.$http.post(this.isLoginApi, { token: window.localStorage.getItem("token") }).then((res) => {
        if (res.data.status == 404) {
          this.$router.push({ path: "/" })
        }
      })
    }else{
      this.$router.push({ path: "/" })
    }



  }
}
</script>