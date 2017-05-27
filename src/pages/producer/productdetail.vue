<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <router-link to="/producer/productManage" class="section" v-if="usertype === 'producer'">产品管理</router-link>
        <router-link to="/producer/producerManage" class="section" v-if="usertype === 'back'">厂家管理</router-link>
        <i class="right angle icon divider"></i>
        <div class="active section">{{$route.query.id?'产品详情':'新增产品'}}</div>
      </div>
    </h1>
    <div class="ui items">
      <div class="item">
        <div class="image">
            <img :src="img" alt="">
            <div class="ui container center aligned">
              <div class="ui center aligned blue button mv10" @click="show('#imageChooseModal')">
                选择一张图片
              </div>
            </div>
        </div>
        <div class="content">
          <div class="ui form">
            <div class="field">
              <label>产品名称</label>
              <input type="text" placeholder="请输入商品名称" v-model="name">
            </div>
            <div class="field">
              <label>产品材料</label>
              <input type="text" placeholder="请输入商品材料" v-model="material">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui form">
      <div class="field" style="width: 100%">
        <label>产品详情</label>
        <tinymce height="300" ref="tinymce"></tinymce>
      </div>
      <div class="field after">
          <button class="ui positive right labeled icon right floated button" @click="editProduct()">
            <i class="checkmark icon"></i>
            {{$route.query.id?'保存修改':'新增'}}
          </button>
          <router-link to="/producer/productManage" class="ui right floated button" v-if="usertype === 'producer'">取消</router-link>
          <router-link to="/producer/producerManage" class="ui right floated button" v-if="usertype === 'back'">取消</router-link>
      </div>
    </div>

    <image-choose-modal id="imageChooseModal" v-on:finishChoose="finishChoose"></image-choose-modal>
  </div>

</template>

<script>
import tinymce from 'components/tinymce/Tinymce.vue'
import imageChooseModal from 'components/ImageChooseModal.vue'
import ajax from 'src/ajax/ajax.js'
import router from 'src/router.js'
export default {
  name: 'bussiness',
  components: {
    tinymce,
    'image-choose-modal': imageChooseModal
  },
  methods:{
    show(selector){
      $(selector).modal('show')
    },
    finishChoose(src){
      this.img = src
    },
    editProduct(){
      // id,name,material,detail,img
      
        $.when(ajax.buildProcuct(this.$route.query.id,this.name,this.img,this.material,this.$refs.tinymce.getContent())).done((data)=>{
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
    }
  },
  created: function(){
    this.usertype = window.localStorage.getItem('usertype');
    if(this.$route.query.id){
      ajax.getProductInfo(this.$route.query.id).done((data)=>{
        if(data.state == 0){
          this.name = data.data.name;
          this.material = data.data.material;
          this.$refs.tinymce.setContent(data.data.detail);
          this.img = data.data.photo;
        }
      })
    }
  },
  mounted(){}
}
</script>

<style scoped>

</style>
