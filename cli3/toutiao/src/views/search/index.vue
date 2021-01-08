<template>
<div class='search-container'> 
   <!-- 搜索框 -->
<form action="/">
<van-search
 v-model="searchText"
  placeholder="请输入搜索关键词"
    @cancel="$router.back()"
    @focus="isResultShow =false"
    show-action

   >
  </van-search>
   </form>
   <!-- 搜索结果 -->
<SearchResult 
v-if="isResultShow"
:searchText="searchText" />
<!-- 联想建议 -->
<SearchSuggestion
 v-else-if="searchText"
 :searchText="searchText" />
<!-- 历史记录 -->
<SearchHistory  v-else  />

</div>
</template>

<script>  
import SearchSuggestion from './componnets/search-suggestion'
 import SearchHistory from './componnets/search-history'
 import SearchResult from './componnets/search-result'

export default {
name:'SearchIndex',
components: {
    SearchSuggestion,
     SearchHistory,
     SearchResult
    
},
data() {
return {
     searchText: '',
     isResultShow:false,//
     SearchHistorys:[]
};
},
computed: {},
watch: {},
methods: {
    onSearch(searchText){
        // this.searchText = searchText
        // this.isResultShow = true
        // //记录搜索历史记录
        // const index = this.SearchHistorys.indexOf(searchText)
        // if(index !==-1){
        //     this.SearchHistorys.splice(index,1)
        // }
        // this.SearchHistorys.unshift(searchText)
        console.log(aaa)
    },
},
created() {

},
mounted() {

},
methods:{

}
}
</script>
<style scoped>

</style>