import request from '@/utils/request';
//import store from '@/store/'
//登录注册
export const login= data=>{
    return request({
        method:'POST',
        url:'/app/v1_0/authorizations',
        data
    })
}
//获取验证码
export const sendSms= mobile=>{
    return request({
        method:'GET',
        url:`/app/v1_0/sms/codes/${mobile}`     
    })
}
//获取登录用户信息
 export const getCurrentUser=()=>{
    return request({
        method:'GET',
        url:'/app/v1_0/user' 
    })
 }
 //获取用户频道列表
 export const getUserChannels =()=>{
    return request({
        method:'GET',
        url:`/app/v1_0/user/channels`,
        
    })
 }
 export const addFollow =userId=>{
    return request({
        method:'POST',
        url:`/app/v1_0/user/followings`,
        data:{
            target:userId
            
        }
    })
 }
 //关注用户
 export const deleteFollow =userId=>{
    return request({
        method:'DELETE',
        url:`/app/v1_0/user/followings/${userId}`,
        
    })
 }