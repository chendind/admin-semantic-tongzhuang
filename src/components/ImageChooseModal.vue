<!--
图片选择模态框
ImageChooseModal
结束图片选择后，会向父组件发送'finishChoose'事件，传入所选图片url与父组件的图片目标(如'data.imageUrl')，
父组件中需接收这个事件 `v-on:finishChoose="finishChoose"`，且定义finishChoose方法。

例子
父组件html
<image-choose-modal id="你自定义的一个id" v-on:finishChoose="finishChoose" :target="target"></image-choose-modal>
父组件js
`
//vue的methods中定义
show(selector, target){
  $(selector).modal('show')
  this.target = target
},
finishChoose(src,target){
  target = target.split('.')
  let _img = this;
  for(let i = 0, length = target.length; i < length; i++){
    _img = _img[target[i]];
  }
  _img = src
}
`

该方法耦合度较高..有待提高
-->
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
          <div v-for="(image, index) in images" class="ui small image" :class="{'disabled': index != checkedIndex}" :style="{backgroundImage: 'url('+image+')'}" @click="toggle(index)">
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
import pagination from 'src/components/Pagination.vue'
import ajax from 'src/ajax/ajax.js'
var paginationId = 0
export default {
  name: 'imageChooseModal',
  props: ['target'],
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
    toggle(index){
      this.checkedIndex = index;
    },
    finishChoose(){
      if(this.checkedIndex == -1){
        return;
      }
      this.$emit('finishChoose', this.images[this.checkedIndex], this.target)
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
            this.images.unshift((window.baseUrl||'http://tongzhuang.moovi-tech.com')+data.detail)
          }
        }).always(()=>{
          this.uploaded = true;
        })
      }
    },
    pageChange(params){
        var number = (params-1)*this.show
        ajax.getImgForPage(number, this.show).done((data)=>{
          // debugger
          this.images = data.list
          this.images.map((value,index,array)=>{
            array[index] = (window.baseUrl||'http://tongzhuang.moovi-tech.com') + value
          })
          console.log(this.images)
        })
    }
  },
  mounted(){
    ajax.getImgForPage(0, 20).done((data)=>{
      this.images = data.list
      this.total = data.countAll
      this.images.map((value,index,array)=>{
        array[index] = (window.baseUrl||'http://tongzhuang.moovi-tech.com') + value
      })
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
