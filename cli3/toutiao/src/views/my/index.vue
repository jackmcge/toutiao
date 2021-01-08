<template>
  <div class="my-container">
    <van-cell-group  v-if="user" class="my-info">
      <van-cell 
      class="base-info"
      title="单元格" 
      value="内容"
      center
      :border=false>
        <van-image
          width="50"
          height="50"
          slot="icon"
          fit="cover"
          round
          :src="currentUser.photo"
        />
        <div slot="title">{{currentUser.intro}}</div>
        <van-button
            size="small"
            round
        >编辑资料</van-button>
      </van-cell>
      <van-grid  class="data-info" :border=false>
    <van-grid-item class="data-info-item"  >
        <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">头条</div>
        </div>
    </van-grid-item >
    <van-grid-item class="data-info-item" >
         <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">关注</div>
        </div>
    </van-grid-item>
    <van-grid-item class="data-info-item" >
         <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">粉丝</div>
        </div>
    </van-grid-item>
    <van-grid-item class="data-info-item" >
         <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
        </div>
    </van-grid-item>
    </van-grid>
    </van-cell-group>
    <div  v-else class="not-login">
        <div @click="$router.push('/login')">  <img  class="mobile" src="./shouji.png" alt=""></div>
      <div class="text">登录/注册</div>
        
    </div>

    <van-grid :column-num="2" class="nav-grid  mb-4">
    <van-grid-item  class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
    <van-grid-item  class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
   
    </van-grid>
    <van-cell title="消息通知" is-link to="" />
    <van-cell class="mb-4" title="小林同学" is-link to="" />
    <van-cell v-if="user" 
    title="退出登录"
      class="logout-cell"
      @click="onLogout"  />
  </div>
</template>

<script>
import { Form } from 'vant';
import {mapState} from 'vuex'
import {getCurrentUser} from '@/api/user.js'
export default {
  name: "MyIndex",
  components: {},
  data() {
    return {
        currentUser:{}
    };
  },
  computed: {
      ...mapState(['user']) //判断用户是否登录 映射到vuex中 
  },
  watch: {},
  methods: {
      onLogout(){
          this.$dialog.confirm({
            title: '退出提示',
            message: '确认退出吗',
            })
            .then(() => {
                //清除用户登录状态 发射事件
              this.$store.commit('setUser',null)

            })
            .catch(() => {
                // on cancel
            });
      },
      async loadCurrentUser(){
          const {data} = await getCurrentUser()
         this.currentUser=data.data
        
        
      }
  },
  created() {
      this.loadCurrentUser()
  },
  mounted() {},
};
</script>
<style scoped lang=less>
/* .van-cell{
    text-align: center;
} */
.my-container{
    .my-info{
        background:url("./banner.png") no-repeat;
        background-size: cover;
        .base-info{
            background-color: unset;
        }
        .data-info{       
            .data-info-item{
                height: 65px;
                color: #fff;
               .text-wrap{
                   display: flex;
                   flex-direction: column;
                   justify-content: center;
                   align-items: center;
                    .count{
                    font-size:18px ;
                }
                .text{
                    font-size: 11px;
                }
               }
            }
        }

        /deep/ .van-grid-item__content{
             background-color: unset;
        }
    }
    .not-login{
        height: 180px;
        background: url("./banner.png") no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .mobile{
            width: 66px;
            height: 66px;
        }
        .text{
            font-size: 14px;
            color: #fff;
        }
    }
   /deep/ .nav-grid{
        .nav-grid-item{
            height: 70px;          
               .toutiao{
                   font-size: 22px;
               }
               .toutiao-shoucang{
                   color: #eb5253;
               }
               .toutiao-lishi{
                   color: #ff9d1d;
               }  
               .van-grid-item__text{
                   font-size: 14px;
                   color: #333333; ;
               }    
        }
    }
    .logout-cell{
        text-align: center;
        
    }
    .mb-4{
        margin-bottom: 4px;
    }
}
</style>