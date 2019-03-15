<template>
<home>
  <div class="advice" slot="content">
     <form action="" class="adviceForm">
          <div class="inputLine">
            <label for="">反馈主题</label><input type="text" placeholder="请输入反馈主题">
          </div>
          <div class="inputLine">
            <label for="">反馈描述</label>
            <textarea class="itemDescribe" placeholder="请输入反馈描述"></textarea>
          </div>
          <div class="inputLine">
            <button @click="">提交</button>
          </div>
        </form> 
  </div>
</home>

</template>
<style lang="stylus">
  .advice
    padding-top: 2rem
    display: flex
    width 600px
    flex-direction: row
    align-items: center
    justify-content: center
  .adviceForm
    flex: 1
    
  .adviceForm label
    width: 130px
    color: white
  .adviceForm textarea
    flex: 1
    height: 300px
</style>
<script>
import home from "../common/home.vue"

export default{
  name: 'advice',
  components:{home}
}
</script>