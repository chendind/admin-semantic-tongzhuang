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
    <h1 class="ui dividing header">
    <div class="ui breadcrumb">
      <a class="section">关注店铺</a>
      </div>
    </h1>
    <table class="ui single line table">
      <thead>
        <tr>
          <th>店铺名</th>
          <th>店铺代码</th>
          <th>起始时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="focus in data.focusList">
          <td>{{focus.name}}</td>
          <td>{{focus.code}}</td>
          <td>{{formatDate(focus.time)}}</td>
        </tr>
      </tbody>
    </table>
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
    formatDate(time)   {
      var   now = new Date(time)
      var   year = now.getFullYear();
      var   month = "0" + (now.getMonth()+1);
      var   date = "0" +(now.getDate());
      return   year+"-"+month.substr(-2)+"-"+date.substr(-2)
    }
  },
  data () {
    return {
      target:"",
      data:{
        id: "",
        name:"西柚科技奶茶店",
        img: require("assets/image.png"),
        focusList: [],
        order:"",
        score:""
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
