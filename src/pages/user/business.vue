<template>
  <div>
    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <a class="section">后台</a>
        <i class="right angle icon divider"></i>
        <div class="active section">商户管理</div>
      </div>
    </h1>
    <div class="ui category search after">
        <router-link :to="{path:'/user/businessInfo'}" class="ui green right floated right labeled icon button">
          新增商户
          <i class="plus icon"></i>
        </router-link>
    </div>
    <table class="ui celled table">
      <tbody>
        <tr v-for="(data,$index) in datas">
          <td>
            <router-link class="ui items" :to="{path:'/user/businessInfo',query:{id:data.id}}">
              <div class="item">
                <div class="ui image tiny">
                  <img :src="data.headImg"/>
                </div>
                <div class="content" style="margin-top:5px">
                  <a class="header" style="vertical:middle;">{{data.name}}</a>
                  <div class="ui grid">
                    <div class="six wide column">
                      <div class="meta">
                        <p><b>店铺代码:&nbsp;</b>{{data.code}}</p>
                        <p><b>地点:&nbsp;</b>{{data.location}}</p>
                        <p><b>主营产品:&nbsp;</b>{{data.product}}</p>
                      </div>
                    </div>
                    <div class="ten wide column">
                      <div class="meta">
                        <p><b>负责人:&nbsp;</b>{{data.principal}}</p>
                        <p><b>联系方式:&nbsp;</b>{{data.phone}}</p>
                        <p><b>关注人数:&nbsp;</b>{{data.focus}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
            <div class="ui right floated absolute vertical" style="right: 75px; width: 220px">
                <div class="ui button"  @click="codeView(data.name,data.id,data.code)">二维码</div>
              <router-link :to="{path:'/user/merchantRate',query:{id:data.id}}">
                <div class="ui button">查看评价</div>
              </router-link>
            </div>
            <div class="ui right floated red button absolute vertical" style="right: 15px;" @click="deleteBusiness($index)">删除</div>
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

    <div class="ui modal producerCode" id="producerCode">
        <i class="remove link icon" @click="disableCode" id="closeIcon"></i>
        <div class="image content">
            <div id="qrcode"></div>
          </div>
      </div>

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
      ajax.getBusiness(start,length,'back').done((data)=>{
        this.datas = data.list
        this.total = data.countAll
      })
    },
    pageChange(index){
      this.getData((index-1)*this.length, this.length)
      this.current = index
    },
    deleteBusiness(index){
      xy.confirm('确定删除这个商家吗？',(button)=>{
        if(button == 1){
          xy.toast('删除中...')
          let id = this.datas[index].id
          ajax.deleteBusiness(id).done((data)=>{
            if(data.state == 0){
              xy.toast('删除成功')
              this.datas.splice(index,1)
              this.pageChange(this.current)
            }
          })
        }
      })
    },
    codeView(name,index,code) {

      $('.producerCode').modal('show');

        $('#qrcode').empty();
      if(!$('#qrcode').html()){
        $('#qrcode').html("<div style='margin-bottom:20px'> " + name +"</div>");
        let buf = {
          code: code,
          type: "business",
          url: "http://xingweiapp.com/app/index.html#/market_info?id=" + index
        };// JSON.parse();
        buf = JSON.stringify(buf);
        buf = "http://xingweiapp.com/app/index.html#/market_info?id=" + index;

        $.ajax({
            async : true,
            url : "http://suo.im/api.php",
            type : "GET",
            dataType : "jsonp", // 返回的数据类型，设置为JSONP方式
            jsonp : 'callback', //指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
            jsonpCallback: 'handleResponse', //设置回调函数名
            data : {
                format : "jsonp", 
                url : buf
            }, 
            success: function(response, status, xhr){
                buf = response.url;

                $('#qrcode').qrcode(buf);
            }
        });
        
      }
    },
    disableCode () {
       $('.producerCode').modal('hide');
    },
  },
  components: {
    Pagination
  },
  created(){
    this.getData(0,this.length);
  },
  mounted(){

  },
  beforeDestroy: function () {
    $('#producerCode').remove();
  },
}

</script>
<style lang="less">
#producerCode {
  width: 300px;
 left: 50%;
 margin-left: -150px;
}
#closeIcon {
  position: absolute;
  left: 275px;
  top: 10px;
}
table td{
  position: relative;
}
</style>
