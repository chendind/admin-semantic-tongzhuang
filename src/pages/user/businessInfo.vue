<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">后台</a>
        <i class="right angle icon divider"></i>
        <router-link to="/user/business" class="section">商户管理</router-link>
        <i class="right angle icon divider"></i>
        <div class="active section">{{$route.query.id?"商户详情":"新增商户"}}</div>
      </div>
    </h1>
    <div class="ui form">
      <div class="field">
        <label>商户名称</label>
        <input type="text" placeholder="请输入商户名称" v-model="data.name">
      </div>
      <div class="fields">
        <div class="six wide field">
          <label>头像</label>
          <div class="ui action input">
            <input type="text" placeholder="请输入图片url" v-model="data.headImg">
            <button class="ui button" @click="show('#imageChooseModal','data.headImg')">选择图片</button>
          </div>
          <img :src="data.headImg" v-show="data.headImg" class="ui image small mv10">
        </div>
      </div>
      <div class="fields">
        <div class="six wide field">
          <label>背景图片</label>
          <div class="ui action input">
            <input type="text" placeholder="请输入图片url" v-model="data.backImg">
            <button class="ui button" @click="show('#imageChooseModal','data.backImg')">选择图片</button>
          </div>
          <img :src="data.backImg" v-show="data.backImg" class="ui image small mv10">
        </div>
      </div>
      <div class="fields">
        <div class="field">
          <label>地点</label>
          <input type="text" placeholder="如：浙江 杭州" v-model="data.location">
        </div>
        <div class="field">
          <label>负责人</label>
          <input type="text" placeholder="请输入负责人" v-model="data.principal">
        </div>
        <div class="field">
          <label>联系电话</label>
          <input type="text" placeholder="请输入联系电话" v-model="data.phone">
        </div>
        <div class="field">
          <label>经营产品</label>
          <input type="text" placeholder="请输入经营产品" v-model="data.product">
        </div>
      </div>
      <div class="field">
        <label>介绍</label>
        <tinymce height="400" ref="tinymce"></tinymce>
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
import router from 'src/router.js'
export default {
  name: 'businessInfo',
  components: {
    tinymce,
    imageChooseModal
  },
  methods:{
    show(selector, target){
      $(selector).modal('show')
      this.target = target
    },
    finishChoose(src,target){
      console.log('this.'+target+"='"+src+"'")
      eval('this.'+target+"='"+src+"'")
    },
    editBusiness(){
      console.log(this.$refs.tinymce.getContent())
      // id,name,headImg,backImg,location,product,phone,introduction,principal
      ajax.editBusiness(
        this.$route.query.id,
        this.data.name,
        this.data.headImg,
        this.data.backImg,
        this.data.location,
        this.data.product,
        this.data.phone,
        this.data.code,
        this.$refs.tinymce.getContent(),
        this.data.principal
      ).done(function(data){
        if(data.state == 0){
          router.push({path:'/user/business'})
        }
      })
    }
  },
  data () {
    return {
      target:"",
      data:{
        name:"",headImg:"",backImg:"",location:"",product:"",phone:"",code: "",introduction:"",principal:""
      }

    }
  },
  mounted(){
    if(this.$route.query.id){
      $.when(ajax.getBusinessById(this.$route.query.id,'back')).done((data)=>{
        this.data = data
        this.$refs.tinymce.setContent(this.data.introduction)
      })
    }
  }
}
</script>

<style scoped>

</style>
