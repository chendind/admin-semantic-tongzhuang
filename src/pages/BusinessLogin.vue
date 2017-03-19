<template>
  <div class="bg">
    <div class="ui middle aligned center aligned grid" style="height: 80%;">
      <div class="column" style="max-width: 350px;">
        <h2 class="ui teal image header">
          <img src="~assets/logo.png" class="image">
          <div class="content">
            商户登录
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
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="密码" v-model="password">
              </div>
            </div>
            <div class="ui fluid large teal button" @click="login()">登录</div>
          </div>

          <div class="ui error message"></div>

        </div>
        <a href="#/login">管理员登录</a>
      </div>
    </div>
  </div>

</template>
<script>
import {login, getMerchant} from 'src/ajax/ajax_business.js'
import router from 'src/router.js'
export default {
  name: 'main',
  methods:{
    login(){
      var self = this;
      login(this.name, this.password).then((res)=>{
        window.localStorage.setItem('username',this.name);
        window.localStorage.setItem('usertype','merchant');
        getMerchant().then(res => {
          window.localStorage.setItem('userid',res.id)
          router.push({path: '/'})
        })

      })
      // .catch(e=>{
      //   alert(e.message)
      // })
    }
  },
  data () {
    return {
      name: '',
      nickname: '',
      password: ''
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
