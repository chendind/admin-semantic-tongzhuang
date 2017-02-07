<template>
  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <div class="section">商家</div>
        <i class="right angle icon divider"></i>
        <div class="section">个人信息</div>
        <i class="right angle icon divider"></i>
        <router-link to="/my" class="active section">基本信息</router-link>
      </div>
    </h1>
    <div class="my-page">
      <div class="my-card">
        <div class="ui card" v-if="data.headImg">
          <div class="image">
            <img :src="data.headImg">
          </div>
          <div class="content">
            <a class="header">{{data.name}}</a>
            <div class="meta">
              <span class="date">{{data.code}}</span>
            </div>
            <div class="description">
              {{data.principal}}
            </div>
          </div>
          <div class="extra content">
            <a>
              <i class="volume control phone icon"></i>
              {{data.phone}}
            </a>
          </div>
        </div>
      </div>
      <div class="my-content">
        <form class="ui form">
          <div class="field">
            <label>主营产品</label>
            <input type="text" placeholder="" v-model="data.product">
          </div>
          <div class="field">
            <label>公司地址</label>
            <input type="text" placeholder="" v-model="data.location">
          </div>
          <div class="field">
            <label>详情介绍</label>
            <tinymce ref="editor"></tinymce>
          </div>
          <button class="ui button" type="submit" @click="submit">修改信息</button>
        </form>
      </div>
    </div>
    <h3 class="ui header">修改密码</h3>
    <div class="ui form">
        <div class="field">
            <label>旧密码</label>
            <input type="password" name="old-pwd" v-model="oldpwd">
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
  import {getMerchant, editMerchant,merchantChangePassword} from 'src/ajax/ajax_business.js'
  import tinymce from 'components/tinymce/Tinymce.vue'
  export default {
    components: {
      tinymce
    },
    data(){
      return {
        data: {

        },
        oldpwd: "",
        newpwd: "",
        repwd: ""
      }
    },
    methods: {
      submit(){
        editMerchant(this.data).then(()=>{
          alert('修改成功')
          window.location.reload()
        }).catch(e=>{
          xy.alert('修改失败' + (e.message ? ':' + e.message : ''))
        })
      },
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
          merchantChangePassword(this.oldpwd, this.newpwd).then((data)=>{
            xy.toast('修改成功')
          }).catch(e=>{
            xy.alert('修改失败' + (e.message ? ':' + e.message : ''))
          })
        }
      }
    },
    beforeRouteEnter(to, from, next){
      getMerchant().then(res => {
        next($vm => {
          $vm.data = res
          $vm.$refs.editor.setContent($vm.data.introduction)
        })
      })
    }
  }
</script>
<style lang="less">
  .my-page {
    position: relative;
    padding-left: 300px;

    .ui.form .field {
      clear: right;
    }

    .my-card {
      position: absolute;
      left: 0px;
      top: 0px;
    }
  }
</style>
