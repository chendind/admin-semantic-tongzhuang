<template>

  <div>
    <div class="tagBox">
      <div class="circle"></div>
      <span>{{$route.query.id?'编辑产品':'新增产品'}}</span>
    </div>

    <div class="productBox">
      <img :src="img">
      <div class="productInfo">
        <div class="productInfoCol">
          <label>产品名称：</label>
          <span>{{ name }}</span>
        </div>
        <div class="productInfoCol">
          <label>产品材料：</label>
          <span>{{ material }}</span>
        </div>
        <div class="productInfoCol">
          <label>评价次数：</label>
          <span>{{ rateNum }}</span>
        </div>
      </div>

      <div class="productRate">
          <div class="productRateCol">
            <label>产品总评</label>
            <div class="starBox">
              <i class="iconfont icon-wujiaoxing3" v-for="i in totalInt"></i>
              <i class="iconfont icon-wujiaoxing2" v-if="total - totalInt >= 0.5"></i>
            </div>
            <span>{{ total }}</span>
            <span>分</span>
          </div>
          <div class="productRateCol">
            <label>产品质量</label>
            <div class="starBox">
              <i class="iconfont icon-wujiaoxing3" v-for="i in qualityInt"></i>
              <i class="iconfont icon-wujiaoxing2" v-if="quality - qualityInt >= 0.5"></i>
            </div>
            <span>{{ quality }}</span>
            <span>分</span>
          </div>
          <div class="productRateCol">
            <label>产品款式</label>
            <div class="starBox">
              <i class="iconfont icon-wujiaoxing3" v-for="i in styleInt"></i>
              <i class="iconfont icon-wujiaoxing2" v-if="style - styleInt >= 0.5" style="margin-left:6px"></i>
            </div>
            <span>{{ style }}</span>
            <span>分</span>
          </div>
          <div class="productRateCol">
            <label>产品价位</label>
            <div class="starBox">
              <i class="iconfont icon-wujiaoxing3" v-for="i in priceInt"></i>
            <i class="iconfont icon-wujiaoxing2" v-if="price - priceInt >= 0.5"></i>
            </div>
            <span>{{ price }}</span>
            <span>分</span>
            <!-- <i class="iconfont" v-for="i in 5" :class="{'icon-wujiaoxing3': i<=priceInt, 'icon-wujiaoxing2': i>priceInt}"></i> -->
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
            <img class="ui rounded top aligned image" :src="item.avata">
          </div>
          <div class="avartaName">
            <span>{{item.username}}</span>
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
                <i class="iconfont icon-wujiaoxing3" v-for="i in item.showQuality"></i>
              </div>
              <span>{{ item.showQuality }}</span>
              <span>分</span>
            </div>
            <div class="rateRatingCol" style="margin-bottom:14px;">
              <label>产品款式</label>
              <div class="starBox">
                <i class="iconfont icon-wujiaoxing3" v-for="i in item.showStyle"></i>
              </div>
              <span>{{ item.showStyle }}</span>
              <span>分</span>
            </div>
            <div class="rateRatingCol">
              <label>产品价位</label>
              <div class="starBox">
                <i class="iconfont icon-wujiaoxing3" v-for="i in item.showPrice"></i>
              </div>
              <span>{{ item.showPrice }}</span>
              <span>分</span>
            </div>
          </div>
          <div class="ratePic">
            <div class="image ratePic_col" v-for="pic in item.showPic">
              <div class="ui brePic">
                <img class="ui image" :src="pic.url">
              </div>
              <div class="ui popup">
                <img class="ui large image" :src="pic.url">
              </div>
            </div>
          </div>
          <div class="rateTime">
            <span>{{ item.time }}</span>
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
  name: 'evaluation',

  methods:{
    pageChange(index){
      this.getEvaluation(this.$route.query.id, this.length*(index-1), this.length, true)
    },

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
        return y+'年'+this.add0(m)+'月'+this.add0(d)+'日';
        },

    getEvaluation(evaluationModel_id,start,rows,orders) {
      ajax.getEvaluation(evaluationModel_id,start,rows,orders).done((data)=>{
          if(data.data) {
            for (let i = 0; i < data.data.length; i++) {
              let buf = {
                  username: null,
                  avata: null,
                  text: null,
                  time: null,
                   showPic:[],
                  showQuality: null,
                  showStyle: null,
                  showPrice: null
              };
              buf.username = data.data[i].user.nickName;
              buf.avata = data.data[i].user.img;
              buf.text = data.data[i].text;
              buf.time = this.getFormTime(data.data[i].in_time);
              if (data.data[i].photo[0]) {
                for (let j = 0; j < data.data[i].photo.length; j++) {
                  let picUrl = {
                    url: null
                  };
                  picUrl.url = data.data[i].photo[j];
                    buf.showPic.push(picUrl);
                  }
                }
              buf.showQuality = data.data[i].environment;
              buf.showStyle = data.data[i].attitude;
              buf.showPrice = data.data[i].after_sale;
              this.rates.push(buf);
            }

          }

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
  data () {
    return {
      name: null,
      type: null,
      detail: null,
      img: null,
      material: null,
      rateNum: null,
      total: null,
      quality: null,
      style: null,
      price: null,
      totalInt: null,
      qualityInt: null,
      styleInt: null,
      priceInt: null,
      rates: [],
      totalPage: null,
      length: null,
      afterReady: false
    }
  },
  created() {
    if(this.$route.query.id){
      ajax.getProductInfo(this.$route.query.id).done((data)=>{
        if(data.state == 0){
          this.img = data.data.photo
          this.name = data.data.name
          this.material = data.data.material
          this.rateNum = data.data.evaluationModel.sum
          if(data.data.evaluationModel.sum) {
          this.quality = parseInt(data.data.evaluationModel.environment *10 / data.data.evaluationModel.sum ) /10;
          this.style = parseInt(data.data.evaluationModel.attitude *10 / data.data.evaluationModel.sum) /10;
          this.price = parseInt(data.data.evaluationModel.after_sale *10 / data.data.evaluationModel.sum) /10;
          this.total = parseInt((data.data.evaluationModel.attitude + data.data.evaluationModel.after_sale + data.data.evaluationModel.environment) *10 / (data.data.evaluationModel.sum * 3)) /10;

          this.qualityInt = parseInt(data.data.evaluationModel.environment / data.data.evaluationModel.sum);
          this.styleInt = parseInt(data.data.evaluationModel.attitude / data.data.evaluationModel.sum);
          this.priceInt = parseInt(data.data.evaluationModel.after_sale / data.data.evaluationModel.sum);
          this.totalInt = parseInt((data.data.evaluationModel.attitude + data.data.evaluationModel.after_sale + data.data.evaluationModel.environment) / (data.data.evaluationModel.sum * 3));

          this.getEvaluation(data.data.evaluationModel.id, 0, 10, true);
        }


        }
      });

    }


  },

  mounted(){

  }
}
</script>

<style scoped>

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

.brePic {
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}

.productBox {
  margin-top: 20px;
  overflow: hidden;
}

.productBox img {
  width: 101px;
  height: 101px;
  float: left;
}

.productRateCol .icon-wujiaoxing3,.productRateCol .icon-wujiaoxing2 {
  color: red;
  width: 20px;
  height: 20px;
  margin-left: 10px;
}

.productInfo {
  float: left;
  margin-left: 20px;
  padding-top: 7px;
}

.productInfoCol {
  margin-bottom: 10px;
}

.productInfoCol label{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 22px;
  color: #777777;
}

.productInfoCol span{
  font-family:PingFangSC-Regular;
  font-size:16px;
  line-height: 22px;
  color:#333333;
}

.productRate {
  float: left;
  margin-left: 138px;
}

.productRateCol {
  margin-bottom: 12px;
}

.productRateCol .starBox{
  display: inline-block;
  width: 170px;
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
