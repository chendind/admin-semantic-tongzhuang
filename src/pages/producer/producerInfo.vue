<template>
  <div>
    <div class="tagBox">
      <div class="circle"></div>
      <span>厂家资料</span>
    </div>

    <div class="infoBox">
        <img :src="img" alt="">
        <div class="infoBox_text">
            <div class="infoBox_col">
              <label>厂家名称：</label>
              <span>{{ name }}</span>
            </div>
            <div class="infoBox_col">
              <label>厂家地址：</label>
              <span>{{ addr }}</span>
            </div>
        </div>
    </div>

    <div class="editBox">
      <div class="editBox_Col">
        <div class="editBox_L">
          <span>基本信息</span>
          <div class="loginName">
            <label>登录用户名</label>
            <input type="text" v-model="userCode">
          </div>
          <div class="userDetail">
            <label>详情介绍</label>
            <textarea type="text" v-model="userInfo"></textarea>
          </div>
        </div>
        <div class="confirmBox">
          <div class="changeInfo" @click="confirmChangeInfo">保存修改</div>
        </div>
      </div>
      <div class="editBox_Col">
        <div class="editBox_R">
          <span>修改密码</span>
          <div class="editBox_R_col">
            <label>旧密码</label>
            <input type="text" name="old-pwd" v-model="oldpwd">
          </div>
          <div class="editBox_R_col">
            <label>新密码</label>
            <input type="password" name="new-pwd" v-model="newpwd">
          </div>
          <div class="editBox_R_col">
            <label>确认密码</label>
            <input type="password" name="re-pwd" v-model="repwd">
          </div>
        </div>
        <div class="confirmBox">
          <div class="changePsd" @click="confirmChangePsd">确认修改</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ajax from 'src/ajax/ajax.js'

export default {
  name: 'person-center',
  data () {
      return {
        userCode: null,
        userInfo: null,
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
    getInfo() {
       ajax.getProducerInfo().done((data)=>{
        this.img = data.data.photo;
        this.name = data.data.name;
        this.userCode = data.data.code;
        this.userInfo = data.data.detail;
        this.addr = data.data.address;
        this.detail = data.data.detail;
      });
    },

    confirmChangePsd(){
      if (this.oldpwd=='') {
        xy.toast("请输入原密码")
      }
      else if(this.newpwd==''){
        xy.toast("请输入新密码")
      }
      else if(this.repwd==''){
        xy.toast("请确认密码")
      }
      else if(this.newpwd != this.repwd){
        xy.toast("确认密码有误")
      }
      else{
        ajax.producerPsd(this.oldpwd, this.repwd).done((data) => {
             if(data.state == 0) {
               xy.toast("密码修改完成");
               this.newpwd = null;
               this.repwd = null;
             }
             // else {
             //   xy.toast("密码修改失败,可能原密码有误")
             // }
          })
      }
    },

    confirmChangeInfo() {
      if(this.$parent.username === this.userCode) {
        ajax.producerChangeDetail(this.userInfo).done((data) => {
          xy.toast("厂家详情已修改完成");
          this.getInfo();
        })
      }
      else
      {
        ajax.producerChangeDetail(this.userInfo,this.userCode).done((data) => {
          xy.toast("厂家登录名与详情已修改完成");
        })
      }

    }
  },

  created(){
    this.getInfo();
  },

  mounted() {}

}
</script>

<style scoped>
  .field{
    clear: none !important;
  }

.tagBox {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.circle {
  background: #ffffff;
  border: 1px solid #44bfff;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  position: absolute;
}

.tagBox span{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  line-height: 22px;
  color: #44bfff;
  margin-left: 16px;
}

.infoBox {
  margin-top: 20px;
  height: 100px;
}

.infoBox img {
  width: 100px;
  height: 100px;
  position: absolute;
}

.infoBox_text {
  margin-left: 120px;
  padding-top: 23px;
}

.infoBox_col {
  margin-bottom: 10px;
}

.infoBox_col label {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 22px;
  color: #777777;
}

.infoBox_col span {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 22px;
  color: #333333;
}

.editBox {
  margin-top: 20px;
  overflow: hidden;
}

.editBox_Col {
  float: left;
}

.editBox_L {
  background: #fdfdff;
  border: 1px solid #f3f3f3;
  width: 498px;
  height: 230px;
  padding: 10px 20px;
}

.editBox_L label {
  width: 70px;
  text-align: right;
}

.loginName,.userDetail,.editBox_R_col {
  margin-top: 20px;
}

.loginName input {
  margin-left: 80px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  width: 378px;
  height: 38px;
  padding: 10px;
}

.userDetail textarea {
  margin-left: 80px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  width: 378px;
  height: 98px;
}

.editBox_L span,.editBox_R span {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
}

.editBox_L label,.editBox_R label {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 40px;
  color: #777777;
  position: absolute;
}

.editBox_L input,.editBox_R input,.editBox_L textarea {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333333;
  padding: 10px;
}

.editBox_R {
  background: #fdfdff;
  border: 1px solid #f3f3f3;
  width: 498px;
  height: 230px;
  margin-left: 20px;
  padding: 10px 20px;
}

.editBox_R label {
  width: 56px;
  text-align: right;
}

.editBox_R input {
  margin-left: 66px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  width: 392px;
  height: 38px;
}

.confirmBox {
  margin: 40px 0;
  width: 500px;
}

.changeInfo, .changePsd{
  background: #44bfff;
  border-radius: 100px;
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #ffffff;
  line-height: 22px;
  cursor: pointer;
  margin-left: 190px;
}
</style>



