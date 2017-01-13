<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">后台</a>
        <i class="right angle icon divider"></i>
        <div class="active section">商品列表</div>
      </div>
    </h1>
    <div class="ui category search">
      <div class="ui icon input">
        <input class="prompt" type="text" placeholder="Keywords Here...">
        <i class="search icon"></i>
      </div>
    </div>
    <table class="ui celled table">
      <tbody>
        <tr>
          <td>
            <router-link to="/goods/goodsInfo" class="ui image header">
                <img class="ui rounded top aligned tiny image" src="~assets/default.png" alt="">
                <div class="content">
                    iPhone7 Plus 64G 银色
                    <div class="sub header">8888积分 库存888</div>
                </div>
            </router-link>
          </td>
        </tr>
        <tr>
          <td>
            <h4 class="ui image header">
              <img class="ui rounded top aligned tiny image" src="~assets/default.png" alt="">
              <div class="content">
                  iPhone7 Plus 64G 银色
                  <div class="sub header">8888积分 库存888</div>
              </div>
            </h4>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
export default {
  name: 'goods',
  components: {
  },
  methods:{
  },
  data () {
    return {
    }
  },
  mounted(){
    
  }
}
</script>

<style scoped>
.ui.header .sub.header{
  margin-top: 30px;
}
</style>
