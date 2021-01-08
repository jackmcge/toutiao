import request from '@/utils/request'

export const  addUserChannel = data=>{
    return request({
        method:'PUT',
        url:'/app/v1_0/user/channels',
        data
    })
}