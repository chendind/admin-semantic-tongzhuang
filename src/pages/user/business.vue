<template>
  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">后台</a>
        <i class="right angle icon divider"></i>
        <div class="active section">用户管理</div>
        <i class="right angle icon divider"></i>
        <div class="active section">商户管理</div>
      </div>
    </h1>
    <div class="ui category search after">
      <!-- <div class="ui buttons"> -->
        <router-link :to="{path:'/user/businessInfo'}" class="ui green right floated right labeled icon button">
          新增商户
          <i class="plus icon"></i>
        </router-link>
      <!-- </div> -->


    </div>
      <table class="ui celled table">
        <tbody>
          <tr v-for="data in datas">
            <td>
              <router-link class="ui items" :to="{path:'/user/businessInfo',query:{id:data.id}}">
                <div class="item">
                  <div class="ui image tiny">
                    <img :src="data.headImg"/>
                  </div>
                  <div class="content" style="margin-top:5px">
                    <a class="header" style="vertical:middle;">{{data.name}}</a>
                    <div class="ui grid">
                      <div class="eight wide column">
                        <div class="meta">
                          <p><b>店铺代码:&nbsp;</b>{{data.code}}</p>
                          <p><b>地点:&nbsp;</b>{{data.location}}</p>
                          <p><b>主营产品:&nbsp;</b>{{data.product}}</p>

                        </div>
                      </div>
                      <div class="eight wide column">
                        <div class="meta">
                          <p><b>负责人:&nbsp;</b>{{data.principal}}</p>
                          <p><b>联系方式:&nbsp;</b>{{data.phone}}</p>
                          <p><b>关注人数:&nbsp;</b>{{data.focus}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>
<script>
import Vue from 'vue'

import ajax from 'src/ajax/ajax.js'


export default {
  name: 'business',
  data(){
    return {
      datas: [],
      current: 0,
      length: 10
    }
  },
  methods: {
    getData(){
      $.when(ajax.getBusiness(this.current*this.length,this.length,'back')).done((data)=>{
        this.datas = data.list
      })
    }
  },
  components: {

  },
  created(){
    this.getData();
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
