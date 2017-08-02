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
        <div v-for="(image, index) in images" class="ui small image" :class="{'disabled': index != checkedIndex}" :style="{backgroundImage: 'url('+encodeURI(image)+')'}" @click="toggle(index)">
        </div>
      </div>
    </div>
    <div class="actions">
      <pagination v-if="total" :id="paginationId" css="ui floated pagination menu" :current="1" :total="total" :show="show" v-on:pageChange="pageChange"></pagination>
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
var paginationId = 0

import pagination from 'src/components/Pagination.vue'
import ajax from 'src/ajax/ajax.js'

export default {
  name: 'imageChooseModal',
  components: {
    pagination
  },
  data () {
    return {
      paginationId: `pagination${paginationId++}`,
      images: [],
      checkedIndex: -1,
      uploaded: true,
      total: 0,
      show: 20,
    }
  },
  methods: {
    encodeURI(url){
      return encodeURI(url)
    },
    toggle(index){
      this.checkedIndex = index;
    },
    finishChoose(){
      if(this.checkedIndex == -1){
        return;
      }
      if(this.target){
        this.$emit('finishChoose', this.target, this.images[this.checkedIndex])
      }
      else{
        this.$emit('finishChoose', this.images[this.checkedIndex])
      }
    },
    uploadNewImage(){
      var self = this;
      var input = document.createElement("input")
      input.type = "file"
      // input.accept="image/*"
      // input.mutiple = "mutiple"
      input.click()
      input.onchange = (e)=>{
        var file = e.target.files[0]
        var formData = new FormData()
        this.uploaded = false
        ajax.upload(file).done((data)=>{
          if(data.state == 0){
            this.images.unshift((window.baseUrl)+data.detail)
          }
        }).always(()=>{
          this.uploaded = true;
        })
      }
    },
    pageChange(params){
        var number = (params-1)*this.show
        ajax.getImgForPage(number, this.show).done((data)=>{
          this.images = data.list
          this.images.map((value,index,array)=>{
            array[index] = (window.baseUrl) + value
          })
        })
    }
  },
  mounted(){
    ajax.getImgForPage(0, 20).done((data)=>{
      if(data.state == 0) {
        this.images = data.list || []
        this.total = data.countAll
        this.images.map((value,index,array)=>{
          array[index] = (window.baseUrl) + value
        })
      }

    })
  }
}
</script>

<style scoped>
.images .image{
  cursor: pointer;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 80px !important;
  width: 80px !important;
}

img.ui.bordered.image{
  border-color: #21BA45;
}
</style>
