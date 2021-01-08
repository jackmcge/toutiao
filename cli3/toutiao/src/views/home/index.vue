<template>
<div class='home-contarer'>
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">  
        <van-button 
         slot="title"
         icon="search"
         round
         type="info"
         class="search-btn"
         to="/search"
         >搜索</van-button>
    </van-nav-bar>
    <!-- //文章频道列表 -->
    <van-tabs v-model="active" class="channel-tabs">

    <van-tab 
    :title="channel.name"
    v-for="channel in channels"
    :key="channel.id"
    >
     <!-- //文章列表  -->
    <article-list  :channel="channel"/>
    
    </van-tab>

    <div slot="nav-right"
     @click="ischannereditshow=true"
     class="btn-right">
        <van-icon name="wap-nav" />
    </div> 

    </van-tabs>
  <van-popup
   v-model="ischannereditshow"
    position="bottom"
     closeable
     close-icon-position="top-left"
     class="channel-edit-popup"
     get-container="body"
     style="height:100%" >
     <ChannelEdit
      :user-channels="channels"
      @close="ischannereditshow = false"
      @update-active="onUpdateActive"
      :active ="active"
     />
     
     
     </van-popup>

</div>
</template>

<script>
import {getUserChannels} from "@/api/user"
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'

export default {
name:'HomeIndex',
components: {
    ArticleList,
    ChannelEdit

},
data() {
return {
       active: 0,
       channels:[],//频道列表
       ischanner:false,
       ischannereditshow:false
};
},
computed: {
   
},
watch: {},
methods: {
    //请求获取文章数据
  async loadChannels(){
       const {data} = await getUserChannels();
       console.log(data)
       this.channels= data.data.channels;
 },
 onUpdateActive(index){
     this.active = index
 }
},
created() {
     this.loadChannels()
},
mounted() {

},
}
</script>
<style scoped lang=less>
.home-contarer{
   /deep/ .van-nav-bar__title{
        max-width: unset;
    }
   .search-btn{
       width: 277px;
       height: 32px;
       background: #5babfb;
       .van-button__text{
           font-size: 14px;
       }
       .van-button__icon{
           font-size: 16px;
       }
    }
    .channel-tabs{
      /deep/  .van-tab {
            border-right: 1px solid #edeff3;
            border-bottom: 1px solid #edeff3 ;
        }
       /deep/ .van-tabs__line{
            width: 15px  !important;
            height: 3px;
            background: #3296fa;
            bottom: 20px;
        }
        .btn-right{
            position: fixed;
            right: 0;
            height: 44px;
            line-height: 44px;
            background-color: #fff;
            opacity: .9;
            
        }
    }
}
</style>