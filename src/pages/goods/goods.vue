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
      <div class="ui action input">
        <input type="text" placeholder="输入商品名搜索" v-model="keyWord" @keyup.enter="searchGoods">
        <button class="ui button" @click="searchGoods">搜索</button>
      </div>
      <router-link :to="{path:'/goods/goodsInfo'}" class="ui green right floated right labeled icon button">
        新增商品
        <i class="plus icon"></i>
      </router-link>
    </div>
    <table class="ui celled table" v-if="!showSearchBlock">
      <thead>
        <tr><th>商品id</th>
        <th>商品详情</th>
        <th>操作</th>
      </tr></thead>
      <tbody>
        <tr v-for="(good,$index) in goods">
          <td>
            {{good.id}}
          </td>
          <td>
            <router-link :to="{path:'/goods/goodsInfo',query:{id:good.id}}" class="ui image header">
                <img class="ui rounded top aligned tiny image" :src="good.img">
                <div class="content">
                    {{good.name}}
                    <div class="sub header">{{good.score}}积分 已售{{good.sold}}</div>
                    <div class="extra">

                    </div>
                </div>
            </router-link>
          </td>
          <td>
            <div class="ui button" @click="setRecommend($index)" :class="{'blue': !good.recommend}">
              <template v-if="!good.recommend">
                设置推荐
              </template>
              <template v-else>
                取消推荐
              </template>
            </div>
            <div class="ui red button" @click="deleteGood($index)">删除</div>
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
    <table class="ui celled table" v-if="showSearchBlock">
      <thead>
        <tr>
          <th colspan="4">
            <h4>搜索结果<template v-if="searchedGoods.length == 0">为空</template></h4>
            <p>提示：输入关键词后按回车搜索；清空搜索框回到列表页</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(good,$index) in searchedGoods">
          <td>
            <router-link :to="{path:'/goods/goodsInfo',query:{id:good.id}}" class="ui image header">
                <img class="ui rounded top aligned tiny image" :src="good.img">
                <div class="content">
                    {{good.name}}
                    <div class="sub header">{{good.score}}积分 已售{{good.sold}}</div>
                    <div class="extra">

                    </div>
                </div>
            </router-link>
            <div class="ui right floated red button" @click="deleteGood($index)">删除</div>
          </td>
        </tr>
      </tbody>
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
  data () {
    return {
      goods: [],
      length: 10,
      total: 0,
      current: 1,
      keyWord: "",
      searchedGoods: [],
      showSearchBlock: false,
    }
  },
  watch: {
    keyWord: function(val, oldVal){
      if(val == ''){
        this.showSearchBlock = false
        this.searchedGoods = []
      }
    }
  },
  methods:{
    pageChange(index){
      this.getGoods(this.length*(index-1), this.length)
      this.current = index
    },
    getGoods(start, length){
      ajax.getGoods(start, length).done((data)=>{
        console.log(data);
        this.goods = data.list
        this.total = data.countAll
      })
    },
    searchGoods(){
      this.showSearchBlock = true
      ajax.searchGoods(this.keyWord).done((data)=>{
        this.searchedGoods = data.list
      })
    },
    deleteGood(index){
      let id = this.goods[index].id
      xy.confirm('确定要删除这个商品吗？',(button)=>{
        if(button == 1){
          xy.toast('删除中...')
          ajax.deleteGood(id).done((data)=>{
            if(data.state == 0){
              xy.toast('删除成功')
              this.goods.splice(index,1)
              this.pageChange(this.current)
            }
          })
        }
      })
    },
    setRecommend(index){
      let id = this.goods[index].id
      let recommend = this.goods[index].recommend
      ajax.recommendProductOrNot(id).done((data) => {
        if(data.state == 0){
          this.goods[index].recommend = !recommend + 0;
          xy.toast('操作成功')
        }
      })
    },
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
