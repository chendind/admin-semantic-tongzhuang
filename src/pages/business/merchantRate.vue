<template>

  <div class="merchantRateBody">

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
              <div class="ui star rating" :data-rating="quality" data-max-rating="5"></div>
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
              <div class="ui star rating" :data-rating="style" data-max-rating="5"></div>
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
              <div class="ui star rating" :data-rating="price" data-max-rating="5"></div>
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
              <div class="ui flowing popup transition tiny">
                <img class="ui image" :src="pic.url">
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
        console.log(data);
      })
    }
  },
  data () {
    return {
      name: '爱疯7 64G',
      type: '零食',
      detail: "",
      img:  require("assets/image.png"),
      material: "null",
      rateNum: "123",
      total: 2,
      quality: 3,
      style: 2,
      price: 5,
      rates: [
        {
        username: "br vnf j",
        avata: require("assets/image.png"),
        text: "dfghjm,jhgfdfghjk",
        time: "2017-5-13 10:59:00",
        showPic:[{
          url:"http://tongzhuang.moovi-tech.com/uploads/img/fa699ac4c4e0402a847ef478ec43e38c.jpg"
        },
        {
          url:"http://tongzhuang.moovi-tech.com/uploads/img/fa699ac4c4e0402a847ef478ec43e38c.jpg"
        }],
        showQuality: 5,
        showStyle: 4,
        showPrice: 4
      },
      {
        username: "MJ",
        avata: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=948933877,1384040484&fm=58",
        text: "You are running Vue in development mode.Make sure to turn on production mode when deploying for production.You are running Vue in development mode.Make sure to turn on production mode when deploying for production.",
        time: "2017-5-13 10:59:00",
        showPic:[{
          url:"https://cn.vuejs.org/images/logo.png"
        }],
        showQuality: 3,
        showStyle: 1,
        showPrice: 1
      }],
      totalPage: 6,
      length: 10
    }
  },
  created: function(){
    if(this.$route.query.id){
      ajax.getProductInfo(this.$route.query.id).done((data)=>{
        if(data.state == 0){
          this.img = data.data.photo
          this.name = data.data.name
          this.material = data.data.material
          this.rateNum = data.data.evaluationModel.sum
        }
      });
      this.getEvaluation(this.$route.query.id, 0, 10, true);
    }
  },
  mounted(){
    $('.ui.rating').rating('disable');

    $('.brePic').popup({inline: true
  });

  }
}
</script>

<style scoped>
.merchantRateBody {
  padding: 20px;
}
.titleBox {
  line-height: 24px;
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
  width: 80px;float: left;
  margin-bottom: 10px;
}
</style>
