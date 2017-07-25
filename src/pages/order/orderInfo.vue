<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <div class="section">后台</div>
        <i class="right angle icon divider"></i>
        <router-link to="/order/orderWait" class="section" v-if="$route.query.type==1">订单管理</router-link>
        <router-link to="/order" class="section" v-if="$route.query.type==2">订单管理</router-link>
        <i class="right angle icon divider"></i>
        <div class="active section">订单详情</div>
      </div>
    </h1>
    <div class="ui items">
      <div class="item">
        <div class="image">
            <img :src="info.pImg" alt="">
        </div>
        <div class="content">
          <div class="header">
            {{info.pName}} ×{{info.number}}
          </div>
          <div class="meta">
            <span>{{info.score}}积分</span>
          </div>
          <div class="description">
            <p>状态：{{info.state}}</p>
            <p>买家昵称：<span v-if="info.user">{{info.user}}</span></p>
            <p>订单编号：{{info.code}}</p>
            <p>下单时间：{{getLocalTime(info.time)}}</p>
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
      <p>收件人：<span v-if="info.receiveName">{{info.receiveName}}</span></p>
      <p>联系电话：{{info.phone}}</p>
      <p>收货地址：{{info.address}}</p>
    </div>
    <div class="after">
      <button class="ui positive right labeled icon right floated button" v-if="info.state=='待发货'" @click="statement('待收货')">
        <i class="checkmark icon"></i>
        已发货
      </button>
      <button class="ui positive right labeled icon right floated button" v-if="info.state=='待收货'" @click="statement('已完成')">
        <i class="checkmark icon"></i>
        已收货
      </button>
    </div>

  </div>

</template>

<script>
import ajax2 from 'src/ajax/ajax2.js'

export default {
  name: 'orderInfo',
  components: {
  },
  data () {
    return {
      info:"",
      img: {
        src: require("assets/image.png")
      },
    }
  },
  methods:{
    statement(state){
      $.when(ajax2.editOrderState(this.$route.query.id,state)).done((data)=>{
        xy.alert(data.detail)
        this.getOrder()
      })
    },
    getLocalTime(nS) {
       return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    },
    getOrder(start, length,type){
      ajax2.getOrder(this.$route.query.id).done((data)=>{
        this.info = data
      })
    }
  },
  mounted(){
    this.getOrder()
  }
}
</script>

<style scoped>

</style>
