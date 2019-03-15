import Vue from 'vue' //引入Vue 模块
import Router from 'vue-router' //引入路由
import Login from '@/components/Login.vue'  //引入login 组件
import Hello from '@/common/home.vue'  //引入home 组件
import Register from '@/components/Register.vue'  //引入Register 组件
import Famous from '@/components/famous.vue'
import Works from '@/components/Works.vue'
import Contact from '@/components/contact.vue'
import Advice from '@/components/advice.vue'
import Photo from '@/components/photo.vue'
import Fresh from "@/components/fresh.vue"
Vue.use(Router) 

export default new Router({
  routes: [ //配置路由
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Hello/:userID', 
      name: 'HelloID',
      meta: {
          // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,  
          },           
      component: Hello

    },
    {
      path: '/Hello/', 
      name: 'Hello',
      meta: {
          // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,  
          },           
      component: Hello

    },
    {
      path: '/Register', 
      name: 'Register',        
      component: Register
    },
    {
      path: "/famous",
      name:"famous",
      component:Famous
    },
    {
      path: "/Works",
      name:"Works",
      component: Works
    },
    {
      path: "/advice",
      name:"advice",
      component: Advice
    },
    {
      path: "/contact",
      name:"contact",
      component: Contact
    },
    {
      path:"/photo",
      name:"photo",
      component:Photo
    },
    {
      path:"/fresh",
      name:"fresh",
      component:Fresh
    }

  ]
})
