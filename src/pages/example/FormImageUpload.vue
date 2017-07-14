<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">用户</a>
        <i class="right angle icon divider"></i>
        <div class="active section">代理商管理</div>
      </div>
    </h1>

  </div>

</template>

<script>
export default {
  name: 'bussiness',
  components: {
  },
  methods:{
    show(selector){
      $(selector).modal('show')
    },
    finishChoose(src){
      console.log(src)
      $('#expImage').attr('src', src)
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){

  }
}
</script>

<style scoped>

</style>
