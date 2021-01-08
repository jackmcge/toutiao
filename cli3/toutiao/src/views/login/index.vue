<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录/注册"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登入表单 -->
    <van-form
      @submit="onLogin"
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
           v-if="isCountDownShow"
           :time="1000*6 "
           format="ss s" 
          @finish="isCountDownShow=false"
           />
          <van-button
             v-else
            size="small"
            round
            class="send-btn"
            @click.prevent="onSendSms"
            :loading="isSendSmsLoading"  
            >获取验证码</van-button >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button type="info" block class="login-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
import { Toast } from "vant";

export default {
  components: {},
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      formRules: {
        mobile: [
          { required: true, message: "请填写用户名" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机号格式化错误" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          {pattern:/^\d{6}$/,message:'验证码格式错误'}
          ],
      },
      isCountDownShow:false,
      isSendSmsLoading:false
    };
  },
  computed: {},
  watch: {},
  methods: {
    async onLogin() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const {data} = await login(this.user);
        Toast.success("登录成功");
        //将后端返回的用户登录状态 token数据放到vuex容中
        this.$store.commit('setUser',data.data)
        this.$router.back()
      } catch (err) {
        Toast.fail("登录失败，手机号或验证码错误");
      }
    },
    //提交表单且验证不通过后触发
    onFailed(error) {
      if (error.errors[0]) {
        Toast({
          message:error.errors[0].message,
          position:'top'
        });
      }
    },
    //验证码验证
    async onSendSms() {
      try {
        //教练手机号
         await this.$refs["login-form"].validate("mobile");
            this.isSendSmsLoading =true
         //通过发送验证码请求数据
         const res = await sendSms(this.user.mobile);
        //短信发出 显示倒计时 隐藏发送按钮 显示倒计时
         this.isCountDownShow = true
         //时间到了 显示发送按钮     
      } catch (err) {
        let message = '';
        if (err && err.response && err.response.status === 429) {
          message = "发送太频繁，请稍后发送";
        } else if (err.name === 'mobile') {
          message = err.message;
        } else {
          message = "发送失败，请稍后重试";
        }
        Toast({
          message,
          position: "top",
        });
      }
      //无论发送是否成共，都要关闭加载状态
      this.isSendSmsLoading=false
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.login-container {
  .send-btn {
    width: 80px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      border-radius: 50px;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>