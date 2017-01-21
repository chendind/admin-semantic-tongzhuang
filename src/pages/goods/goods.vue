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
        <input class="prompt" type="text" placeholder="输入商品名搜索" v-model="keyWord" @keyup.13="searchGoods()">
        <i class="search icon" @click="searchGoods()"></i>
      </div>
      <router-link :to="{path:'/goods/goodsInfo'}" class="ui green right floated right labeled icon button">
        新增商品
        <i class="plus icon"></i>
      </router-link>
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
            <pagination v-if="total" id="pagination" current="1" :total="total" :show="length" v-on:pageChange="pageChange"></pagination>
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
      this.getGoods(this.length*(index-1), this.length);
    },
    getGoods(start, length){
      $.when(ajax.getGoods(start, length)).done((data)=>{
        this.goods = data.list
        this.total = data.countAll
      })
    },
    searchGoods(){
      $.when(ajax.searchGoods(this.keyWord)).done((data)=>{

      })
    },
    updateTable(data){

    }
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
    this.getGoods(0, this.length)
  }
}
</script>

<style scoped>
.ui.header .sub.header{
  margin-top: 30px;
}
</style>
