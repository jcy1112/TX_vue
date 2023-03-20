import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import ElementUI from 'element-ui';
import './plugins/element.js'  //按需加载
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/gloable.css'
import request from "@/utils/request";
import store from './store'

Vue.config.productionTip = false

// Vue.use(ElementUI,{size:"mini"});

Vue.config.http = request

Vue.prototype.request=request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
