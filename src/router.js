import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './Main.vue'
import Login from './Login.vue'
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
				path: '/message/messageChoose',
				component(r){
					r(require('./pages/message/messageChoose.vue'))
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
				path: '/personCenter',
				component(r){
					r(require('./pages/personCenter/personCenter.vue'))
				}
			},
			{
				path: '/user/business',
				component(r){
					r(require('./pages/user/business.vue'))
				}
			},
			{
				path: '/user/customer',
				component(r){
					r(require('./pages/user/customer.vue'))
				}
			},
		    {
		      path: 'business',
		      component: Business
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
	}
]
export default new VueRouter({
  routes // （缩写）相当于 routes: routes
})