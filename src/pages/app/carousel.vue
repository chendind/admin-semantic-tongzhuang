<template>

  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">APP</a>
        <i class="right angle icon divider"></i>
        <div class="active section">轮播图设置</div>
      </div>
    </h1>
    <div class="ui category search after">
      <router-link :to="{path:'/app/carouselInfo'}" class="ui green right floated right labeled icon button">
        新增轮播图
        <i class="plus icon"></i>
      </router-link>
    </div>
    <table class="ui celled table">
      <thead>
        <tr><th>轮播图</th>
        <th>对应商品</th>
        <th>播放顺序</th>
        <th>操作</th>
      </tr></thead>
      <tbody>
        <tr v-for="(carousel, $index) in carouselList">
          <td>
            <img :src="carousel.img" alt="" class="ui small image">
          </td>
          <td>
            <router-link :to="{path: '/goods/goodsInfo', query:{
              id:carousel.productId
            }}">
            查看对应商品
            </router-link>
          </td>
          <td>
            {{carousel.order}}
          </td>
          <td>
            <router-link :to="{path: '/app/carouselInfo', query: {
              id: carousel.id,
              img: carousel.img,
              productId: carousel.productId,
              order: carousel.order
            }}" class="ui blue button mini">编辑</router-link>
            <button class="ui red button toggle mini" @click="deleteCarousel(carousel.id, $index)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import ajax from 'src/ajax/ajax.js'
export default {
  name: 'carousel',
  components: {

  },
  methods:{
    deleteCarousel(id, index){
      ajax.deleteCarousel(id).done((data)=>{
        if(data.state == 0){
          xy.toast('删除成功');
          this.$data.carouselList.splice(index,1);
        }
      })
    }
  },
  data () {
    return {
      carouselList: []
    }
  },
  mounted(){
    ajax.getCarouselList().done((data)=>{
      this.$data.carouselList = data.list
    })
  }
}
</script>

<style scoped>

</style>
