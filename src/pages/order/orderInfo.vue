<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <div class="section">后台</div>
        <i class="right angle icon divider"></i>
        <router-link to="/goods" class="section">商品管理</router-link>
        <i class="right angle icon divider"></i>
        <div class="active section">商品详情</div>
      </div>
    </h1>
    <div class="ui items">
      <div class="item">
        <div class="image">
            <img :src="img.src" alt="">
        </div>
        <div class="content">
          <div class="header">
            Iphone7 Plus 32G 银色 ×1
          </div>
          <div class="meta">
            <span>8888积分</span>
          </div>
          <div class="description">
            <p>状态：待发货</p>
            <p>买家昵称：聪明的小明</p>
            <p>订单编号：201701071234</p>
            <p>下单时间：2017-01-07 12:34</p>
          </div>
        </div>
      </div>
    </div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <div class="section">收货信息</div>
      </div>
    </h1>
    <div class="ui raised segment">
      <p>收件人：小柚子</p>
      <p>联系电话：13812345678</p>
      <p>收货地址：浙江省杭州市拱墅区祥园路38号</p>
    </div>
    <div class="after">
      <button class="ui positive right labeled icon right floated button">
        <i class="checkmark icon"></i>
        已发货
      </button>
    </div>

  </div>

</template>

<script>
export default {
  name: 'orderInfo',
  components: {
  },
  methods:{
  },
  data () {
    return {
      img: {
        src: require("assets/image.png")
      },
    }
  },
  mounted(){
  }
}
</script>

<style scoped>

</style>
