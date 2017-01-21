<template>
  <div class="ui modal">
    <div class="ui inverted dimmer" :class="{active: !uploaded}">
      <div class="ui text loader">图片上传中</div>
    </div>
      <i class="close icon"></i>
      <div class="header">
        选择图片
      </div>
      <div class="content">
        <div class="ui tiny images">
          <div v-for="(image, index) in images" class="ui small image" :class="{'disabled': index != checkedIndex}" :style="{backgroundImage: 'url('+image.src+')'}" @click="toggle(index)">

          </div>
        </div>
      </div>
      <div class="actions">

        <div class="ui deny button">
          取消
        </div>
        <div class="ui teal right labeled icon button" @click="uploadNewImage()">
          上传一张新图片
          <i class="plus icon"></i>
        </div>
        <div class="ui positive right labeled icon button" @click="finishChoose()">
          确定
          <i class="checkmark icon"></i>
        </div>
      </div>
    </div>
</template>

<script>
import ajax from 'src/ajax/ajax.js'
var __src = "http://tongzhuang.moovi-tech.com/uploads/img/391ea67cf6824efda27bcb50274a3c93.jpg"
export default {
  name: 'imageChooseModal',
  props: ['target'],
  data () {
    return {
      images: [],
      checkedIndex: -1,
      uploaded: true
    }
  },
  methods: {
    toggle(index){
      this.checkedIndex = index;
    },
    finishChoose(){
      if(this.checkedIndex == -1){
        return;
      }
      this.$emit('finishChoose', this.images[this.checkedIndex].src, this.target)
    },
    uploadNewImage(){
      var self = this;
      var input = document.createElement("input")
      input.type = "file"
      input.accept="image/*"
      // input.mutiple = "mutiple"
      input.click()
      input.onchange = function(e){
        var file = this.files[0]
        var formData = new FormData()
        self.uploaded = false
        $.when(ajax.upload(file)).done(function(data){
          if(data.state == 0){

          }
        }).always(function(){
          self.uploaded = true;
        })
        // setTimeout(()=>{
        //   self.uploaded = true
        //   self.images.push({
        //     "src": __src
        //   });
        //   self.checkedIndex = 0;
        // },500)
      }
    }
  },
  created(){
    setTimeout(()=>{
      this.images = [
        {
          "src": __src
        }
      ]
    },500)
  }
}
</script>

<style scoped>
.images .image{
  cursor: pointer;
  background-position: center;
  background-size: contain;
  height: 80px !important;
  width: 80px !important;
}

img.ui.bordered.image{
  border-color: #21BA45;
}
</style>
