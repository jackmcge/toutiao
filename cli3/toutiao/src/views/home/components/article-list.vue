<template>
<div class='article-list'>
  <!-- 下拉刷新 -->
<van-pull-refresh 
v-model="isRefreshLoading"
 @refresh="onRefresh"
 :success-text="refreshSuccessText"
 :success-duration="1500"
 
 >
  
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
<ArticleItem
v-for="(article,index) in articles"
:key="index" :title="article.title"
:article="article"
 />
  <!-- <van-cell v-for="(article,index) in articles" :key="index" :title="article.title" /> -->
</van-list>

</van-pull-refresh>
</div>
</template>

<script>
import {getArticles} from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
name:'ArticleList',
components: {
  ArticleItem
},
// 接受参数
props:{
    channel:{
        type:Object,
        required:true

    }
},
data() {
return {
    articles: [],
      loading: false,
      finished: false,
      timestamp:null,
      isRefreshLoading:false, //下拉刷新
      refreshSuccessText:''
};
},
computed: {},
watch: {},
methods: {
  // deletechanenl(){
  //   if(index <=this.active){
  //     //更新激活频道的suoyin
  //     this.$emit('updata-active,this.active-1')
  //   }
  //   this.userchanner.splice(index,1)
  // }
  async onLoad() {
      //1 请求数据
    const {data} = await getArticles({
      channel_id:this.channel.id,
      timestamp: this.timestamp || Date.now(),
      with_top:1
    })
      //2把数据放到list数组中
      const {results} =data.data
  this.articles.push(...results)
      //设置本次加载状态结束
      this.loading =false
      //判断数据加载是否完成
      if(results.length){
        this.timestamp = data.data.pre_timestamp
      }else{
        this.finished =true
      }
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
     console.log(data)

        // 加载状态结束
        

        // 数据全部加载完成
     
    },
  async  onRefresh(){
      //请求获取数据
        const {data} = await getArticles({
      channel_id:this.channel.id,
      timestamp: Date.now(),
      with_top:1
    })
     //把数据放到列表中 往顶部加
     this.articles.unshift(...data.data.results)
     //关闭刷新状态
     this.isRefreshLoading =false
     this.refreshSuccessText="更新成功"
    }

},
created() {

},
mounted() {

},
}
</script>
<style scoped lang ="less">
.article-list{
  position:fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>