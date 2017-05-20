<template>
  <div>
    <h1 class="ui dividing header">
          <div class="ui breadcrumb">
            <div class="section">后台</div>
            <i class="right angle icon divider"></i>
            <a class="section active">个人中心</a>
          </div>
      </h1>
    <!-- <h3 class="ui header">个人信息</h3>
    <div style="padding-left: 30px;">XXXXXXXXX</div> -->
    <h3 class="ui header">修改密码</h3>
    <div class="ui form">
        <div class="field">
            <label>旧密码</label>
            <input type="text" name="old-pwd" v-model="oldpwd">
        </div>
        <div class="field">
            <label>新密码</label>
            <input type="password" name="new-pwd" v-model="newpwd">
        </div>
        <div class="field">
            <label>再次确认</label>
            <input type="password" name="re-pwd" v-model="repwd">
        </div>
        <div class="after">
          <button class="ui positive button" @click="changePass">
            <i class="checkmark icon"></i>
            确定
          </button>
        </div>
    </div>
  </div>
</template>




<script>
import ajax2 from 'src/ajax/ajax2.js'

export default {
  name: 'person-center',
  data () {
      return {
        oldpwd:'',
        newpwd:'',
        repwd:''
      }
  },
  methods:{
    changePass(){
      if (this.oldpwd=='') {
        alert("请输入原密码")
      }
      else if(this.newpwd==''){
        alert("请输入新密码")
      }
      else if(this.repwd==''){
        alert("请确认密码")
      }
      else if(this.newpwd != this.repwd){
        alert("确认密码有误")
      }
      else{
        $.when(ajax2.adminChangePassword(this.oldpwd, this.repwd).done(function(data){
              alert(data.detail)
          }))
      } 
    }
  }
}
</script>

<style scoped>
  .field{
    clear: none !important;
  }
</style>



