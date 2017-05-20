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
                  <div class="ui star rating" :data-rating="total" data-max-rating="5"></div>
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
                  <div class="ui star rating" :data-rating="environment" data-max-rating="5"></div>
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
                  <div class="ui star rating" :data-rating="attitude" data-max-rating="5"></div>
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
                  <div class="ui star rating" :data-rating="service" data-max-rating="5"></div>
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
              <div class="ui flowing popup transition tiny">
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
    getEvaluation(evaluationModel_id,start,rows,orders) {
      ajax.getEvaluation(evaluationModel_id,start,rows,orders).done((data)=>{
        console.log(data);
      })
    }
  },
  data () {
    return {
      type: '零食',
      detail: "",
      rateNum: "123",
      total: 2,
      environment: 3,
      attitude: 2,
      service: 5,
      rates: [
        {
        username: null,
        avata: null,
        text: null,
        time: null,
        showPic:[{
          url: null,
        },
        {
          url: null,
        }],
        showEnvironment: 5,
        showAttitude: 4,
        showService: 4
      },
      {
        username: null,
        avata: null,
        text: null,
        time: null,
        showPic:[{
          url: null,
        }],
        showEnvironment: 3,
        showAttitude: 1,
        showService: 1
      }],
      totalPage: 6,
      length: 10
    }
  },
  created: function(){
    if(this.$route.query.id){
      // ajax.getProductInfo(this.$route.query.id).done((data)=>{
      //   if(data.state == 0){
      //     this.rateNum = data.data.evaluationModel.sum
      //   }
      // });
      // this.getEvaluation(this.$route.query.id, 0, 10, true);
    }
  },
  mounted(){
    $('.ui.rating').rating('disable');

    $('.brePic').popup({
    position   : 'top right'
  });

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
  margin-bottom: 10px;
}
</style>
