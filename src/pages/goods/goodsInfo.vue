<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">后台</a>
        <i class="right angle icon divider"></i>
        <div class="section">商品列表</div>
        <i class="right angle icon divider"></i>
        <div class="active section">商品详情</div>
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
              <input type="text" name="shipping[first-name]" placeholder="请输入商品名称">
            </div>
            <div class="field">
              <label>兑换所需积分</label>
              <input type="text" name="shipping[last-name]" placeholder="兑换所需积分">
            </div>
            <div class="field">
              <label>商品类型</label>
              <input type="text" name="shipping[first-name]" placeholder="商品类型">
            </div>
            <div class="field">
              <label>库存</label>
              <input type="text" name="shipping[last-name]" placeholder="库存">
            </div>
          </form>
        </div>
      </div>
    </div>
    <form class="ui form">
      <div class="field">
        <label>详情描述</label>
        <tinymce height="300"></tinymce>
      </div>
      <div class="field after">
          <button class="ui positive right labeled icon right floated button">
            <i class="checkmark icon"></i>
            保存修改
          </button>
          <button class="ui right floated button">取消</button>
      </div>


    </form>




    <image-choose-modal id="imageChooseModal" v-on:finishChoose="finishChoose"></image-choose-modal>
  </div>

</template>

<script>
import tinymce from 'components/tinymce/Tinymce.vue'
import imageChooseModal from 'components/ImageChooseModal.vue'
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
    }
  },
  data () {
    return {
      img: {
        src: require("assets/image.png")
      },
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){

  }
}
</script>

<style scoped>

</style>
