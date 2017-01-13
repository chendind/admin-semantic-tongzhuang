<template>

  <div>
    <div class="ui fixed menu">
      <div class="ui fluid container">
        <div class="item">
          <a class="ui logo icon image">
            <img style="width: 30px;" src="~assets/logo.png" alt="">
          </a>
          童装后台管理系统
        </div>
        <div class="item right">
          <div id="userDrapdown" class="ui inline dropdown">
            <div class="title">
              <img class="ui avatar image" style="width: 30px;" src="~assets/eve.png" alt="">
              小柚子
              <i class="dropdown icon"></i>
            </div>
            <div id="userMenu" class="menu" tabindex="-1">
              <div class="item">
                <i class="settings icon"></i>
                帐号设置
              </div>
              <router-link to="/login" class="item">
                <i class="sign out icon"></i>
                退出登录
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="x-main-content">
      <div class="ui sidebar sticky accordion vertical menu left visible floated" style="">
        <div class="item">
            <router-link to="goods" class="title"><b>商品管理</b></router-link>
        </div>
        <div class="item">
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
        <div class="item">
            <a class="title"><i class="dropdown icon"></i> <b>用户管理</b></a>
            <div class="content menu">
              <router-link to="/user/customer" class="item">
                客户管理
              </router-link>
              <router-link to="/user/business" class="item">
                商户管理
              </router-link>
            </div>
        </div>
        <div class="item">
            <router-link to="/message" class="title"><b>消息推送</b></a>
        </div>
        <div class="item">
            <router-link to="/personCenter" class="title"><b>个人中心</b></router-link>
        </div>
        <div class="item">
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
        </div>
      </div>
      <div class="ui fluid floated" style="margin-left: 280px;">
          <router-view></router-view>
      </div>
    </div>
      
      
  </div>
</template>

<script>
export default {
  name: 'main',
  methods:{
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    $(".accordion").accordion();
    $("#userDrapdown").dropdown()
  }
}
</script>

<style>
.x-main-content{
  margin-top: 56px;
  padding: 15px;
}
</style>
