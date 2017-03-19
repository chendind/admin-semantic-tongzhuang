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
    <div class="x-main-content">
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
        <div class="item">
          <router-link to="/message" class="title"><b>消息推送</b></router-link>
        </div>
        <div class="item" v-if="usertype == 'back'">
          <router-link to="/personCenter" class="title"><b>个人中心</b></router-link>
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
      <div class="ui fluid floated" style="margin-left: 280px;">
        <router-view></router-view>
      </div>
    </div>
    <!-- <div class="ui small modal" id="modal-editUnit">
      <div class="header">新增轮播图</div>
      <div class="content">
        <div class="item">
          <div class="image">
              <img src="~src/assets/default.png" alt="">
              <div class="ui container center aligned">
                <div class="ui center aligned blue button mv10" @click="show('#imageChooseModal')">
                  选择一张图片
                </div>
              </div>
          </div>
          <div class="content">
            <div class="ui form">
              <div class="field">
                <label>对应商品id</label>
                <input type="text" placeholder="请输入商品名称" v-model="addCarousel.goodId">
              </div>
              <div class="field">
                <label>播放顺序</label>
                <input type="text" placeholder="请输入商品描述" v-model="addCarousel.order">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui button" @click="modal_hide('#modal-editUnit')">取消</div>
        <div class="ui green button" @click="editUnit_save()">保存</div>
      </div>
    </div>
    <div class="ui small modal" id="modal-editCarousel">
      <div class="header">编辑轮播图</div>
      <div class="content">
        <div class="item">
          <div class="image">
              <img :src="editCarousel.img" alt="">
              <div class="ui container center aligned">
                <div class="ui center aligned blue button mv10" @click="show('#imageChooseModal')">
                  选择一张图片
                </div>
              </div>
          </div>
          <div class="content">
            <div class="ui form">
              <div class="field">
                <label>对应商品id</label>
                <input type="text" placeholder="请输入商品名称" v-model="editCarousel.goodId">
              </div>
              <div class="field">
                <label>播放顺序</label>
                <input type="text" placeholder="请输入商品描述" v-model="editCarousel.order">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui button" @click="modal_hide('#modal-editUnit')">取消</div>
        <div class="ui green button" @click="editUnit_save()">保存</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import router from 'src/router.js'
import ajax from 'src/ajax/ajax.js'
export default {
  name: 'main',
  methods:{
    logout(){
      ajax.logout().done((data)=>{
        if(data.state == 0){
          if(this.usertype == 'back'){
            router.push({
              path: '/login'
            })
          }
          else{
            router.push({
              path: '/businessLogin'
            })
          }
        }
      })
    }
  },
  data () {
    return {
      username: window.localStorage.getItem('username'),
      usertype: window.localStorage.getItem('usertype'),
      addCarousel: {
        img: "",
        goodId: "",
        order: ""
      },
      editCarousel: {
        img: "",
        goodId: "",
        order: ""
      }
    }
  },
  mounted(){
    $('.accordion').accordion()
    $('#userDrapdown').dropdown()
  }
}
</script>

<style>
.x-main-content{
  position: relative;
  margin-top: 56px;
  padding: 15px;
}
</style>
