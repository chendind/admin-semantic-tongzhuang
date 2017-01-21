<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">后台</a>
        <i class="right angle icon divider"></i>
        <router-link to="/user/business" class="section">商户管理</router-link>
        <i class="right angle icon divider"></i>
        <div class="active section">新增商户</div>
      </div>
    </h1>
    <div class="ui form">
      <div class="field">
        <label>商户名称</label>
        <input type="text" placeholder="请输入商户名称" v-model="name">
      </div>
      <div class="fields">
        <div class="six wide field">
          <label>头像</label>
          <div class="ui action input">
            <input type="text" placeholder="请输入图片url" v-model="headImg">
            <button class="ui button" @click="show('#imageChooseModal','headImg')">选择图片</button>
          </div>
          <img :src="headImg" v-show="headImg" class="ui image small mv10">
        </div>
      </div>
      <div class="fields">
        <div class="six wide field">
          <label>背景图片</label>
          <div class="ui action input">
            <input type="text" placeholder="请输入图片url" v-model="backImg">
            <button class="ui button" @click="show('#imageChooseModal','backImg')">选择图片</button>
          </div>
          <img :src="backImg" v-show="backImg" class="ui image small mv10">
        </div>
      </div>
      <div class="fields">
        <div class="field">
          <label>地点</label>
          <input type="text" placeholder="如：浙江 杭州" v-model="location">
        </div>
        <div class="field">
          <label>负责人</label>
          <input type="text" placeholder="请输入负责人" v-model="principal">
        </div>
        <div class="field">
          <label>联系电话</label>
          <input type="text" placeholder="请输入联系电话" v-model="phone">
        </div>
        <div class="field">
          <label>经营产品</label>
          <input type="text" placeholder="请输入经营产品" v-model="product">
        </div>
      </div>
      <div class="field">
        <label>介绍</label>
        <tinymce height="400"></tinymce>
      </div>
      <div class="field after">
        <button class="ui positive right labeled icon right floated button" @click="editBusiness()">
          <i class="checkmark icon"></i>
          {{$route.query.id?'保存修改':'新增'}}
        </button>
        <button class="ui right floated button">取消</button>
      </div>
    </div>
    <image-choose-modal id="imageChooseModal" v-on:finishChoose="finishChoose" :target="target"></image-choose-modal>
  </div>

</template>

<script>
import tinymce from 'components/tinymce/Tinymce.vue'
import imageChooseModal from 'components/ImageChooseModal.vue'
import ajax from 'src/ajax/ajax.js'
export default {
  name: 'businessInfo',
  components: {
    tinymce,
    imageChooseModal
  },
  methods:{
    show(selector, img){
      $(selector).modal('show')
      this.target = img
    },
    finishChoose(src,target){
      this[target] = src;
    },
    editBusiness(){
      // id,name,headImg,backImg,location,product,phone,introduction,principal
      $.when(ajax.editBusiness(this.$route.query.id,this.name,this.headImg,this.backImg,this.location,this.product,this.phone,this.introduction,this.principal)).done(function(data){
        if(data.state == 0){

        }
      })
    }
  },
  data () {
    return {
      target:"",
      name:"西柚科技奶茶店",headImg:"",backImg:"",location:"浙江 杭州",product:"零食",phone:"13000000000",introduction:"呵呵",principal:"葛牡丹"
    }
  },
  mounted(){

  }
}
</script>

<style scoped>

</style>
