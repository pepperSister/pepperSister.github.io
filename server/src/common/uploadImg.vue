<template>
      <div id="uploadImg">
        <input type="file" multipe id="Img" ref="img" @change="showImg()" :name="inputName">
        <i class="iconfont icon-tupian imgIcon"></i>
        <p>图片上传</p>
        <div class="boxShow">
          <div class="boxItem" v-for="(item,index) in imgSrc">
            <div class="icon" @click="del(index)"></div>
            <img :src="item.url" alt="" ref="imgShow" class="imgShow" >
          </div>
        </div>

      </div>
</template>
<style lang="stylus">
  @import "../assets/styles/icons/iconfont.css"
  #uploadImg
    max-width: 800px
    flex 1
    background #F9F9F9
    border-radius 20px
    position relative
    text-align center

  #Img
    opacity: 0
    display block
    width 100%
    height 100%
    position absolute
    top: 0 
    left 0
  .imgIcon
    font-size 3rem
  .boxShow
    display flex
    flex-direction row
    justify-content space-around
    align-items flex-start
    flex-wrap wrap
  .boxItem
    position relative

  .icon
    width 20px
    height 20px
    position absolute

  .icon:before,.icon:after
    content: " ";
    position: absolute;
    background-color: #fff;
    display: block;
    width: 100%;
    height: 3px;
    left: 0;
    border-radius: 3px;
    -webkit-transition: all .5s cubic-bezier(.66,.1,.38,1.45);
    transition: all .5s cubic-bezier(.66,.1,.38,1.45);
    top: 50%;
    -webkit-transform: translateY(-51%);
    -o-transform: translateY(-51%);
    transform: translateY(-51%);
    /* transform-origin: 50% 50%; */
  .icon:before
    transform: rotate(45deg)
  .icon:after
    transform: rotate(-45deg)



  .imgShow
    width 200px
    height 150px


</style>

<script>
import home from "../common/home.vue"
export default{
  name:"uploadImg",
  data() {
    return {
      imgSrc:[],
      count:0
    }
  },
  props:{inputName:String},
  components:{home},
  methods:{
    showImg () {
     let img = this.$refs.img;
     img = img.files[0]
     var self = this
     var reader = new FileReader();
      // 将图片将转成 base64 格式
      reader.readAsDataURL(img);
      // 读取成功后的回调
      reader.onloadend = function () {
        self.imgSrc.push({url:this.result})
        self.$emit('upload',self.imgSrc,img)
      }

    },
    del(index){
      this.imgSrc.splice(index,1)
      this.$emit('upload',this.imgSrc)
    }
  }
}
</script>