<template>
<div class='channel-edit'>
<van-cell center :border="false">
<div 
slot="title"
 class="channel-title"
 >我的频道</div>
<van-button 
type="danger"
plain
round
size="small"
@click="isEdit = !isEdit"
>{{ isEdit? '完成': '编辑'}}</van-button>
</van-cell>

<van-grid :gutter="10">
  <van-grid-item
   v-for="(channel,index) in userChannels" :key="index"
     :text="channel.name"
     class="grid-item"
     :class="{active:index === active}"
     :icon=" (isEdit && index !==0)? 'clear': ''"
     @click="onUserChannelClick(index)"
      />
</van-grid>

<van-cell center :border="false">
<div slot="title" class="channel-title">频道推荐</div>
</van-cell>

<van-grid :gutter="10">
  <van-grid-item
   v-for="(channel,index) in recommendChannels" :key="index"
     :text="channel.name"
     class="grid-item"
     @click="onAdd(channel)"
      />
</van-grid>



</div>
</template>

<script>
import {getAllChannels} from '@/api/article'
import {addUserChannel} from '@/api/channel'
export default {
name:'ChannelEdit',
components: {},
props:{
 userChannels:{
   type:Array,
   required:true
 },
 active:{
     type:Number,
     required:true
 }
},
data() {
return {
    allChannels:[],
    isEdit:false//控制编辑显示状态
};
},
computed: {
    //推荐频道列表
    recommendChannels(){
   return  this.allChannels.filter(channel =>{
      return  !this.userChannels.find(userChannel=>{
            return userChannel.id  === channel.id
        })
        })
    }
},
watch: {},
methods: {
   async loadAllChannels(){
        const {data} = await getAllChannels()
        console.log(data)
        this.allChannels = data.data.channels
    },
    onAdd(channel){
        this.userChannels.push(channel)
        
    },
    onUserChannelClick(index){
        //编辑状态下，删除
        if(this.isEdit && index !==0){
            this.deleteChannel(index)
        }else{
            //切换频道
            this.$emit('update-active',index)
            //关闭弹出层
            this.switchChannel(index)
        }
        //非编辑，切换槟岛
    },
    deleteChannel(index){
        //如果删除的是当前激活的频道
        if(index <= this.active){
            this.$emit('update-active',this.active-1)
        }
        this.userChannels.splice(index,1)
    },
    switchChannel(index){
        this.$emit('close')
    }
},
created() {
 this.loadAllChannels()
},
mounted() {

},
}
</script>
<style scoped lang="less">
.channel-edit{
    padding-top: 54px
    
}
.channel-title{
        font-size: 16px;
    }
    .grid-item{
        width: 80px;
        height: 43px;
        /deep/.van-grid-item__content{
             background:#f4f5f6 ;
             position: relative;
             .van-grid-item__text{
                 font-size: 14px;
                 color: #222;
                 margin-top: 0px;
             }
             .van-icon{
                position: absolute;
                right: -10px;
                top: -10px;
                font-size: 20px;
                color: #ccc;
             }
        }
       
    }
  .active{
   /deep/ .van-grid-item__text{
    color: red !important;
    }
    
}
</style>