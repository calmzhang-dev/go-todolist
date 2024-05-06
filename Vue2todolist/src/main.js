import Vue from 'vue'
import App from './App.vue'
import store from "./store/index";
import router from './router/index'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(VueRouter)

Vue.use(ElementUI);
// 消息提示框
Vue.prototype.$notify = Notification;

import request from '../src/utils/request'

Vue.prototype.$get = request.get

Vue.prototype.$post = request.post

Vue.prototype.$put = request.put

Vue.prototype.$delete = request.del

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
