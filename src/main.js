import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// import './plugins/element.js'
import qs from 'qs'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axios'

Vue.use(Element)
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.prototype.bus = new Vue()// 在 Vue 的prototype挂载了一个bus属性


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
