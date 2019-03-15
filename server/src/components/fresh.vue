<template>
  <home>
    <div slot="content" class="itemList">
      <div class="pageTitle">
        <h2>新生报名</h2>
        <!--@click="addPhoto" -->
      </div>
      <div class="toast" v-show="toastShow">
        <p class="toastContent">{{toast}}成功</p>
      </div>
      <table class="tableBox">
        <tr class="tableLine tableHead">
          <th>序号</th>
          <th class="itemImg">姓名</th>
          <th class="itemDescribe">QQ</th>
          <th class="itemDate">电话</th>
          <th class="itemDate">学院</th>
          <th class="itemDate">意向部门</th>
          <th class="itemBtn">操作</th>
        </tr>
        <tr class="tableLine" v-if="listItem.length == 0">
          <td colspan="7">{{msg}}</td>
        </tr>
        <tr class="tableLine tableMain" v-for="(item,index) in pageItem">
          <td>{{ item.index }}</td>
          <td>
            {{item.name}}
          </td>
          <td>
            {{item.qq}}
          </td>
          <td>
            {{item.phone}}
          </td>
          <td>
            {{item.college}}
          </td>
          <td>
            {{item.depart}}
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
.layerIcon:before,.layerIcon:after
  background red!important
</style>
<script>
import home from "../common/home.vue"
import uploadImg from "../common/uploadImg.vue"
export default {
  name: "itemList",
  data() {
    return {
      msg:"无信息",
      listItem: [],
      pageCount: "",
      pageItem: [],
      pageIndex: "",
      pageNum: 10,
      toast: "",
      toastShow: false,
      postURL: "http://lj661.cn:8000/fresh/",
    }
  },
  components: { home, uploadImg },
  methods: {
    page() { //分页功能
      this.pageCount = Math.ceil(this.listItem.length /this.pageNum);
    },
    pageLast() { //上一页
      if (this.pageIndex > 1) {

        let start = (this.pageIndex - 2) * this.pageNum;
        let end = ((this.pageIndex - 1) * this.pageNum);
        this.pageItem = this.listItem.slice(start, end);
        this.pageIndex -= 1;
      }

    },
    select(index) {
      this.pageIndex = index;
      let start = this.pageIndex * this.pageNum;
      let end = ((this.pageIndex + 1) * this.pageNum);
      this.pageItem = this.listItem.slice(start, end);
    },
    pageNext() {//下一页
      if (this.pageIndex < this.pageCount) {
        let start = this.pageIndex * this.pageNum;
        let end = ((this.pageIndex + 1) * this.pageNum);
        this.pageIndex += 1;
        this.pageItem = this.listItem.slice(start, end);
      }
    },
    fix(num) {

    },
    validate(data) {
      if (data == 404) {
        this.$router.push({ path: "/" });
        window.localStorage.removeItem("token");
        this.showToast("token验证失败,请重新登录");
      }
    },
    del(num) {
      let confirm = window.confirm("确定删除吗?");
      if(confirm){
        this.$http.patch(this.postURL, { "data": num, "token": window.localStorage.getItem("token") }).then(res => {
          if (res.data.status == 200) {
            this.getInfo();
            this.showToast("删除");
          } else if (res.data.status == 404) {
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
      this.msg = "正在获取信息，请稍等";
      this.$http.get(this.postURL, { params: { token: window.localStorage.getItem("token") } }).then(res => {
        if (res.data.status == 404) {
          this.$router.push({ path: "/" });
          window.localStorage.removeItem("token");
        } else if (res.data.status == 200) {
          this.listItem = [];
          res.data.data.forEach((item,index) => {
            this.listItem.push(item);
            item.index = index + 1;
          }, this);
          this.pageIndex = 1;
          this.pageItem = this.listItem.slice(0, this.pageNum);
          this.page();
        }
      })
    }
  },
  created() {
    this.getInfo();
  }
}
</script>