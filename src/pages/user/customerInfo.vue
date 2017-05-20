<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">后台</a>
        <i class="right angle icon divider"></i>
        <router-link to="/user/customer" class="section">客户管理</router-link>
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
      <a class="section" v-if="usertype == 'back'">关注店铺</a>
      <a class="section" v-else>留言</a>
      </div>
    </h1>
    <table class="ui single line table" v-if="usertype == 'back'">
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

    <div class="rateCol" v-for="item in rates" v-if="usertype == 'merchant'">
      <div class="ui grid">
        <div class="two wide column">
          2017年5月18日16:29:31
        </div>
        <div class="six wide column">
          评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容
        </div>
        <div class="four wide column">
          <div class="image" v-for="pic in item.showPic">
              <div class="ui brePic"><img class="ui tiny image" :src="pic.url"></div>
              <div class="ui flowing popup transition tiny">
                <img class="ui large image" :src="pic.url">
              </div>
            </div>
        </div>
        <div class="four wide column">
          <div class="ui items">
            <div class="item">
              <label>购物环境</label>
              <div class="content">
                <div class="ui form">
                  <div class="field">
                    <div class="ui star rating" :data-rating="item.demoRate" data-max-rating="5"></div>
                    <span>3</span>
                    <span>分</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <label>服务态度</label>
              <div class="content">
                <div class="ui form">
                  <div class="field">
                    <div class="ui star rating" :data-rating="item.demoRate" data-max-rating="5"></div>
                    <span>3</span>
                    <span>分</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <label>售后服务</label>
              <div class="content">
                <div class="ui form">
                  <div class="field">
                    <div class="ui star rating" :data-rating="item.demoRate" data-max-rating="5"></div>
                    <span>3</span>
                    <span>分</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
   <!--  <table class="ui single line table" v-if="usertype == 'merchant'">
      <thead>
        <tr>
          <th>留言</th>
          <th>时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="message in data.messageList">
          <td class="lines">{{message.text}}</td>
          <td>{{formatDate(message.time)}}</td>
        </tr>
      </tbody>
    </table>
  </div> -->

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
      usertype: "",
      data:{
        id: "",
        name:"西柚科技Leo",
        img: require("assets/image.png"),
        focusList: [],
        order:"",
        score:"",
        demoDataPre: 3
      },
      rates: [{
        demoRate: 3,
        showPic: [{
          url: "http://wx.qlogo.cn/mmopen/PXJrN9SScfBty9TBVpd1B5ZgSMgv1GhCMXMWoibD839p9S4iaqBlrbics3QSibdibM184YxwVZ6U4hELox7BibpETlrbOFYkQbOSlz/0"
        },{
          url: "http://wx.qlogo.cn/mmopen/PXJrN9SScfBty9TBVpd1B5ZgSMgv1GhCMXMWoibD839p9S4iaqBlrbics3QSibdibM184YxwVZ6U4hELox7BibpETlrbOFYkQbOSlz/0"
        },{
          url: "http://wx.qlogo.cn/mmopen/PXJrN9SScfBty9TBVpd1B5ZgSMgv1GhCMXMWoibD839p9S4iaqBlrbics3QSibdibM184YxwVZ6U4hELox7BibpETlrbOFYkQbOSlz/0"
        }]
      },{
        demoRate: 3,
        showPic: [{
          url: "http://wx.qlogo.cn/mmopen/PXJrN9SScfBty9TBVpd1B5ZgSMgv1GhCMXMWoibD839p9S4iaqBlrbics3QSibdibM184YxwVZ6U4hELox7BibpETlrbOFYkQbOSlz/0"
        },{
          url: "http://wx.qlogo.cn/mmopen/PXJrN9SScfBty9TBVpd1B5ZgSMgv1GhCMXMWoibD839p9S4iaqBlrbics3QSibdibM184YxwVZ6U4hELox7BibpETlrbOFYkQbOSlz/0"
        },{
          url: "http://wx.qlogo.cn/mmopen/PXJrN9SScfBty9TBVpd1B5ZgSMgv1GhCMXMWoibD839p9S4iaqBlrbics3QSibdibM184YxwVZ6U4hELox7BibpETlrbOFYkQbOSlz/0"
        }]
      }]
    }
  },
  created() {

  },
  mounted(){
    this.usertype = window.localStorage.getItem('usertype');
    // $.when(ajax.getUserById(this.$route.query.id,this.usertype)).done((data)=>{
    //   this.data = data;
    // })
    this.$nextTick(()=>{
      $('.ui.rating').rating('disable');
      $('.brePic').popup({
        position   : 'top left'
      });
    })
    
  }
}
</script>

<style scoped>
td.lines{
  white-space: initial;
}

.rateCol {
  margin: 0 20px 20px 0;
  padding: 20px;
  border-radius: 10px;
  background-color: #f0f0f0;
}
.brePic {
  float: left;
  margin: 10px 5px;
}
</style>
