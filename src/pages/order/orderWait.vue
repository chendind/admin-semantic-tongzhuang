<template>
  <div>
    <div>
      <vue-table
        class="order-table"
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
      return new Promise((resolve, reject)=>{
        this.$http.get(`/static/fake-data/order/page-${page || 1}.json`).then((res)=>{
          resolve(res)
        }, (e)=>{reject(e)})
      })
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
