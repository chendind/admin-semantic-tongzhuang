import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const routes = [
    {
      path: '/',
      component(r) {
        require.ensure([], (require) => {
          r(require('./pages/Main.vue'))
        }, 'main')
      },
      children: [
    {
      path: '/',
      component(r){
        if(window.localStorage.getItem('usertype') == 'back'){
          require.ensure([], (require) => {
            r(require('./pages/goods/goods.vue'))
          }, 'main')
        }
        else{
          require.ensure([], (require) => {
            r(require('./pages/user/customer.vue'))
          }, 'main')
        }
      }
    },
    {
      path: '/app/carousel',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/app/carousel.vue'))
        }, 'main')
      }
    },
    {
      path: '/app/carouselInfo',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/app/carouselInfo.vue'))
        }, 'main')
      }
    },
    {
      path: 'goods',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/goods/goods.vue'))
        }, 'main')
      }
    },
    {
      path: '/goods/goodsInfo',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/goods/goodsInfo.vue'))
        }, 'main')
      }
    },
    {
      path: '/message',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/message/messageHistory.vue'))
        }, 'main')
      }
    },
    {
      path: '/message/messageNew',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/message/messageNew.vue'))
        }, 'main')
      }
    },
    {
      path: '/message/messageDetail',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/message/messageDetail.vue'))
        }, 'main')
      }
    },
    {
      path: '/order',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/order/orderHistory.vue'))
        }, 'main')
      }
    },
    {
      path: '/order/orderWait',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/order/orderWait.vue'))
        }, 'main')
      }
    },
        {
          path: '/order/orderInfo',
          component(r){
            require.ensure([], (require) => {
              r(require('./pages/order/orderInfo.vue'))
            }, 'main')
          }
        },
    {
      path: '/personCenter',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/personCenter/personCenter.vue'))
        }, 'main')
      }
    },
        {
          path: '/producer/productManage',
          component(r){
            require.ensure([], (require) => {
              r(require('./pages/producer/productManage.vue'))
            }, 'main')
          }
        },
        {
      path: '/producer/customer',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/producer/customer.vue'))
        }, 'main')
      }
    },
    {
      path: '/producer/customerDetail',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/producer/customerDetail.vue'))
        }, 'main')
      }
    },
        {
      path: '/producer/productdetail',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/producer/productdetail.vue'))
        }, 'main')
      }
    },
    {
      path: '/producer/map',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/producer/map.vue'))
        }, 'main')
      }
    },
    {
      path: '/producer/productRate',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/producer/productRate.vue'))
        }, 'main')
      }
    },
    {
      path: '/producer/producerInfo',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/producer/producerInfo.vue'))
        }, 'main')
      }
    },
    {
      path: '/producer/producerManage',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/producer/producerManage.vue'))
        }, 'main')
      }
    },
    {
      path: '/producer/producerDetail',
      component(r){
        require.ensure([], (require) => {
          r(require('./pages/producer/producerDetail.vue'))
        }, 'main')
      }
    },
      {
        path: '/user/businessInfo',
        component(r){
          require.ensure([], (require) => {
            r(require('./pages/user/businessInfo.vue'))
          }, 'main')
        }
      },
      {
        path: '/user/customer',
        component(r){
          require.ensure([], (require) => {
            r(require('./pages/user/customer.vue'))
          }, 'main')
        }
      },
      {
        path: '/user/customerInfo',
        component(r){
          require.ensure([], (require) => {
            r(require('./pages/user/customerInfo.vue'))
          }, 'main')
        }
      },
        {
          path: '/user/merchantRate',
          component(r){
            require.ensure([], (require) => {
              r(require('./pages/user/merchantRate.vue'))
            }, 'main')
          }
        },
      {
        path: '/business/customer',
        component(r){
          require.ensure([], (require) => {
            r(require('./pages/business/customer.vue'))
          }, 'main')
        }
      },
      {
        path: '/user/business',
        component(r){
          require.ensure([], (require) => {
            r(require('./pages/user/business.vue'))
          }, 'main')
        }
      },
      {
        path: '/business/customerInfo',
        component(r){
          require.ensure([], (require) => {
            r(require('./pages/business/customerInfo.vue'))
          }, 'main')
        }
      },
        {
          path: '/business/personCenter',
          component(r){
            require.ensure([], (require) => {
              r(require('./pages/business/personCenter.vue'))
            }, 'main')
          }
        },
      {
          path: '/business/customerInfo',
          component(r){
            require.ensure([], (require) => {
              r(require('./pages/business/customerInfo.vue'))
            }, 'main')
          }
        },
      {
        path: '/business/merchantRate',
        component(r){
          require.ensure([], (require) => {
            r(require('./pages/business/merchantRate.vue'))
          }, 'main')
        }
      },
      {
        path: 'form',
        component(r) {
          require.ensure([], (require) => {
            r(require('./pages/example/Form.vue'))
          }, 'main')
        }
      },
      {
        path: 'formImageUpload',
        component(r) {
          require.ensure([], (require) => {
            r(require('./pages/example/FormImageUpload.vue'))
          }, 'main')
        }
      }
    ]
  },
  {
      path: '/login',
      component(r) {
        require.ensure([], (require) => {
          r(require('./pages/Login.vue'))
        }, 'main')
      },
      children: []
  },
  {
      path: '/businessLogin',
      component(r) {
        require.ensure([], (require) => {
          r(require('./pages/BusinessLogin.vue'))
        }, 'main')
      },
      children: []
  },
  {
    path: '/producerLogin',
    component(r) {
      require.ensure([], (require) => {
        r(require('./pages/ProducerLogin.vue'))
      }, 'main')
    },
    children: []
  },
  {
      path: '/regist',
      component(r) {
        require.ensure([], (require) => {
          r(require('./pages/Regist.vue'))
        }, 'main')
      },
      children: []
  }
]
export default new VueRouter({
  routes // （缩写）相当于 routes: routes
})
