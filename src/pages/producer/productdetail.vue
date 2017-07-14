<template>

  <div>
    <div class="tagBox">
      <div class="circle"></div>
      <span>{{$route.query.id?'编辑产品':'新增产品'}}</span>
    </div>

    <div class="editBox">
      <div class="contentBox">
        <div class="contentCol">
          <label>产品名称</label>
          <input type="text" placeholder="请输入商品名称" v-model="name">
        </div>
        <div class="contentCol">
          <label>产品材料</label>
          <input type="text" placeholder="请输入商品材料" v-model="material">
        </div>
        <div class="contentCol">
          <div class="labelContent"><label>产品详情</label></div>
          <textarea v-model="text"></textarea>
        </div>
      </div>
      <div class="imgBox">
        <div class="imgArea1">
          <div class="imgLarge">
            <img :src="img" alt="">
            <div class="sizeLarge">
              <span>200px * 200px</span>
            </div>
          </div>
          <div class="imgBtnBox">
            <div class="imgBtn" @click="show('#imageChooseModal')">选择图片</div>
          </div>
        </div>
        <div class="imgArea2">
          <div class="imgSmall">
            <img :src="img" alt="">
            <div class="sizeSmall">
              <span>50px * 50px</span>
            </div>
          </div>
          <div class="imgMid">
            <img :src="img" alt="">
            <div class="sizeMid">
              <span>100px * 100px</span>
            </div>
          </div>
        </div>
      </div>
    </div>

     <!--  <div class="field" style="width: 100%">
        <label>产品详情</label>
        <tinymce height="300" ref="tinymce"></tinymce>
      </div> -->
    <div class="saveBtn">
      <button @click="editProduct()" class="confirmBtn">
        {{$route.query.id?'保存修改':'新增'}}
      </button>
    </div>
       <!--  <router-link to="/producer/productManage" v-if="usertype === 'producer'">取消</router-link>
        <router-link to="/producer/producerManage" v-if="usertype === 'back'">取消</router-link> -->

  </div>

</template>

<script>
// import tinymce from 'components/tinymce/Tinymce.vue'
import ajax from 'src/ajax/ajax.js'
import router from 'src/router.js'
export default {
  name: 'bussiness',
  components: {
    // tinymce,
  },
  methods:{
    show(selector){
      window.BusVue.$emit('show:image-choose-modal')
      let promise = new Promise((resolve, reject) => {
        window.BusVue.$once('finishChoose:image-choose-modal', (src) => {
          resolve(src)
        })
      })
      promise.then((src) => {
        this.img = src
      })
    },
    editProduct(){
      // id,name,material,detail,img

        $.when(ajax.buildProcuct(this.$route.query.id,this.name,this.img,this.material,this.text)).done((data)=>{
          if(data.state == 0){
            router.push({path:"/producer/productManage"});
          }
        });
    }
  },
  data () {
    return {
      name: null,
      material: null,
      detail: null,
      img: null,
      usertype: null,
      text: null
    }
  },
  created: function(){
    this.usertype = window.localStorage.getItem('usertype');
    if(this.$route.query.id){
      ajax.getProductInfo(this.$route.query.id).done((data)=>{
        if(data.state == 0){
          this.name = data.data.name;
          this.material = data.data.material;
          this.text = data.data.detail;
          this.img = data.data.photo;
        }
      })
    }
  },
  mounted(){}
}
</script>

<style scoped>
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

.contentBox {
  float: left;
}

.contentCol {
  margin-bottom: 20px;
}

.contentCol label {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 20px;
  color: #777777;
}

.contentCol input {
  margin-left: 10px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  width: 612px;
  height: 38px;
  padding: 10px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
}

.contentCol textarea {
  margin-left: 10px !important;
  background: #ffffff;
  border: 1px solid #eeeeee;
  width: 612px;
  height: 138px;
  padding: 10px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
}

.labelContent {
  float: left;
}

.editBox {
  margin: 20px 0;
  overflow: hidden;
}

.imgBtnBox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  cursor: pointer;
}

.imgBtn {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 20px;
  color: #44bfff;
}

.confirmBtn {
  background: #44bfff;
  border-radius: 100px;
  width: 120px;
  height: 40px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
  border: none;
}

.imgBox {
  margin-left: 30px;
  float: left;
}

.imgArea1 {
  float: left;
}

.imgLarge img {
  width: 200px;
  height: 200px;
}

.imgArea2 {
  float: left;
  margin-left: 20px;
}

.imgMid img {
  width: 100px;
  height: 100px;
}

.imgSmall {
  margin: 0 0 20px 0;
}

.imgSmall img {
  width: 50px;
  height: 50px;
}

.sizeLarge, .sizeMid, .sizeSmall {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  line-height: 17px;
  color: #999999;
  letter-spacing: 0;
  text-align: left;
}

.sizeLarge {
  display: flex;
  align-items: center;
  justify-content: center;
}

.saveBtn{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
