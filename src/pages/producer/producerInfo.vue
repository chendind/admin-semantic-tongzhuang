<template>
  <div>
    <div class="ui items">
      <div class="item">
        <div class="image">
            <img :src="img" alt="">
        </div>
        <div class="content">
          <div class="ui form">
            <div class="field">
              <label>厂家名称</label>
              <span>{{ name }}</span>
            </div>
            <div class="field">
              <label>厂家地址</label>
              <span>{{ addr }}</span>
            </div>
          </div>
        </div>
      </div>
        <div class="content">
          <div class="ui form">
            <div class="field">
              <label>详细信息</label>
              <tinymce height="300" ref="tinymce" :disabled="true"></tinymce>
            </div>
          </div>
        </div>
    </div>
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
            <label>确认密码</label>
            <input type="password" name="re-pwd" v-model="repwd">
        </div>
        <div class="after">
          <button class="ui button" @click="changePass">
            确定
          </button>
        </div>
    </div>
  </div>
</template>


<script>
import ajax from 'src/ajax/ajax.js'
import tinymce from 'components/tinymce/Tinymce.vue'

export default {
  name: 'person-center',
  components: {
    tinymce
  },
  data () {
      return {
        oldpwd:'',
        newpwd:'',
        repwd:'',
        img:  null,
        name: null,
        addr: null,
        detail: null
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
        $.when(ajax.producerPsd(this.oldpwd, this.repwd).done(function(data){
             if(data.state == 0) {
               alert("密码修改完成")
             }
             else {
               alert("密码修改失败,可能原密码有误")
             }
          }))
      } 
    }
  },

  created(){
   ajax.getProducerInfo().done((data)=>{
        console.log(data);
        this.img = data.data.photo;
        this.name = data.data.name;
        this.addr = data.data.address;
        this.$refs.tinymce.setContent(data.data.detail);
        this.detail = data.data.detail;
      });
 

  },

}
</script>

<style scoped>
  .field{
    clear: none !important;
  }
</style>



