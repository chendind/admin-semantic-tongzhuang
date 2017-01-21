<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <div class="section">后台</div>
        <i class="right angle icon divider"></i>
        <router-link to="/goods" class="section">商品管理</router-link>
        <i class="right angle icon divider"></i>
        <div class="active section">{{$route.query.id?'商品详情':'新增商品'}}</div>
      </div>
    </h1>
    <div class="ui items">
      <div class="item">
        <div class="image">
            <img :src="img.src" alt="">
            <div class="ui container center aligned">
              <button class="ui primary button mt10" @click="show('#imageChooseModal')">
                选择一张图片
              </button>
            </div>
        </div>
        <div class="content">
          <form class="ui form">
            <div class="field">
              <label>商品名称</label>
              <input type="text" placeholder="请输入商品名称" v-model="name">
            </div>
            <div class="field">
              <label>商品描述</label>
              <input type="text" placeholder="请输入商品描述" v-model="description">
            </div>
            <div class="four fields">
              <div class="field">
                <label>商品类型</label>
                <select class="ui fluid dropdown" v-model="type">
                  <option v-for="value in types" :value="value">{{value}}</option>
                </select>
              </div>
              <div class="field">
                <label>兑换所需积分</label>
                <input type="number" placeholder="请输入兑换所需积分" v-model="score">
              </div>
              <div class="field">
                <label>销量</label>
                <input type="number" placeholder="请输入销量" v-model="sold">
              </div>
              <!-- <div class="field">
                <label>商品状态</label>
                <select class="ui fluid dropdown" v-model="state">
                  <option value="0">出售中</option>
                  <option value="1">未上架</option>
                </select>
              </div> -->
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="ui form">
      <div class="field">
        <label>详情描述</label>
        <tinymce height="300" ref="tinymce"></tinymce>
      </div>
      <div class="field after">
          <button class="ui positive right labeled icon right floated button" @click="editProduct()">
            <i class="checkmark icon"></i>
            {{$route.query.id?'保存修改':'新增'}}
          </button>
          <button class="ui right floated button">取消</button>
      </div>
    </div>

    <image-choose-modal id="imageChooseModal" v-on:finishChoose="finishChoose"></image-choose-modal>
  </div>

</template>

<script>
import tinymce from 'components/tinymce/Tinymce.vue'
import imageChooseModal from 'components/ImageChooseModal.vue'
import ajax from 'src/ajax/ajax.js'
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
      this.img.src = src
    },
    editProduct(){
      // id,name,description,score,type,sold,detail,img,state
      $.when(ajax.editGood(this.$route.query.id,this.name,this.description,this.score,this.type,this.sold,this.$refs.tinymce.getContent(),this.img.src,this.state)).done((data)=>{
        if(data.state == 0){
          window.location.href="/#/goods"
        }
      })
    }
  },
  data () {
    return {
      types: ["零食", "服饰", "饰品", "百货", "话费", "手机", "家居", "运动"],
      name: '爱疯7 64G',
      description: "浙江 杭州",
      score: 999,
      sold: 999,
      state: '0',
      type: '零食',
      detail: "hehehe",
      img: {
        src: require("assets/image.png")
      },
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created: function(){
    if(this.$route.query.id > 0){
    }
    else{

    }
  },
  mounted(){
    this.$refs.tinymce.setContent("123")
  }
}
</script>

<style scoped>

</style>
