<template>
  <home>
    <div class="itemList" slot="content">
      <div class="pageTitle">
        <h2>作品集</h2>
        <button class="btnLogin" @click="addWorks">添加</button>
        <!--@click="addPhoto" -->
      </div>
      <div class="toast" v-show="toastShow">
        <p class="toastContent">{{toast}}成功</p>
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
                <label for="">作品名字</label>
                <input type="text" name="worksName" placeholder="请输入作品名" v-model="worksName">
              </div>
              <div class="inputLine">
                <label for="">作品效果图</label>
                <uploadImg inputName="worksImg" v-on:upload="setImgSrc"></uploadImg>
  
              </div>
              <div class="inputLine">
                <label for="">作品简介</label>
                <textarea class="itemDescribe" name="worksDescribe" placeholder="请输入对作品简介" v-model="worksDescribe"></textarea>
              </div>
              <div class="inputLine">
                <label for="">作品作者</label>
                <input type="text" name="worksName" placeholder="请输入作者姓名" v-model="worksAuthor">
              </div>
              <div class="inputLine">
                <button @click="upload()">提交</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <table class="tableBox">
        <tr class="tableLine tableHead">
          <th>序号</th>
          <th class="itemName">作品名字</th>
          <th class="itemInfo">作品简介</th>
          <th class="itemImg">作品效果图</th>
          <th class="itemAuthor">作品作者</th>
          <th class="itemBtn">操作</th>
        </tr>
        <tr class="tableLine" v-if="listItem.length == 0">
          <td colspan="6">无信息</td>
        </tr>
        <tr class="tableLine tableMain" v-for="(item,index) in listItem">
          <td>{{ index+1 }}</td>
          <td>{{item.name}}</td>
          <td>{{item.info}}</td>
          <td>
            <img :src="item.src" class="showImg">
          </td>
          <td>
            {{item.author}}
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

</style>
<script>
import home from "../common/home.vue"
import uploadImg from "../common/uploadImg.vue"
export default {
  name: 'shopInfo',
  components: { home, uploadImg },
  data() {
    return {
      listItem: [],
      pageCount: "",
      pageItem: [],
      pageIndex: "",
      pageIndex: "",
      pageNum: 4,
      layerShow: false,
      worksDescribe: '',
      worksName: '',
      worksImg: {},
      worksAuthor: '',
      toast: "",
      toastShow: false,
      postURL: "http://lj661.cn:8000/works/"
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
    validate(data) {
      if (data == 404) {
        this.$router.push({ path: "/" });
        window.localStorage.removeItem("token");
        this.showToast("token验证失败,请重新登录");
      }
    },
    setImgSrc(value, file) {
      this.worksImg = file;

    },
    addWorks() {
      this.layerShow = !this.layerShow;
    },
    cancel() {
      this.layerShow = !this.layerShow;
    },
    upload() {

      const formData = new FormData()
      formData.append('file', this.worksImg);
      formData.append('worksName', this.worksName);
      formData.append("worksInfo", this.worksInfo);
      formData.append("worksDescribe", this.worksDescribe);
      formData.append("worksAuthor", this.worksAuthor);
      formData.append("token", window.localStorage.getItem("token"));
      let config = {
        header: { 'Content-type': 'application/x-www-form-urlencoded' }
      };
      if (this.worksImg) {
        this.$http.post(this.postURL, formData, config).then((res) => {

          if (res.status == 200) {
            this.layerShow = !this.layerShow;
            this.getInfo();
            this.showToast("添加");
          } else {
            this.$router.push({ path: "/" });
            window.localStorage.removeItem("token");
          }
        });
      }

    },
    showToast(value, time = 800) {
      this.toastShow = !this.toastShow;
      this.toast = value;
      let that = this;

      setTimeout(function () { that.toastShow = !that.toastShow }, time);
    },
    getInfo() {
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