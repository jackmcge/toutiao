import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import './utils/day'
//加载全局样式
import './styles/index.less'
import { Icon } from 'vant';
Vue.use(Icon);
//自动设置rem 基准值 html 大小
import 'amfe-flexible'
import "vant/lib/index.css";
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
