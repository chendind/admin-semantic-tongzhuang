// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import './resource'
import 'assets/less/index.less'
import 'assets/js/alert.js'
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  mounted: function(){
    window.baseUrl = 'http://tongzhuang.moovi-tech.com'
    // $.fn.modal.settings.silent = true
    // $.fn.modal.settings.debug = true
  }
})
window.router = router



