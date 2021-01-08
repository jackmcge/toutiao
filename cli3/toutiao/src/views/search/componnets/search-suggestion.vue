<template>
<div class='search-suggestion'>
    <van-cell 
     icon="search"
     v-for="(str,index) in suggestion" :key="index"
      >
      <div slot="title" v-html="heightlight(str)"></div>
      </van-cell>
  
</div>
</template>

<script>
import {getsearchsuggestions} from '@/api/search'
import {debounce} from 'lodash'
export default {
    
 name:'SearchSuggestion',
components: {},
props:{
   searchText:{
        tpye:String,
         required:true
   }
},
data() {
return {
 suggestion:[],
 
};
},
computed: {},
watch: {
    //监听变化
    searchText:{
        handler:debounce(async function(){
           const {data}=await getsearchsuggestions(this.searchText)
          this.suggestion = data.data.options
      },300),
       immediate:true 
    }
     
    
},
methods: {
heightlight(str){
    return  str.replace(new RegExp(this.searchText,'gi'),`<span style="color:red">${this.searchText}</span>`)
}
},
created() {

},
mounted() {

},
}
</script>
<style scoped>

</style>