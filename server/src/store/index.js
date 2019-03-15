import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)



export default new Vuex.Store({ //新建store
	state:{
		user:{
		},
		count:0
	},
	mutations: {
		isLogin (state,user) {
			state.user = user
		},
		COUNT(state){
			state.count++
		}
	}
})