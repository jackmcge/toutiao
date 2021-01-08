<template>
<div class='search-result'>
 <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="item in list" :key="item" :title="item" />
</van-list>
</div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
name:'SearchResult',
props:{
     searchText:{
        tpye:String,
         required:true
   }
},
components: {},
data() {
return {
       list: [],
      loading: false,
      finished: false,
      page:1,
      perPage:10
};
},
computed: {},
watch: {},
methods: {
  // onLoad() {
  //     //请求获取数据

  //     //将数据放到list中
  //     const{results}=data.data;
  //     this.list.push(...results)
  //     //关闭本次loading
  //     this.loading =false
  //     //判断是否还有数据，有更新下一页 否则关闭
  //     if(results.length){
  //         this.page++
  //     } else{
  //     this.finished = true

  //     }
  //   }
   async onLoad() {
      const {data} = await getSearchResult({
        page:this.page,
        per_page:this.perPage,
        q:this.searchText
      })
       const {result}=data.data
       this.list.push(...result)
       this.loading =false
       if(result.length){
         this.page++
       }else{
         this.finished= true
       }
    },
},
created() {

},
mounted() {

},
}
</script>
<style scoped>

</style>