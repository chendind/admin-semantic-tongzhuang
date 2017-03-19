<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">APP</a>
        <i class="right angle icon divider"></i>
        <div class="active section">轮播图新增/编辑</div>
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
              <label>商品id</label>
              <input type="number" placeholder="请输入商品id" v-model="productId">
            </div>
            <div class="field">
              <label>播放顺序</label>
              <input type="number" placeholder="数字越大越靠后" v-model="order">
            </div>
            <div class="field after">
              <button class="ui positive right labeled icon right floated button" @click="editCarousel">
                <i class="checkmark icon"></i>
                {{$route.query.id?'保存修改':'新增'}}
              </button>
              <router-link to="/app/carousel" class="ui right floated button">取消</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <image-choose-modal id="imageChooseModal" v-on:finishChoose="finishChoose"></image-choose-modal>
  </div>
</template>

<script>
import ajax from 'src/ajax/ajax.js'
import imageChooseModal from 'components/ImageChooseModal.vue'
export default {
  name: 'carouselInfo',
  components: {
    'image-choose-modal': imageChooseModal
  },
  methods:{
    show(selector){
      $(selector).modal('show')
    },
    finishChoose(src){
      this.img = src
    },
    editCarousel(){
      if(this.img.indexOf('data:image')===0){
        xy.toast('请先选择图片')
      }
      else if(this.productId === "" || typeof this.productId !== 'number'){
        xy.toast('请填入正确的商品id')
      }
      else if(this.order === "" || typeof this.order !== 'number'){
        xy.toast('请输入正确的顺序')
      }
      else{
        ajax.editCarousel(this.id,this.img,this.productId,this.order).done((data)=>{
          if(data.state == 0){
            if(!this.id){
              this.$data.img = require("src/assets/default.png")
              this.$data.productId = ""
              this.$data.order = ""
              xy.toast('新增成功')
            }
            else{
              xy.toast('保存修改成功')
            }
          }
        })
      }
    }
  },
  data () {
    return {
      id: undefined,
      img: require("src/assets/default.png"),
      productId: "",
      order: "",
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if(to.query.id){
        vm.$data.id = to.query.id
        vm.$data.img = to.query.img
        vm.$data.productId = to.query.productId
        vm.$data.order = to.query.order
      }

    })
  },
  mounted(){

  }
}
</script>

<style scoped>

</style>
