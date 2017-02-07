<template>
	<div class="bg">
		<div class="ui middle aligned center aligned grid" style="height: 80%;">
		  <div class="column" style="max-width: 350px;">
		    <h2 class="ui teal image header">
		      <img src="~assets/logo.png" class="image">
		      <div class="content">
		        管理员登录
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
		  </div>
		</div>
	</div>

</template>
<script>
import ajax from 'src/ajax/ajax.js'
import router from 'src/router.js'
export default {
  name: 'main',
  methods:{
  	login(){
      var self = this;
      ajax.login(self.name, self.password).done((data)=>{
        if(data.state == 0){
          window.localStorage.setItem('username',this.name)
          window.localStorage.setItem('usertype','back')
          router.push({path: '/'})
          // window.location.href = "/"
        }
      })
  	}
  },
  data () {
    return {
      name: 'xw',
      nickname: '小柚子',
      password: 'xw'
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
