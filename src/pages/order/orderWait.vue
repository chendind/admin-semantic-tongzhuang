<template>
  <div>
    <div>
      <vue-table
        ref="table"
        api-url="/static/fake-data/order/page-1.json"
        :fields="fields"
      ></vue-table>
    </div>
  </div>
</template>
<script>
import VueTable from 'components/vue-table/Vuetable.vue'

export default {
  data(){
    return {
      fields: [
        {
          name: 'id',
          title: '序号',
          dataClass: 'center aligned'
        },
        {
          name: 'name',
          title: '名称',
          sortField: 'name'
        }
      ]
    }
  },
  mounted(){

  },
  components: {
    VueTable
  }
}

</script>
<style>

</style>
