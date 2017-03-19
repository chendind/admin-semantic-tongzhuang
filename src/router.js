import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './pages/Main.vue'
import Login from './pages/Login.vue'
import BusinessLogin from './pages/BusinessLogin.vue'
import Regist from './pages/Regist.vue'
import Form from './pages/example/Form.vue'
import Business from './pages/example/Business.vue'
import FormImageUpload from './pages/example/FormImageUpload.vue'
Vue.use(VueRouter);
const routes = [
  	{
  		path: '/',
  		component: Main,
		  children: [
      {
        path: '/',
        component(r){
          if(window.localStorage.getItem('usertype') == 'back'){
            r(require('./pages/goods/goods.vue'))
          }
          else{
            r(require('./pages/user/customer.vue'))
          }
        }
      },
      {
        path: '/app/carousel',
        component(r){
          r(require('./pages/app/carousel.vue'))
        }
      },
      {
        path: '/app/carouselInfo',
        component(r){
          r(require('./pages/app/carouselInfo.vue'))
        }
      },
			{
				path: 'goods',
				component(r){
					r(require('./pages/goods/goods.vue'))
				}
			},
			{
				path: '/goods/goodsInfo',
				component(r){
					r(require('./pages/goods/goodsInfo.vue'))
				}
			},
			{
				path: '/message',
				component(r){
					r(require('./pages/message/messageHistory.vue'))
				}
			},
			{
				path: '/message/messageNew',
				component(r){
					r(require('./pages/message/messageNew.vue'))
				}
			},
			{
				path: '/message/messageDetail',
				component(r){
					r(require('./pages/message/messageDetail.vue'))
				}
			},
			{
				path: '/order',
				component(r){
					r(require('./pages/order/orderHistory.vue'))
				}
			},
			{
				path: '/order/orderWait',
				component(r){
					r(require('./pages/order/orderWait.vue'))
				}
			},
      {
        path: '/order/orderInfo',
        component(r){
          r(require('./pages/order/orderInfo.vue'))
        }
      },
			{
				path: '/personCenter',
				component(r){
					r(require('./pages/personCenter/personCenter.vue'))
				}
			},
      {
        path: '/business/personCenter',
        component(r){
          r(require('./pages/business/personCenter.vue'))
        }
      },
			{
				path: '/user/business',
				component(r){
					r(require('./pages/user/business.vue'))
				}
			},
      {
        path: '/user/businessInfo',
        component(r){
          r(require('./pages/user/businessInfo.vue'))
        }
      },
			{
				path: '/user/customer',
				component(r){
					r(require('./pages/user/customer.vue'))
				}
			},
      {
        path: '/user/customerInfo',
        component(r){
          r(require('./pages/user/customerInfo.vue'))
        }
      },
		  {
        path: '/business/customer',
        component(r){
          r(require('./pages/business/customer.vue'))
        }
      },
      {
        path: '/business/customerInfo',
        component(r){
          r(require('./pages/business/customerInfo.vue'))
        }
      },
	    {
	    	path: 'form',
	    	component: Form
	    },
	    {
	    	path: 'formImageUpload',
	    	component: FormImageUpload
	    }
		]
	},
	{
  		path: '/login',
  		component: Login,
		  children: []
	},
  {
      path: '/businessLogin',
      component: BusinessLogin,
      children: []
  },
  {
      path: '/regist',
      component: Regist,
      children: []
  }
]
export default new VueRouter({
  routes // （缩写）相当于 routes: routes
})
