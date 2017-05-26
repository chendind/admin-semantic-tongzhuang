<template>

  <div>

    <div class="ui items titleBox">
      <div class="item">
        <div class="image">
            <img :src="img">
        </div>
        <div class="content">
          <div class="ui form">
            <div class="field">
              <label>产品名称</label>
              <span>{{ name }}</span>
            </div>
            <div class="field">
              <label>产品材料</label>
              <span>{{ material }}</span>
            </div>
            <div class="field">
              <label>评价次数</label>
              <span>{{ rateNum }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ui items">
      <div class="item">
        <label>产品总评</label>
        <div class="content">
          <div class="ui form">
            <div class="field">
              <div class="ui star rating" :data-rating="totalInt" data-max-rating="5" ></div>
              <span>{{ total }}</span>
              <span>分</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <label>产品质量</label>
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
        <label>产品款式</label>
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
              <label>产品价位</label>
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
              <label>产品质量</label>
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
              <label>产品款式</label>
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
              <label>产品价位</label>
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
              buf.time = data.data[i].in_time;
              if (data.data.photo != []) {
                for (let i = 0; i < data.data[i].photo.length; i++) {
                  let picUrl = {
                    url: null
                  };
                  picUrl.url = data.data[i].photo[i];
                    buf.showPic.push(picUrl);
                    debugger
                  }
                }
                debugger
              buf.showQuality = data.data[i].environment;
              buf.showStyle = data.data[i].attitude;
              buf.showPrice = data.data[i].after_sale;
              this.rates.push(buf);
            }
              
          }

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
          this.quality = parseInt(data.data.evaluationModel.environment *10 / data.data.evaluationModel.sum ) /10;
          this.style = parseInt(data.data.evaluationModel.attitude *10 / data.data.evaluationModel.sum) /10;
          this.price = parseInt(data.data.evaluationModel.after_sale *10 / data.data.evaluationModel.sum) /10;
          this.total = parseInt((data.data.evaluationModel.attitude + data.data.evaluationModel.after_sale + data.data.evaluationModel.environment) *10 / (data.data.evaluationModel.sum * 3)) /10;

          this.qualityInt = parseInt(data.data.evaluationModel.environment / data.data.evaluationModel.sum);
          this.styleInt = parseInt(data.data.evaluationModel.attitude / data.data.evaluationModel.sum);
          this.priceInt = parseInt(data.data.evaluationModel.after_sale / data.data.evaluationModel.sum);
          this.totalInt = parseInt((data.data.evaluationModel.attitude + data.data.evaluationModel.after_sale + data.data.evaluationModel.environment) / (data.data.evaluationModel.sum * 3));

          this.getEvaluation(data.data.evaluationModel.id, 0, 10, true);


          this.$nextTick(()=>{
            $('.ui.rating').rating('disable');
          })

        }
      });

    }

    
  },

  mounted(){
           
     this.$nextTick(()=>{
      $('.brePic').popup({
        position: "right center",
        lastResort: true
      });
    })
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
