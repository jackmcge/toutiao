import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'
//import { get } from 'core-js/fn/dict'
const request = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/',
    transformResponse:[function(data){
        try{
            return JSONbig.parse(data)
        }catch(err){
            return data
        }
    }]
})
//请求拦截
request.interceptors.request.use(function(config){
    const {user}=store.state
    //如果用户已登录，统一给接口设置token信息。
    if(user){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
},function(error){
    return Promise.reject(error)
})
export default request