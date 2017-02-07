<template>
  <div class="bg">
    <div class="ui middle aligned center aligned grid" style="height: 80%;">
      <div class="column" style="max-width: 350px;">
        <h2 class="ui teal image header">
          <img src="~assets/logo.png" class="image">
          <div class="content">
            管理员注册
          </div>
        </h2>
        <div class="ui large form">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="name" placeholder="用户名" v-model="name">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="nickname" placeholder="昵称" v-model="nickname">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="密码" v-model="password">
              </div>
            </div>
            <div class="ui fluid large teal button" @click="regist()">注册</div>
          </div>
          <router-link to="/login">已有帐号，去登录</router-link>
          <div class="ui error message"></div>

        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'main',
  methods:{
    regist(){
      var self = this;
      $.ajax({
        url: 'http://tongzhuang.moovi-tech.com/register',
        type: 'post',
        data: {
          name: self.name,
          nickname: self.nickname,
          password: self.password
        },
        success: function(){

        }
      })
      // window.location.hash = '/';
    }
  },
  data () {
    return {
      name: 'admin',
      nickname: '小柚子',
      password: '123456'
    }
  },
  mounted(){

  }
}
</script>

<style scoped>
.bg{
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('~assets/home-bg.jpg');
  background-size: cover;
  background-position: center;
}
</style>
