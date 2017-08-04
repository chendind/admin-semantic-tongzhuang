<template>

  <div>
    <div class="ui fixed menu" v-if="!(usertype == 'producer')">
      <div class="ui fluid container">
        <div class="item">
          <a class="ui logo icon image">
            <img style="width: 30px;" src="~assets/logo.png" alt="">
          </a>
          童装后台管理系统
        </div>
        <div class="item right">
          <div id="userDrapdown" class="ui inline dropdown">
            <div class="title" style="min-width: 120px">
              <img class="ui avatar image" style="width: 30px;" src="~assets/eve.png" alt="">
              {{username}}
              <i class="dropdown icon"></i>
            </div>
            <div class="menu">
              <div class="item">
                <i class="settings icon"></i>
                帐号设置
              </div>
              <a class="item" @click="logout()">
                <i class="sign out icon"></i>
                退出登录
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="topBar" v-if="usertype == 'producer'">
      <div class="headLogo">
        <img class="picLogo" src="~assets/hangwei.png" alt="">
        <span class="titleLogo">行微科技</span>
      </div>
      <div class="welComeTag">
        <span class="nameTag">{{username}}</span>
        <span class="msgTag">欢迎来到行微平台！</span>
      </div>
      <div class="logoutBox">
        <a @click="logout()">
          <span>退出登录</span>
        </a>
      </div>
    </div>

    <div class="x-main-content" v-if="!(usertype == 'producer')">
      <div class="ui sidebar sticky accordion vertical menu left visible floated">
        <div class="item" v-if="usertype == 'back'">
          <router-link to="/app/carousel" class="title"><b>轮播图管理</b></router-link>
        </div>
        <div class="item" v-if="usertype == 'back'">
          <router-link to="/goods" class="title"><b>商品管理</b></router-link>
        </div>
        <div class="item" v-if="usertype == 'back'">
          <a class="title"><i class="dropdown icon"></i> <b>订单管理</b></a>
          <div class="content menu">
            <router-link to="/order" class="item">
              历史订单
            </router-link>
            <router-link to="/order/orderWait" class="item">
              待处理
            </router-link>
          </div>
        </div>
        <div class="item" v-if="usertype == 'back'">
          <router-link to="/user/customer" class="title"><b>客户管理</b></router-link>
        </div>
        <div class="item" v-if="usertype == 'merchant'">
          <router-link to="/business/customer" class="title"><b>客户管理</b></router-link>
        </div>
        <div class="item" v-if="usertype == 'back'">
          <router-link to="/user/business" class="title"><b>商户管理</b></router-link>
        </div>
        <div class="item" v-if="usertype == 'back'">
          <router-link to="/producer/producerManage" class="title"><b>厂家管理</b></router-link>
        </div>
        <div class="item" v-if="(usertype == 'back') || (usertype === 'merchant')">
          <router-link to="/message" class="title"><b>消息推送</b></router-link>
        </div>
        <div class="item" v-if="usertype == 'back'">
          <router-link to="/personCenter" class="title"><b>个人中心</b></router-link>
        </div>
        <div class="item" v-if="usertype == 'merchant'">
          <router-link to="/business/merchantRate" class="title"><b>我的评价</b></router-link>
        </div>
        <div class="item" v-if="usertype == 'merchant'">
          <router-link to="/business/personCenter" class="title"><b>个人中心</b></router-link>
        </div>
        <!-- <div class="item">
            <a class="title"><i class="dropdown icon"></i> <b>例子</b></a>
            <div class="content menu">
              <router-link to="/business" class="item">
                商品管理
              </router-link>
              <router-link to="/form" class="item">
                表单：文本输入与tinymce
              </router-link>
              <router-link to="/formImageUpload" class="item">
                表单：图片选择器
              </router-link>
            </div>
        </div> -->
      </div>

      <div class="ui fluid floated" style="margin-left: 280px;" v-if="!(usertype == 'producer')">
        <router-view></router-view>
      </div>

    </div>

    <div>

      <div class="producerSiderbar" v-if="usertype == 'producer'">
        <div class="sideCol product" :class="($route.path === '/producer/productManage')?'sideColOn':''">
          <router-link to="/producer/productManage"><i class="iconfont icon-chanpinguanli"></i><span>产品管理</span></router-link>
          <div class="iconBlueBox" :class="($route.path === '/producer/productManage')?'iconBlueBoxOn':''"></div>
        </div>
        <div class="sideCol customer" :class="($route.path === '/producer/customer')?'sideColOn':''">
          <router-link to="/producer/customer"><i class="iconfont icon-kehuguanli"></i><span>客户管理</span></router-link>
          <div class="iconBlueBox" :class="($route.path === '/producer/customer')?'iconBlueBoxOn':''"></div>
        </div>
        <div class="sideCol person" :class="($route.path === '/producer/producerInfo')?'sideColOn':''">
          <router-link to="/producer/producerInfo"><i class="iconfont icon-gerenzhongxin"></i><span>个人中心</span></router-link>
          <div class="iconBlueBox" :class="($route.path === '/producer/producerInfo')?'iconBlueBoxOn':''"></div>
        </div>
        <!-- <div class="sideCol map">
          <router-link to="/producer/map"><i class="iconfont icon-tianjia"></i><span>地图测试</span></router-link>
          <div class="iconBlueBox"></div>
        </div> -->
      </div>

      <div style="margin-left: 200px; padding-left: 30px; padding-right: 30px;" v-if="usertype == 'producer'">
        <router-view></router-view>
      </div>

    </div>
    <image-choose-modal id="image-choose-modal" v-on:finishChoose="imageChooseModal_finishChoose"></image-choose-modal>
  </div>
