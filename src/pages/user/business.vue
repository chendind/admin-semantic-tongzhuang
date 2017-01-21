<template>
  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">后台</a>
        <i class="right angle icon divider"></i>
        <div class="active section">用户管理</div>
        <div class="active section">商户管理</div>
      </div>
    </h1>
    <div class="ui category search">
      <!-- <div class="ui icon input">
        <input class="prompt" type="text" placeholder="输入商品名搜索" v-model="keyWord" @keyup.13="searchGoods()">
        <i class="search icon" @click="searchGoods()"></i>
      </div> -->
      <router-link :to="{path:'/user/businessInfo'}" class="ui green right floated right labeled icon button">
        新增商户
        <i class="plus icon"></i>
      </router-link>
    </div>
    <div>
      <vue-table
        class="order-table ui-table"
        ref="table"
        api-url="/static/fake-data/order/page-1.json"
        :fields="fields"
        @vuetable:pagination-data="onPaginationData"
        :custom-ajax="getData"
      ></vue-table>
      <vuetable-pagination ref="pagination"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueTable from 'components/vue-table/Vuetable.vue'
import VuetablePagination from 'components/vue-table/VuetablePagination'
import ajax from 'src/ajax/ajax.js'
Vue.component('order-td', {
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  render(h){
    var data = this.rowData

    return <div class="ui items">
      <div class="item">
        <div class="image">
          <img src={data.order.url}/>
        </div>
        <div class="content" style="margin-top:5px">
          <a class="header" style="vertical:middle;">{data.order.name}</a>
          <div class="ui tag labels" style="display:inline-block;vertical-align:middle;margin-left:10px;">
            <div class="ui label" style="margin-bottom:0px;">{data.state}</div>
          </div>
          <div class="meta">
            <p><b>买家昵称:&nbsp;</b>{data.customer.name}</p>
            <p><b>订单编号:&nbsp;</b>{data.order.id}</p>
            <p><b>下单日期:&nbsp;</b>{data.date}</p>
          </div>
          <div class="description">
            <div class="ui mini statistics">
              <div class="statistic" style="margin-bottom:0px;">
                <div class="value">
                  {data.order.quantity}
                </div>
                <div class="label">
                  数量
                </div>
              </div>
              <div class="statistic" style="margin-bottom:0px;">
                <div class="value">
                  {data.points}
                </div>
                <div class="label">
                  积分
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
})

export default {
  data(){
    return {
      fields: [
        "__component:order-td"
      ]
    }
  },
  methods: {
    getData(params){
      var page = params.page
      return ajax.getOrder(0,10,'wait').done(function(data){
        console.log(data)
      })
      // return new Promise((resolve, reject)=>{
      //   this.$http.get(``).then((res)=>{
      //     resolve(res)
      //   }, (e)=>{reject(e)})
      // })
    },
    onChangePage (page) {
      this.$refs.table.changePage(page)
    },
    onPaginationData (tablePagination) {
      this.$refs.pagination.setPaginationData(tablePagination)
    }
  },
  components: {
    VueTable,
    VuetablePagination
  }
}

</script>
<style lang="less">
  .order-table {
    thead {
      display: none;
    }


    td:first-child {
      width: 100px;
    }
  }
</style>
