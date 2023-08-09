import Vue from 'vue'
import App from './App.vue'

//注册jsBridge 并挂载全局
import Bridge from './src/jsbridge'

Vue.prototype.$bridge = Bridge;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
})//.$mount('#app') 
