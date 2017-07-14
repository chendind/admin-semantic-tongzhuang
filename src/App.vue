<template>
  <div id="app">
    <router-view></router-view>
    <image-choose-modal id="image-choose-modal" v-on:finishChoose="imageChooseModal_finishChoose"></image-choose-modal>
  </div>
</template>

<script>
import Vue from 'Vue'
import imageChooseModal from 'components/image-choose-modal/ImageChooseModal.vue'
export default {
  name: 'app',
  components: {
    imageChooseModal
  },
  methods:{
    callback(js){
      js && (new Function(js)).call(this)
    },
    imageChooseModal_finishChoose(src){
      console.log(src)
      BusVue.$emit('finishChoose:image-choose-modal', src)
    }
  },
  data () {
    return {
      // 公用的promise对象
      Promise: {}
    }
  },
  created(){
  },
  mounted(){
    // 消息派发中心
    window.BusVue = new Vue();
    BusVue.$on('show:image-choose-modal', () => {
      $("#image-choose-modal").modal('show')
    })
  }
}
</script>

<style>
</style>
