<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  methods:{
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

  }
}
</script>

<style>
</style>
