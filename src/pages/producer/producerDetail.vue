<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <router-link to="/producer/producerManage" class="section">厂家管理</router-link>
        <i class="right angle icon divider"></i>
        <div class="active section">{{$route.query.id?'厂家详情':'新增厂家'}}</div>
      </div>
    </h1>

    <div class="ui form">
      <div class="fields">
        <div class="six wide field">
          <label>厂家名称</label>
          <input type="text" placeholder="请输入厂家名称" v-model="name">
        </div>
      </div>
      <div class="fields">
        <div class="six wide field">
          <label厂家照片</label>
          <div class="ui action input">
            <input type="text" placeholder="请输入图片url" v-model="img">
            <button class="ui button" @click="show('#imageChooseModal','data.headImg')"> {{$route.query.id?'修改图片':'添加图片'}}</button>
          </div>
          <img :src="img" v-show="img" class="ui image small mv10">
        </div>
      </div>
      <div class="fields">
        <div class="field">
          <label>厂家地址</label>
          <input type="text" placeholder="如：浙江 杭州" v-model="addr">
        </div>
        <div class="field">
          <label>负责人</label>
          <input type="text" placeholder="请输入负责人" v-model="principal">
        </div>
        <div class="field">
          <label>联系方式</label>
          <input type="text" placeholder="请输入联系电话" v-model="contact">
        </div>
      </div>
      <div class="field">
        <label>详情介绍</label>
        <tinymce height="300" ref="tinymce"></tinymce>
      </div>
      <div class="field after">
        <button class="ui positive right labeled icon right floated button" @click="editProducer()">
          <i class="checkmark icon"></i>
          {{$route.query.id?'保存修改':'新增'}}
        </button>
      </div>
    </div>

    <div class="ui breadcrumb">
        <div class="active section">产品列表</div>
      </div>

    <table class="ui celled table" v-if="$route.query.id">
      <thead>
        <tr>
          <th>产品id</th>
          <th>产品详情</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(good,$index) in products">
          <td>
            {{good.id}}
          </td>
          <td>
            <router-link :to="{path:'/producer/productdetail',query:{id:good.id}}" class="ui image header">
              <img class="ui rounded top aligned tiny image" :src="good.photo">
              <div class="content">
                {{good.name}}
                <div class="sub header">评价次数{{good.evaluationModel.sum}}</div>
              </div>
            </router-link>
          </td>
          <td>
            <div class="ui red button" @click="deleteProduct($index)">删除</div>
            <router-link :to="{path:'/producer/productRate',query:{id:good.id}}" class="ui">
              <div class="ui button">查看评价</div>
            </router-link>
            <div class="ui button" @click="codeView(good.name,good.id)">二维码</div>
          </td>
        </tr>
      </tbody>
    </table>
      
   
      <div class="ui modal producerCode" id="producerCode">
        <i class="remove link icon" @click="disableCode" id="closeIcon"></i>
        <div class="image content">
            <div id="qrcode"></div>
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
    editProducer(){
      // id,name,material,detail,img
      
        $.when(ajax.buildProducer(this.$route.query.id,this.name,this.addr,this.principal,this.contact,this.$refs.tinymce.getContent(),this.img)).done((data)=>{
          if(data.state == 0){
              router.push('/producer/producerManage');
          }
        });
    },
    disableCode () {
       $('.producerCode').modal('hide');
    },
    pageChange(index){
      this.getGoods(this.length*(index-1), this.length)
      this.current = index
    },
    deleteProduct(index){
      let id = this.products[index].id;
      xy.confirm('确定要删除这个产品吗？',(button)=>{
        if(button == 1){
          xy.toast('删除中...')
          ajax.deleteProduct(id).done((data)=>{
            if(data.state == 0){
              xy.toast('删除成功')
              this.products.splice(index,1)
              debugger
              ajax.getProducerList().done((data)=>{
              this.products = data.data[this.$route.query.index].goods;
              })
            }
          })
        }
      });
    },
    codeView(name,index) {  

      $('.producerCode').modal('show');

        $('#qrcode').empty();
      if(!$('#qrcode').html()){
        $('#qrcode').html("<div style='margin-bottom:20px'> " + name +"</div>");

        let buf = {
          type: "product",
          url: "http://tongzhuang.moovi-tech.com/index.html#/product_info?id=" + index
        };// JSON.parse();
        buf = JSON.stringify(buf);
        $('#qrcode').qrcode(buf);

      }
    }
  },
  data () {
    return {
      products: [],
      name: null,
      addr: null,
      principal: null,
      contact: null,
      img: null,
      length: 10,
      total: 0,
      current: 1
    }
  },
  created (){
    
  },
  mounted(){
    //just for an UI bug
      $('#qrcode').empty();
      if(!$('#qrcode').html()){
        $('#qrcode').html("<div></div>");
        $('#qrcode').qrcode("http://tongzhuang.moovi-tech.com/index.html#/product_info?id=");
      }
   //end here

    if(this.$route.query.id){
      ajax.getProducerList().done((data)=>{
        this.products = data.data[this.$route.query.index].goods;
        this.name = data.data[this.$route.query.index].name;
        this.addr = data.data[this.$route.query.index].address;
        this.principal = data.data[this.$route.query.index].principal;
        this.contact = data.data[this.$route.query.index].contact;
        this.img = data.data[this.$route.query.index].photo;
        
          this.$refs.tinymce.setContent(data.data[this.$route.query.index].detail);
      })
    }
  },

   beforeDestroy: function () {
                $('#producerCode').remove();
            },
}
</script>

<style scoped>
#producerCode {
  width: 300px;
 left: 50%;
 margin-left: -150px;
}
#closeIcon {
  position: absolute;
  left: 275px;
  top: 10px;
}
</style>
