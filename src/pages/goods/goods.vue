<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">后台</a>
        <i class="right angle icon divider"></i>
        <div class="active section">商品列表</div>
      </div>
    </h1>
    <div class="ui category search">
      <div class="ui icon input">
        <input class="prompt" type="text" placeholder="Keywords Here...">
        <i class="search icon"></i>
      </div>
      <router-link :to="{path:'/goods/goodsInfo'}" class="ui button">新增商品</router-link>
    </div>
    <table class="ui celled table">
      <tbody>
        <tr v-for="good in goods">
          <td>
            <router-link :to="{path:'/goods/goodsInfo',query:{id:good.id}}" class="ui image header">
                <img class="ui rounded top aligned tiny image" :src="good.img">
                <div class="content">
                    {{good.name}}
                    <div class="sub header">{{good.score}}积分 已售{{good.sold}}</div>
                </div>
            </router-link>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="4">
            <pagination v-if="total" id="pagination" current="1" :total="total" show="10" v-on:pageChange="pageChange"></pagination>
          </th>
        </tr>
      </tfoot>
    </table>
  </div>

</template>

<script>
import ajax from 'src/ajax/ajax.js'
import Pagination from 'src/components/Pagination.vue'
export default {
  name: 'goods',
  components: {
    Pagination: Pagination
  },
  methods:{
    pageChange(index){
      console.log(index)
    },
    getGoods(){
      $.when(ajax.getGoods(this.start, this.length)).done((data)=>{
        // if(data.state == 0){
          this.goods = data.list
          this.total = data.countAll
        // }
      })
    }
  },
  data () {
    return {
      goods: [],
      start: 0,
      length: 10,
      total: 0
    }
  },
  beforeCreate(){

  },
  created(){

  },
  mounted(){
    this.getGoods()
  }
}
</script>

<style scoped>
.ui.header .sub.header{
  margin-top: 30px;
}
</style>
