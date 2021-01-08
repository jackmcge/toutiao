<template>
<div class='article-container'>
    <!-- 导航栏 -->
    <van-nav-bar
    class="app-nav-bar"
  title="文章详情"
  left-arrow
  @click-left="$router.back()"
 
/>

    <h1 class="title">{{article.title}}</h1>
<van-cell center class="user-info">
    <div slot="title" class="name">{{article.aut_name}}</div>
    <van-image 
    slot="icon"
    fit="cover"
    round
    class="avatar"
     :src="article.aut_photo"
    />
    <div slot="label" class="update">{{article.pubdate | relativeTime}}</div>
    <van-button 
    class="follow-btn"
    :type="article.is_followed? 'default': 'info'"
    round
    :icon=" article.is_followed? '':'plus'"
    size="small"
    @click="onFollow"
    >{{article.is_followed? '已关注':'关注'}}</van-button>
</van-cell>
<div class=" markdown-body" 
v-html="article.content"
ref="article-content">
    
</div>

</div>
</template>

<script>
import './markdown.css'
import {getArticleById} from '@/api/article'
import { ImagePreview } from 'vant';
import {addFollow,deleteFollow} from '@/api/user'
export default {
name:'',
components: {},
props:{
     articleId:{
         type:[String,Number,Object],
         require:true
     }
},
data() {
return {
    article:{} //文章数据对象
};
},
computed: {},
watch: {},
methods: {
   async loadArticle(){
       const {data} = await getArticleById(this.articleId)
      this.article =data.data
      //获取文章内容dom容器
      //得到所有img标签 如果在修改数据要马上操作视图 需要把这个代码放在$nexttick中
      this.$nextTick(()=>{
         this.handlePerviewImage()
      })
    
      //循环img列表，给img注册点击事件
      //在事情处理函数中调用imagepreview()
    },
    handlePerviewImage(){
        const articleContent = this.$refs['article-content']
        const imgs = articleContent.querySelectorAll('img')
        const imgPath= []
        imgs.forEach((img,index)=>{
            imgPath.push(img.src)
            img.onclick=function(){
                ImagePreview({
                images:imgPath,
                 startPosition: index
                    });
            }
        })
    },
    async onFollow(){
        if(this.article.is_followed){
            await deleteFollow(this.article.aut_id)
        }else{
            await addFollow(this.article.aut_id)
        }
        this.article.is_followed =!this.article.is_followed
    }
},
created() {
 this.loadArticle()
},
mounted() {

},
}
</script>
<style scoped lang="less">
.title{
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
}
.article-container{
    .app-nav-bar{
        color: white;
        background: turquoise;
    }
}
.user-info{
    .avatar{
           width: 35px;
           height: 35px;
           margin-right: 8px;
    }
    .name{
        font-size: 12px;
        color: #333333;
    }
    .update{
        font-size: 11px;
        color: #b4b4b4;
    }
    .follow-btn{
        width: 85px;
        height: 29px;
    }
}
.markdown-body{
    padding: 14px;
    background-color: #fff;
}
 .app-nav-bar{
        position: fixed;
        left: 0;
        right: 0;
      
        
    }
</style>