<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">后台</a>
        <i class="right angle icon divider"></i>
        <router-link to="/user/business" class="section">客户管理</router-link>
        <i class="right angle icon divider"></i>
        <div class="active section">客户详情</div>
      </div>
    </h1>
    <div class="ui items">
      <div class="item">
        <div class="image">
            <img :src="data.img" alt="">
        </div>
        <div class="content">
          <a class="header">{{data.name}}</a>
          <div class="description">
            <p>订单总数：{{data.order}}</p>
            <p>当前积分：{{data.score}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import ajax from 'src/ajax/ajax.js'
import router from 'src/router.js'
export default {
  name: 'businessInfo',
  components: {
  },
  methods:{
    show(selector, target){
      $(selector).modal('show')
      this.target = target
    },
    finishChoose(src,target){
      console.log('this.'+target+"='"+src+"'")
      eval('this.'+target+"='"+src+"'")
    },
    editBusiness(){
      // id,name,headImg,backImg,location,product,phone,introduction,principal
      $.when(ajax.editBusiness(this.$route.query.id,this.data.name,this.data.headImg,this.data.backImg,this.data.location,this.data.product,this.data.phone,this.data.introduction,this.data.principal)).done(function(data){
        if(data.state == 0){
          router.push({path:'/user/business'})
        }
      })
    }
  },
  data () {
    return {
      target:"",
      data:{
        name:"西柚科技奶茶店",
        img: require("assets/image.png"),
        backImg:"",location:"浙江 杭州",product:"零食",phone:"13000000000",introduction:"呵呵",principal:"葛牡丹"
      }

    }
  },
  mounted(){
    $.when(ajax.getUserById(this.$route.query.id,'back')).done((data)=>{
      this.data = data
    })
  }
}
</script>

<style scoped>

</style>
