<template>

  <div>

    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <div class="active section">店铺评价</div>
      </div>
    </h1>

    <div class="ui grid">
      <div class="eight wide column">
        <div class="ui items">
          <div class="item">
            <label>店铺总评</label>
            <div class="content">
              <div class="ui form">
                <div class="field">
                  <div class="ui star rating" :data-rating="totalInt" data-max-rating="5"></div>
                  <span>{{ total }}</span>
                  <span>分</span>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <label>购物环境</label>
            <div class="content">
              <div class="ui form">
                <div class="field">
                  <div class="ui star rating" :data-rating="environmentInt" data-max-rating="5"></div>
                  <span>{{ environment }}</span>
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
                  <div class="ui star rating" :data-rating="attitudeInt" data-max-rating="5"></div>
                  <span>{{ attitude }}</span>
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
                  <div class="ui star rating" :data-rating="serviceInt" data-max-rating="5"></div>
                  <span>{{ service }}</span>
                  <span>分</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="eight wide column">
        <label>评价次数:</label>
        <span>{{ rateNum }}</span>
      </div>
    </div>

        

    <div class="ui items titleBox">
      <div class="item">
        <span class="colTitle">评价</span>
      </div>
    </div>

    <div class="rateCol" v-for="item in rates">
      <div class="ui grid">
        <div class="two wide column">
          <div>  
           <span>{{item.username}}</span>
          </div>
          <img class="ui rounded top aligned tiny image" :src="item.avata">
        </div>
        <div class="fourteen wide column">
          <div class="textBox">
            {{item.text}}
          </div>
          <div class="ten wide column">
            <div class="image" v-for="pic in item.showPic">
              <div class="ui brePic"><img class="ui tiny image" :src="pic.url"></div>
              <div class="ui popup">
                <img class="ui large image" :src="pic.url">
              </div>
            </div>
          </div>
          <div class="ui items">
            <div class="item">
              <label>购物环境</label>
              <div class="content">
                <div class="ui form">
                  <div class="field">
                    <div class="ui star rating" :data-rating="item.showEnvironment" data-max-rating="5"></div>
                    <span>{{ item.showEnvironment }}</span>
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
                    <div class="ui star rating" :data-rating="item.showAttitude" data-max-rating="5"></div>
                    <span>{{ item.showAttitude }}</span>
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
                    <div class="ui star rating" :data-rating="item.showService" data-max-rating="5"></div>
                    <span>{{ item.showService }}</span>
                    <span>分</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content timeCol">
        <div class="ui form">
          <div class="field">
            <span>{{ item.time }}</span>
          </div>
        </div>
      </div>
    </div>
      
    <div class="ui grid footBox">
      <div class="right floated column">
        <pagination v-if="totalPage" id="pagination" current="1" :total="totalPage" :show="length" v-on:pageChange="pageChange"></pagination>
      </div>
    </div>
     
  </div>

</template>

<script>
import imageChooseModal from 'components/ImageChooseModal.vue'
import ajax from 'src/ajax/ajax.js'
import router from 'src/router.js'
import Pagination from 'src/components/Pagination.vue'
export default {
  name: 'evaluation',
   components: {
    Pagination: Pagination
  },

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
        return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
        },

    getEvaluation(evaluationModel_id,start,rows,orders) {
      ajax.getEvaluation(evaluationModel_id,start,rows,orders).done((data)=>{
          for (let i = 0; i < data.data.length; i++) {
              let buf = {
                  username: null,
                  avata: null,
                  text: null,
                  time: null,
                  showPic:[
                  //  {
                  //   url: null
                  //  }
                   ],
                  showEnvironment: null,
                  showAttitude: null,
                  showService: null
              };
              buf.username = data.data[i].user.nickName;
              buf.avata = data.data[i].user.img;
              buf.text = data.data[i].text;
              buf.time = this.getFormTime(data.data[i].in_time);
              if (data.photo != []) {
                for (let j = 0; j < data.data[j].photo.length; j++) {
                  let picUrl = {
                    url: null
                  };
                  picUrl.url = data.data[i].photo[j];
                    buf.showPic.push(picUrl);
                  }
                }
              buf.showEnvironment = data.data[i].environment;
              buf.showAttitude = data.data[i].attitude;
              buf.showService = data.data[i].after_sale;
              this.rates.push(buf);
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
      rateNum: null,
      total: null,
      environment: null,
      attitude: null,
      service: null,
      totalInt: null,
      environmentInt: null,
      attitudeInt: null,
      serviceInt: null,
      rates: [],
      totalPage: 6,
      length: 10
    }
  },
  created: function(){

    if(this.$route.query.id){
      $.when(ajax.getBusinessById(this.$route.query.id,'back')).done((data)=>{
             this.rateNum = data.evaluationModel.sum
             if(data.evaluationModel.sum) {
                this.environment = parseInt(data.evaluationModel.environment *10 / data.evaluationModel.sum ) /10;
                this.attitude = parseInt(data.evaluationModel.attitude *10 / data.evaluationModel.sum) /10;
                this.service = parseInt(data.evaluationModel.after_sale *10 / data.evaluationModel.sum) /10;
                this.total = parseInt((data.evaluationModel.attitude + data.evaluationModel.after_sale + data.evaluationModel.environment) *10 / (data.evaluationModel.sum * 3)) /10;
      
                this.environmentInt = parseInt(data.evaluationModel.environment / data.evaluationModel.sum);
                this.attitudeInt = parseInt(data.evaluationModel.attitude / data.evaluationModel.sum);
                this.serviceInt = parseInt(data.evaluationModel.after_sale / data.evaluationModel.sum);
                this.totalInt = parseInt((data.evaluationModel.attitude + data.evaluationModel.after_sale + data.evaluationModel.environment) / (data.evaluationModel.sum * 3));
      
                this.getEvaluation(data.evaluationModel.id, 0, 10, true);
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

    // if(this.$route.query.id){
      // ajax.getProductInfo(this.$route.query.id).done((data)=>{
      //   if(data.state == 0){
      //     this.rateNum = data.evaluationModel.sum
      //   }
      // });
      // this.getEvaluation(this.$route.query.id, 0, 10, true);
    // }
  },
  mounted(){

  }
}
</script>

<style scoped>
.titleBox {
  line-height: 24px;
}
.rateCol {
  margin: 0 20px 20px 0;
  padding: 20px;
  border-radius: 10px;
  background-color: #f0f0f0;
}
.rateCol span{
  margin-left: 20px;
  line-height: 20px;
}
.item label {
  margin-right: 20px;
}
.item span {
  margin-left: 20px;
}
.textBox {
  padding: 20px;
}
.colTitle {
  font-size: 20px;
}
.timeCol {
  float: right;
}
.footBox {
  margin: 20px;
}
.brePic {
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
