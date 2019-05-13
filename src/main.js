// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'
import _ from  'lodash'
import 'font-awesome/css/font-awesome.css'

//使用element-ui
window._=_;
Vue.config.productionTip = false
Vue.use(elementUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.name === 'Login'||to.name === 'Register'||to.name === 'Reset') {
    next();
  } else {
    let token = localStorage.getItem('token');
    if (token === 'null' || token === '') {
      next('/');
    } else {
      next();
    }
  }
});
