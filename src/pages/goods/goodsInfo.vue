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
    <form class="ui form">
      <div class="two fields">
        <div class="field">
          <img class="ui medium image" :src="img.src" alt="">
          <button class="ui primary button" @click="show('#imageChooseModal')">
            选择一张图片
          </button>
        </div>
        <div class="field">
          <!-- <div class="fields"> -->
            <div class="field">
              <label>商品名称</label>
              <input type="text" name="shipping[first-name]" placeholder="First Name">
            </div>
            <div class="field">
              <label>兑换所需积分</label>
              <input type="text" name="shipping[last-name]" placeholder="Last Name">
            </div>
          <!-- </div> -->
        </div>
      </form>
    <image-choose-modal id="imageChooseModal" v-on:finishChoose="finishChoose"></image-choose-modal>
  </div>

</template>

<script>
import imageChooseModal from 'components/ImageChooseModal.vue'
export default {
  name: 'bussiness',
  components: {
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
