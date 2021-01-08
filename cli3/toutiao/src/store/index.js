import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem}from '@/utils/storage'
Vue.use(Vuex)

const USER_KEY = 'toutiao'
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser(state,data){
      state.user = data
      //为了持久化防止页面刷新数据丢失。把数据放到本地存储。
     // window.localStorage.setItem('user',JSON.stringify(state.user))
     setItem(USER_KEY,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