</template>

<script>
import router from 'src/router.js'
import ajax from 'src/ajax/ajax.js'
import Vue from 'Vue'
import imageChooseModal from 'components/image-choose-modal/ImageChooseModal.vue'
export default {
  name: 'main',
  components: {
    imageChooseModal
  },
  methods:{
    callback(js){
      js && (new Function(js)).call(this)
    },
    imageChooseModal_finishChoose(src){
      BusVue.$emit('finishChoose:image-choose-modal', src)
    },
    logout(){
      ajax.logout().done((data)=>{
        if(data.state == 0){
          if(this.usertype == 'back'){
            router.push({
              path: '/login'
            })
          }
          else if(this.usertype === 'merchant'){
            router.push({
              path: '/businessLogin'
            })
          }
          else if(this.usertype === 'producer'){
            router.push({
              path: '/producerLogin'
            })
          }
        }
      })
    },
  },
  data () {
    return {
      username: window.localStorage.getItem('username'),
      usertype: window.localStorage.getItem('usertype'),
      // addCarousel: {
      //   img: "",
      //   goodId: "",
      //   order: ""
      // },
      // editCarousel: {
      //   img: "",
      //   goodId: "",
      //   order: ""
      // }
      routeNow: null
    }
  },

  mounted(){
    $('.accordion').accordion()
    $('#userDrapdown').dropdown()
    // 消息派发中心
    window.BusVue = new Vue();
    BusVue.$on('show:image-choose-modal', () => {
      $("#image-choose-modal").modal('show')
    })
  }
}
</script>

<style>
.x-main-content{
  position: relative;
  margin-top: 56px;
  padding: 15px;
}

.topBar {
  height: 50px;
  display: flex;
  align-items: center;
  border:1px solid #f3f3f3;
}

.headLogo {
  display: flex;
  align-items: center;
  background-color: #44bfff;
  box-shadow: 2px 0 8px 0 rgba(0,0,0,0.10);
  width: 200px;
  height: 50px;
  left: 0;
  top: 0;
}

.picLogo {
  margin: 0 20px 0 30px;
  width: 44px;
  height: 30px;
}

.titleLogo {
  font-family: "JLinXin";
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: left;
}

.welComeTag {
}

.nameTag {
  margin-left: 30px;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  line-height: 20px;
  color: #44bfff;
}

.msgTag {
  margin-left: 10px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 20px;
  color: #777777;
}

.logoutBox {
  position: absolute;
  right: 30px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
}

.logoutBox span {
  color: #44bfff !important;
}

.producerSiderbar {
  position: absolute;
  left: 0;
  width: 200px;
  height: 800px;
  top: 50px;
  padding-top: 15px;
  background: #ffffff;
  box-shadow: 2px 0 8px 0 rgba(0,0,0,0.10);
}

.sideCol  {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 66px 15px 30px;
}

.sideCol span {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 22px;
  color: #999999;
  margin-left: 20px;
}

.sideCol i {
  color: #999999;
}

.iconBlueBox {
  width: 0;
  height: 0;
}
/*选中模式下的样式*/
.sideColOn span{
  color: #333333 !important;
  margin-left: 20px !important;
}

.sideColOn i{
  color: #44bfff !important;
}

.iconBlueBoxOn {
  width: 2px !important;
  height: 22px !important;
  background: #44bfff;
  box-shadow:0 0 4px 0 #44bfff;
  position: absolute;
  right: 0;
}
</style>
