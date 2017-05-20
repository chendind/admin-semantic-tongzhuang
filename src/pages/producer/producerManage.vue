<template>
  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">后台</a>
        <i class="right angle icon divider"></i>
        <div class="active section">厂家管理</div>
      </div>
    </h1>
    <div class="ui category search after">
        <router-link :to="{path:'/producer/producerDetail'}" class="ui green right floated right labeled icon button">
          新增厂家
          <i class="plus icon"></i>
        </router-link>
    </div>
    <table class="ui celled table">
      <tbody>
        <tr v-for="(data,$index) in datas">
          <td>
            <router-link class="ui items" :to="{path:'/producer/producerDetail',query:{id:data.id,index:$index}}">
              <div class="item">
                <div class="ui image tiny">
                  <img :src="data.photo">
                </div>
                <div class="content" style="margin-top:5px">
                  <a class="header" style="vertical:middle;">{{data.name}}</a>
                  <div class="ui grid">
                    <div class="eight wide column">
                      <div class="meta">
                        <p><b>厂家名称:&nbsp;</b>{{data.code}}</p>
                        <p><b>厂家地址:&nbsp;</b>{{data.address}}</p>

                      </div>
                    </div>
                    <div class="eight wide column">
                      <div class="meta">
                        <p><b>负责人:&nbsp;</b>{{data.principal}}</p>
                        <p><b>联系方式:&nbsp;</b>{{data.contact}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
            <div class="ui right floated red button absolute vertical" style="right: 15px;" @click="deleteProducer($index)">删除</div>
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
      databuf: [],
      current: 1,
      length: 8,//每页显示条目,只需要修改此项即可
      total: 0
    }
  },
  methods: {
    getData(){
      ajax.getProducerList().done((data)=>{
        this.databuf = data.data;
        this.total = data.data.length;
        this.fillData();
      })
    },
    fillData() {
      let pageCount = parseInt(this.total/this.length) + 1; 
      let startCol = (this.current - 1) * this.length;
      var endCol = this.current * this.length;
      this.datas = [];
      if(this.current < pageCount) {
        for (let i = startCol; i < endCol; i++) {
          this.datas.push(this.databuf[i]);
        }
      }
      else
      {
        for (let i = startCol; i < this.total; i++) {
          this.datas.push(this.databuf[i]);
        }
      }
    },
    pageChange(index){
      // this.getData((index-1)*this.length, this.length)
      this.current = index;
      this.fillData();
    },
    deleteProducer(index){
      xy.confirm('确定删除这个商家吗？',(button)=>{
        if(button == 1){
          xy.toast('删除中...')
          let id = this.datas[index].id
          console.log(id);
          ajax.deleteProducer(id).done((data)=>{
            if(data.state == 0){
              xy.toast('删除成功')
              this.datas.splice(index,1)
              this.pageChange(this.current)
            }
          })
        }
      })
    }
  },
  components: {
    Pagination
  },
  created(){
    this.getData();

  }
}

</script>
<style lang="less">
table td{
  position: relative;
}
</style>
