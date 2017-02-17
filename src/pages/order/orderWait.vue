<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">后台</a>
        <i class="right angle icon divider"></i>
        <div class="active section">待处理</div>
      </div>
    </h1>
    <table class="ui celled table">
      <tbody>
        <tr v-for="good in goods">
          <td>
            <router-link :to="{path:'/order/orderInfo',query:{id:good.id,type:1}}" class="ui image header" style="width:100%">
            <!-- <div class="ui image header" style="width:100%"> -->
                <img class="ui rounded top aligned tiny image" :src="good.pImg">
                <div class="content" style="width:80%">
                    {{good.pName}}
                    <div class="sub header">
                      <span>订单号：{{good.code}}</span>
                      <span>{{good.score}}积分 ×{{good.number}}</span>
                    </div>
                    <div class="sub header">
                      <span>下单时间：{{getLocalTime(good.time)}}</span>
                      <span v-if="good.user">买家昵称：{{good.user}}</span>
                    </div>
                    <div class="sub header">
                      <span></span>
                      <span>
                        <span class="state">
                          {{good.state}}
                        </span>
                      </span>
                    </div>
                    <!-- <div class="sub header">{{good.score}}积分 已售{{good.sold}}</div> -->
                <!-- </div> -->
            </div>
            </router-link>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="4">
            <pagination v-if="total" id="pagination" current="1" :total="total" :show="length" v-on:pageChange="pageChange"></pagination>
          </th>
        </tr>
      </tfoot>
    </table>
  </div>

</template>

<script>
import ajax2 from 'src/ajax/ajax2.js'
import Pagination from 'src/components/Pagination.vue'
export default {
  name: 'goods',
  components: {
    Pagination: Pagination
  },
  methods:{
    getLocalTime(nS) {     
       return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    },
    pageChange(params){
      var number = (params-0-1)*10
      var self = this
      $.when(ajax2.getOrderForPage(number, 10, "wait")).done(function(data){
        self.goods = data.list
        self.total = data.countAll
      })
    },
    getOrderForPage(start, length,type){
      $.when(ajax2.getOrderForPage(start, length, type)).done((data)=>{
        this.goods = data.list
        this.total = data.countAll
      })
    },
  },
  data () {
    return {
      goods: [],
      length: 10,
      total: 0,
      keyWord: ""
    }
  },
  beforeCreate(){

  },
  created(){

  },
  mounted(){
    this.getOrderForPage(0, this.length,"wait")
  }
}
</script>

<style scoped lang="less">
.ui.header .sub.header{
  margin-top: 5px;
  span{
    display: inline-block;
    width:49%;
  }
}
.state{
  width: 80px !important;
  color: white;
  border-radius: 8px;
  text-align: center;
  display: inline-block;
  padding: 5px 10px;
  background-color: #26a69a;
}
</style>