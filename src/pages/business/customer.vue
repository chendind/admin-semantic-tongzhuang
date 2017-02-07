<template>
  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">后台</a>
        <i class="right angle icon divider"></i>
        <div class="section">用户管理</div>
        <i class="right angle icon divider"></i>
        <div class="active section">客户管理</div>
      </div>
    </h1>
    <table class="ui celled table">
      <tbody>
        <tr v-for="data in datas">
          <td>
            <router-link class="ui items" :to="{path:'/user/customerInfo',query:{id:data.id}}">
              <div class="item">
                <div class="ui image tiny">
                  <img :src="data.img"/>
                </div>
                <div class="content" style="margin-top:5px">
                  <a class="header" style="vertical:middle;">{{data.name}}</a>
                  <div class="ui grid">
                    <div class="eight wide column">
                      <div class="meta">
                        <p><b>订单总数:&nbsp;</b>{{data.order}}</p>
                        <p><b>当前积分:&nbsp;</b>{{data.score}}</p>

                      </div>
                    </div>
                    <div class="eight wide column">
                      <div class="meta">
                        <p><b>关注店铺数:&nbsp;</b>{{data.focus}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>
            <pagination v-if="total" id="pagination" current="1" :total="total" :show="length" v-on:pageChange="pageChange"></pagination>
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import Vue from 'vue'

import ajax from 'src/ajax/ajax.js'
import Pagination from 'src/components/Pagination.vue'

export default {
  name: 'business',
  data(){
    return {
      datas: [],
      current: 1,
      length: 10,
      total: 0
    }
  },
  methods: {
    getData(start, length){
      ajax.getUser(start,length,'back').done((data)=>{
        this.datas = data.list
        this.total = data.countAll
      })
    },
    pageChange(index){
      this.getData((index-1)*this.length, this.length)
      this.current = index
    }
  },
  components: {
    Pagination
  },
  created(){
    this.getData(0,this.length);
  }
}

</script>
<style lang="less">

</style>
