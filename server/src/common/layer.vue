<template>
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
        <form action="" class="addInfoForm">
          <div class="inputLine">
            <label for="">学长姓名</label>
            <input type="text" name="addName" placeholder="请输入学长姓名" v-model="addName">
          </div>
          <div class="inputLine">
            <label for="">大佬图片</label>
            <uploadImg inputName="addImg" v-on:upload="setImgSrc"></uploadImg>
  
          </div>
          <div class="inputLine">
            <label for="">大佬简介</label>
            <textarea class="itemDescribe" name="addDescribe" placeholder="请输入对商品的描述" v-model="addDescribe"></textarea>
          </div>
          <div class="inputLine">
            <button @click="">提交</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style lang="stylus">
@import "../assets/styles/icons/iconfont.css"
</style>
<script>
import home from "./home.vue"
import uploadImg from "./uploadImg.vue"
export default {
  name: 'shopInfo',
  data() {
    return {
      layerShow: true,
      addDescribe: '',
      addName: '',
    }
  },
  components: { home, uploadImg },
  methods: {
    setImgSrc(value) {
      this.imgSrc = value
    },
    addFamous() {
      this.layerShow = !this.layerShow
    },
    cancel() {
      this.layerShow = !this.layerShow
    }
  }
}
</script>