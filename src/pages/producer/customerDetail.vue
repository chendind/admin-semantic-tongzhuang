<template>
  <div>
    <div class="tagBox">
      <div class="circle"></div>
      <span>客户详情</span>
    </div>  

    <div class="customerInfoBox">
      <div class="customerPic">
        <img :src="avarta">
      </div>
      <div class="customerInfo">
        <div class="customerInfo_left">
          <div class="info_col">
            <label>昵称：</label>
            <span>{{nickName}}</span>
          </div>
          <div class="info_col">
            <label>评价次数：</label>
            <span>{{rateNum}}</span>
          </div>
          <div class="info_col">
            <label>关注时间：</label>
            <span>{{time}}</span>
          </div>
        </div>
        <div class="customerInfo_right">
          <div class="info_col">
            <label>性别：</label>
            <span>{{sex?(sex === 1?'男':'女'):'未知'}}</span>
          </div>
          <div class="info_col">
            <label>年龄：</label>
            <span>{{age}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="rateBox">
      <div class="rateTitle">
        <span>全部评价</span>
      </div>
      <div v-for="item in rates" class="rateCol">
        <div class="rateAvarta">
          <div class="avartaPic">
            <img class="ui rounded top aligned image" :src="item.goods.photo">
          </div>
          <div class="avartaName">
            <span>{{item.goods.name}}</span>
          </div>
        </div>
        <div class="rateContent">
          <div class="rateText">
            <span>{{item.text}}</span>
          </div>
          <div class="rateRating">
            <div class="rateRatingCol" style="margin-bottom:14px;">
              <label>产品质量</label>
              <div class="starBox">
                <i class="iconfont icon-wujiaoxing3" v-for="i in item.environment"></i>
              </div>
              <span>{{ item.environment  }}</span>
              <span>分</span>
            </div>
            <div class="rateRatingCol" style="margin-bottom:14px;">
              <label>产品款式</label>
              <div class="starBox">
                <i class="iconfont icon-wujiaoxing3" v-for="i in item.attitude"></i>
              </div>
              <span>{{ item.attitude }}</span>
              <span>分</span>
            </div>
            <div class="rateRatingCol">
              <label>产品价位</label>
              <div class="starBox">
                <i class="iconfont icon-wujiaoxing3" v-for="i in item.after_sale"></i>
              </div>
              <span>{{ item.after_sale }}</span>
              <span>分</span>
            </div>
          </div>
          <div class="ratePic">
            <div class="image ratePic_col" v-for="pic in item.photo">
              <div class="ui brePic">
                <img class="ui image" :src="pic">
              </div>
              <div class="ui popup">
                <img class="ui large image" :src="pic">
              </div>
            </div>
          </div>
          <div class="rateTime">
            <span>{{ getFormTime2(item.in_time) }}</span>
          </div>    
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import ajax from 'src/ajax/ajax.js'

export default {
  data () {
    return {
      avarta: null,
      nickName: null,
      rateNum: null,
      time: null,
      sex: null,
      age: null,
      rates: [],
      producerId: null,
      customerId: null
    }
  },
  methods:{
    //时间戳格式化
    add0(m){return m<10?'0'+m:m },
    getFormTime1(shijianchuo)
        {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+this.add0(m)+'-'+this.add0(d);
        },

    getFormTime2(shijianchuo)
        {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'年'+this.add0(m)+'月'+this.add0(d)+'日';
        },

    getInfo() {
       ajax.userEvaluationByFactory(this.producerId,this.customerId).done((data)=>{
        
        this.nickName = data.user.nickName;
        this.rateNum = data.data.length;
        // this.time = this.getFormTime1(data.data[0].in_time);
        this.sex = data.user.sex;
        this.age = data.user.age;
        this.avarta = data.user.img;

        this.rates = data.data;

        this.$nextTick(()=>{
            $('.ui.rating').rating('disable');
            $('.brePic').popup({
              position: "right center",
              lastResort: true
            });
          })
       })
    }
  },

  beforeCreate(){},

  created(){},

  mounted(){
    // if (this.$route.query.id) {
    //   //
    // }
    this.customerId = this.$route.query.id;
    this.time = this.$route.query.time.substr(0,10);
    this.producerId = localStorage.getItem('producerId');
    this.getInfo();

    
  },

  beforeDestroy() {},
}
</script>

<style scoped>

#addBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #44bfff;
  border-radius: 100px;
  width: 78px;
  height: 28px;
  position: absolute;
  right: 30px;
  cursor: pointer;
  top: 66px;
}

#addBtn span {
  font-size: 14px;
  line-height: 20px;
  font-family: PingFangSC-Regular;
  color: #44bfff;
}

.tagBox {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.circle {
  background: #ffffff;
  border: 1px solid #44bfff;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  position: absolute;
}

.tagBox span{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  line-height: 22px;
  color: #44bfff;
  margin-left: 16px;
}

.customerInfoBox {
  height: 100px;
  margin: 20px 0;
}

.customerPic {
  position: absolute;
}

.customerPic img{
  width: 100px;
  height: 100px;
}

.customerInfo {
  margin-left: 120px;
  padding-top: 7px;
}

.customerInfo label {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 22px;
  color: #777777;
}

.customerInfo span {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 22px;
  color: #333333;
}

.info_col {
  margin-bottom: 10px;
}

.customerInfo_left {
  position: absolute;
}

.customerInfo_right {
  margin-left: 250px;
  padding-top: 32px;
}

/*评价列表*/
.rateBox {
  background: #fdfdff;
  border: 1px solid #f3f3f3;
  margin: 9px 0 22px;
  padding: 10px 20px;
}

.rateTitle {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  padding-bottom: 11px;
}

.rateCol {
  margin-top: 10px;
  overflow: hidden;
}

.rateAvarta {
  width: 72px;
  position: absolute;
}

.avartaPic {
  margin-left: 6px;
}

.avartaPic img {
  width: 60px;
  height: 60px;
}

.avartaName {
  margin-top: 5px;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #333333;
  line-height: 17px;
}

.rateContent {
  width: 100%;
  margin-left: 112px;
  border-bottom: 1px solid #f3f3f3;
}

.rateRatingCol .icon-wujiaoxing3,.rateRatingCol .icon-wujiaoxing2{
  color: red;
  width: 16px;
  height: 16px;
  margin-left: 10px;
}

.ratePic {
  margin: 17px 0 14px;
  overflow: hidden;
}

.ratePic_col{
  float: left;
}


.brePic img{
  width: 61px;
  height: 61px;
  display: inline-block;
  margin-right: 20px;
}

.rateText {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 20px;
  color:  #333333;
  margin-bottom: 10px;
}

.rateRatingCol label{
  font-family: PingFangSC-Regular;
  font-size: 12px;
  line-height: 17px;
  color: #777777;
}

.rateRatingCol span {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
}

.rateRatingCol .starBox {
  width: 140px;
  display: inline-block;
}

.rateTime {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  margin-bottom: 10px;
  line-height: 17px;
  color: #777777;
}

</style>
