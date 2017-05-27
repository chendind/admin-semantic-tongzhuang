<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">商家</a>
        <i class="right angle icon divider"></i>
        <router-link to="/business/customer" class="section">客户管理</router-link>
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
            <p>关注时间 : {{time}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <h1 class="ui dividing header">
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
        <div class="eight wide column">
          <div class="image" v-for="pic in item.showPic">
              <div class="ui brePic"><img class="ui tiny image" :src="pic.url"></div>
              <div class="ui popup">
                <img class="ui image" :src="pic.url">
              </div>
            </div>
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
    </div> -->
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

    //时间戳格式化
    add0(m){return m<10?'0'+m:m },
    getFormTime(shijianchuo)
        {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
        },

    getData(start, length){
      ajax.getUser(start,length,'merchant',this.id).done((data)=>{
        this.data = data.list[this.$route.query.index];
        this.time = this.getFormTime(this.data.time);
      })
    },
  },
  data () {
    return {
      target:"",
      usertype: "",
      id: null,
      index: null,
      time: null,
      data:{
        id: null,
        name: null,
        img: null,
        focusList: [],
        order: null,
        score: null,
        demoDataPre: null
      },
      rates: [{
        demoRate: 3,
        showPic: []
      }]
    }
  },
  created() {
    this.usertype = window.localStorage.getItem('usertype');
     ajax.getBusinessById(null, null).done((data)=>{
        this.id = data.id;
        this.usertype = window.localStorage.getItem('usertype');
        let start = (this.$route.query.page-1)*this.$route.query.lenth;
        let len = this.$route.query.lenth
        this.getData(start, len);
      })
  },
  mounted(){
      

    // $.when(ajax.getUserById(this.$route.query.id,this.usertype)).done((data)=>{
    //   this.data = data;
    // // })
    // this.$nextTick(()=>{
    //   $('.ui.rating').rating('disable');
    //   $('.brePic').popup({
    //     position: "right center",
    //     lastResort: true
    //   });
    // })
    
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
