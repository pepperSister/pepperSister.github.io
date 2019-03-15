<template>
  <home>
    <div class="itemList" slot="content">
      <div class="pageTitle">
        <h2>名人堂</h2>
        <button class="btnLogin" @click="addFamous()">添加</button>
      </div>
  
      <div class="layer" v-show="layerShow">
        <div class="addInfo">
          <div class="layerHeader">
            <div class="layerTitle">
              添加信息
              <div class="cancel">
                <div class="icon layerIcon" @click="cancel()"></div>
              </div>
            </div>
  
          </div>
          <div class="layerContent">
            <form class="addInfoForm" enctype='multipart/form-data' action="javascript: void(0);">
              <div class="inputLine">
                <label for="">学长姓名</label>
                <input type="text" name="addName" placeholder="请输入学长姓名" v-model="addName">
              </div>
              <div class="inputLine">
                <label for="">学长照片</label>
                <uploadImg inputName="addImg" v-on:upload="setImgSrc"></uploadImg>
  
              </div>
              <div class="inputLine">
                <label for="">学长简介</label>
                <textarea class="itemInfo" name="addInfo" v-model="addInfo"></textarea>
              </div>
              <div class="inputLine">
                <label for="">学长寄语</label>
                <textarea class="itemDescribe" name="addDescribe" v-model="addDescribe"></textarea>
              </div>
              <div class="inputLine">
                <button @click="upload()">提交</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="toast" v-show="toastShow">
        <p class="toastContent">{{toast}}成功</p>
      </div>
      <table class="tableBox">
        <tr class="tableLine tableHead">
          <th>序号</th>
          <th class="itemName">学长名字</th>
          <th class="itemInfo">学长简介</th>
          <th class="itemImg">学长照片</th>
          <th class="itemDescribe">学长寄语</th>
          <th class="itemBtn">操作</th>
        </tr>
        <tr class="tableLine" v-if="listItem.length == 0">
          <td colspan="6">无信息</td>
        </tr>
        <tr class="tableLine tableMain" v-for="(item,index) in pageItem">
          <td>{{ index+1 }}</td>
          <td>{{item.name}}</td>
          <td>{{item.info}}</td>
          <td>
            <img :src="item.src" alt="" class="showImg">
          </td>
          <td>
            {{item.describle}}
          </td>
          <td class="itemImg">
            <button class="btnFix" @click="fix(item.num)">修改</button>
            <button class="btnDel" @click="del(item.num)">删除</button>
          </td>
        </tr>
      </table>
      <div class="pageBox" v-if="pageCount >= 2">
        <button class="btnPage btnLast" @click="pageLast()">上一页</button>
        <div class="btnGroup">
          <button class="btnPage" v-for="(page,index) in pageCount" @click="select(index)">{{index+1}}</button>
        </div>
        <button class="btnPage btnNext" @click="pageNext()">下一页</button>
      </div>
    </div>
  </home>
</template>
<style lang="stylus">
@import "../assets/styles/icons/iconfont.css"
.layerIcon:before,.layerIcon:after
  background red!important
</style>
<script>
import home from "../common/home.vue"
import uploadImg from "../common/uploadImg.vue"
export default {
  name: 'addInfo',
  components: { home, uploadImg },
  data() {
    return {
      listItem: [],
      pageCount: "",
      pageItem: [],
      pageIndex: "",
      pageNum: 4,
      layerShow: false,
      addDescribe: '',
      addName: '',
      addInfo: '',
      postURL: "http://lj661.cn:8000/famous/",
      addImg: {},
      toast: "",
      toastShow: false
    }
  },
  methods: {
    page() { //分页功能
      this.pageCount = Math.ceil(this.listItem.length / 4);
    },
    pageLast() { //上一页
      if (this.pageIndex > 1) {

        let start = (this.pageIndex - 2) * this.pageNum;
        let end = ((this.pageIndex - 1) * this.pageNum);
        this.pageItem = this.listItem.slice(start, end);
        this.pageIndex -= 1;
        console.log("index" + this.pageIndex, "start" + start, "end" + end, "pageItem" + this.pageItem);
      }

    },
    select(index) {
      this.pageIndex = index;
      let start = this.pageIndex * this.pageNum;
      let end = ((this.pageIndex + 1) * this.pageNum);
      this.pageItem = this.listItem.slice(start, end);
      console.log("index" + this.pageIndex, "start" + start, "end" + end, "pageItem" + this.pageItem);
    },
    pageNext() {//下一页
      if (this.pageIndex < this.pageCount) {
        let start = this.pageIndex * this.pageNum;
        let end = ((this.pageIndex + 1) * this.pageNum);
        this.pageIndex += 1;
        this.pageItem = this.listItem.slice(start, end);
        console.log("index" + this.pageIndex, "start" + start, "end" + end, "pageItem" + this.pageItem);
      }
    },
    validate(data) { //验证登录
      if (data == 404) {
        this.$router.push({ path: "/" });
        window.localStorage.removeItem("token");
        this.showToast("token验证失败,请重新登录");
      }
    },
    setImgSrc(value, file) { //通过setImgSrc 获取上传的图片的file对象
      this.addImg = file;
    },
    addFamous() { //改变layerShow 的布尔值来实现弹出框的出现和消失
      this.layerShow = !this.layerShow;
    },
    cancel() {
      this.layerShow = !this.layerShow;
    },
    upload() {
      const formData = new FormData() //新建一个formData类型 因为需要添加文件，所以选用formData
      formData.append('file', this.addImg);
      formData.append('addName', this.addName);
      formData.append("addInfo", this.addInfo);
      formData.append("addDescribe", this.addDescribe);
      formData.append("token", window.localStorage.getItem("token"));
      let config = {
        header: { 'Content-type': 'application/x-www-form-urlencoded' }
      };
      if (this.addImg) {
        this.$http.post(this.postURL, formData, config).then((res) => {

          if (res.status == 200) {
            this.layerShow = !this.layerShow;
            this.getInfo();//获取信息
            this.showToast("添加"); //给吐司条传递信息
          } else {
            this.$router.push({ path: "/" });
            window.localStorage.removeItem("token");
          }
        });
      }
    },
    showToast(value, time = 800) {//吐司条 
      this.toastShow = !this.toastShow;
      this.toast = value;
      let that = this;
      setTimeout(function () { that.toastShow = !that.toastShow }, time);
    },
    getInfo() {//通过GET方法来获得数据，每次都清空listItem 并更新listItem 数据驱动组件更新
      this.$http.get(this.postURL, { params: { token: window.localStorage.getItem("token") } }).then(res => {
        if (res.data.status == 404) {
          this.$router.push({ path: "/" });
          window.localStorage.removeItem("token");
        } else if (res.data.status == 200) {
          this.listItem = [];
          res.data.data.forEach((item) => {
            this.listItem.push(item);
          }, this);
          this.pageIndex = 1;
          this.pageItem = this.listItem.slice(0, this.pageNum);
          this.page();
        }
      })
    },
    del(num) {
      this.$http.patch(this.postURL, { "data": num, "token": window.localStorage.getItem("token") }).then(res => {
        if (res.data.status == 200) {
          this.getInfo();
          this.showToast("删除");
        } else if (res.data.status == 404) {
          this.$router.push({ path: "/" });
          window.localStorage.removeItem("token");
        }
      })
    }
  },
  created() {
    this.getInfo();
  }
}
</script>