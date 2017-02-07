// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import './resource'
import 'assets/less/index.less'
// $(()=>{
// 	require('../static/semantic/dist/semantic.js')
//   require('../static/js/alert.js')
// 	var root = new Vue({
// 	  el: '#app',
// 	  router,
// 	  mounted: function(){
//       window.baseUrl = 'http://tongzhuang.moovi-tech.com'
//     }
// 	})
// })
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  mounted: function(){
    window.baseUrl = 'http://tongzhuang.moovi-tech.com'
  }
})
window.router = router



