<template>

  <div class="merchantRateBody">

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
              <div class="ui star rating" :data-rating="qualityInt" data-max-rating="5"></div>
              <span>{{ quality }}</span>
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
              <div class="ui star rating" :data-rating="styleInt" data-max-rating="5"></div>
              <span>{{ style }}</span>
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
              <div class="ui star rating" :data-rating="priceInt" data-max-rating="5"></div>
              <span>{{ price }}</span>
              <span>分</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ui items dividing header">
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
                    <div class="ui star rating" :data-rating="item.showQuality" data-max-rating="5"></div>
                    <span>{{ item.showQuality }}</span>
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
                    <div class="ui star rating" :data-rating="item.showStyle" data-max-rating="5"></div>
                    <span>{{ item.showStyle }}</span>
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
                    <div class="ui star rating" :data-rating="item.showPrice" data-max-rating="5"></div>
                    <span>{{ item.showPrice }}</span>
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
import {getMerchant, editMerchant,merchantChangePassword} from 'src/ajax/ajax_business.js'
import tinymce from 'components/tinymce/Tinymce.vue'
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
          if(data.data) {
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
                  showQuality: null,
                  showStyle: null,
                  showPrice: null
              };
              buf.username = data.data[i].user.nickName;
              buf.avata = data.data[i].user.img;
              buf.text = data.data[i].text;
              buf.time = this.getFormTime(data.data[i].in_time);
              if (data.data.photo != []) {
                for (let j = 0; j < data.data[j].photo.length; j++) {
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
      rateNum: null,
      total: null,
      quality: null,
      style: null,
      price: null,
      totalInt: null,
      qualityInt: null,
      styleInt: null,
      priceInt: null,
      rates: [
      //   {
      //   username: null,
      //   avata: null,
      //   text: null,
      //   time: null,
      //   showPic:[],
      //   showQuality: null,
      //   showStyle: null,
      //   showPrice: null
      // }
      ],
      totalPage: null,
      length: 10
    }
  },
  created: function(){

  },
  mounted(){
    
  },

  beforeRouteEnter(to, from, next){
    getMerchant().then(res => {
      next($vm => {
        $vm.rateNum = res.evaluationModel.sum
        if(res.evaluationModel.sum) {
          $vm.quality = parseInt(res.evaluationModel.environment *10 / res.evaluationModel.sum ) /10;
          $vm.style = parseInt(res.evaluationModel.attitude *10 / res.evaluationModel.sum) /10;
          $vm.price = parseInt(res.evaluationModel.after_sale *10 / res.evaluationModel.sum) /10;
          $vm.total = parseInt((res.evaluationModel.attitude + res.evaluationModel.after_sale + res.evaluationModel.environment) *10 / (res.evaluationModel.sum * 3)) /10;

          $vm.qualityInt = parseInt(res.evaluationModel.environment / res.evaluationModel.sum);
          $vm.styleInt = parseInt(res.evaluationModel.attitude / res.evaluationModel.sum);
          $vm.priceInt = parseInt(res.evaluationModel.after_sale / res.evaluationModel.sum);
          $vm.totalInt = parseInt((res.evaluationModel.attitude + res.evaluationModel.after_sale + res.evaluationModel.environment) / (res.evaluationModel.sum * 3));

          $vm.getEvaluation(res.evaluationModel.id, 0, 10, true);

        }
        $vm.$nextTick(()=>{
          $('.ui.rating').rating('disable');
          $('.brePic').popup({
            position: "right center",
            lastResort: true
          });
        })

      })
    })
  },
}
</script>

<style scoped>
.merchantRateBody {
  padding: 20px;
}
.rateCol {
  margin: 0 20px 20px 0;
  padding: 20px;
  border-bottom: 1px solid grey;
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
