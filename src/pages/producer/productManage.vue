<template>

  <div>

    <h1 class="ui dividing header">
      <div class="ui breadcrumb">
        <div class="active section">产品管理</div>
      </div>
    </h1>
    <div class="ui category">
      <router-link :to="{path:'/producer/productdetail'}" class="ui green right floated right labeled icon button">
        新增
        <i class="plus icon"></i>
      </router-link>
    </div>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>产品id</th>
          <th>产品详情</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(good,$index) in products">
          <td>
            {{good.id}}
          </td>
          <td>
            <router-link :to="{path:'/producer/productdetail',query:{id:good.id}}" class="ui image header">
              <img class="ui rounded top aligned tiny image" :src="good.photo">
              <div class="content">
                {{good.name}}
                <div class="sub header">评价次数{{good.evaluationModel.sum}}</div>
              </div>
            </router-link>
          </td>
          <td>
            <div class="ui red button" @click="deleteProduct($index)">删除</div>
            <router-link :to="{path:'/producer/productRate',query:{id:good.id}}" class="ui">
              <div class="ui button">查看评价</div>
            </router-link>
            <div class="ui button" @click="codeView(good.name,good.id)">二维码</div>
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

    <div class="ui modal productCode" id="productCode">
      <i class="remove link icon" @click="disableCode" id="closeIcon"></i>
      <div class="image content">
          <div id="qrcode"></div>
        </div>
    </div>
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
      products: [],
      length: 10,
      total: 0,
      current: 1

    }
  },
  watch: {
   
  },
  methods:{
    pageChange(index){
      this.getGoods(this.length*(index-1), this.length)
      this.current = index
    },

    getProducts() {
       ajax.getProducerInfo().done((data)=>{
        console.log(data);
        this.products = data.data.goods;
      })
    },

    deleteProduct(index){
      let id = this.products[index].id;
      xy.confirm('确定要删除这个产品吗？',(button)=>{
        if(button == 1){
          xy.toast('删除中...')
          ajax.deleteProduct(id).done((data)=>{
            if(data.state == 0){
              xy.toast('删除成功')
              this.products.splice(index,1)
              this.pageChange(this.current)
            }
          })
        }
      });
    },

    disableCode () {
       $('.productCode').modal('hide');
    },

    codeView(name,index) {  
        $('.productCode').modal('show');

        $('#qrcode').empty();
        $('#qrcode').html("<div style='margin-bottom:20px'>产品:" + name +"的二维码</div>");
        let buf = {
          type: "product",
          url: "http://tongzhuang.moovi-tech.com/index.html#/product_info?id=" + index
        };// JSON.parse();
        buf = JSON.stringify(buf);
        $('#qrcode').qrcode(buf);

    }
  },

  beforeCreate(){

  },

  created(){
    // "data":{
      //   "id":1,
      //   "name":"东厂",
      //   "address":"杭州",
      //   "principal":"王先生",
      //   "contact":"18888888888",
      //   "detail":"详情介绍",
      //   "photo":"/a/b.jpg",
      //   "code":"CJ00001",
      //   "goods":[
      //   {
      //     "id":1,
      //     "name":"商品名称",
      //     "photo":"/a/b.jpg",
      //     "material":"材料",
      //     "detail":"商品详情",
      //     "evaluationModel":
      //     {
      //       "id":1,
      //       "environment":0,
      //       "attitude":0,
      //       "after_sale":0,
      //       "sum":0,
      //       "evaluation":[]
      //     }
      //   }
      //   ]
      // },
      // "state":"0"
  },

  mounted(){
    this.getProducts();

      $('#qrcode').empty();
    //just for an UI bug
      if(!$('#qrcode').html()){
        $('#qrcode').html("<div></div>");
        $('#qrcode').qrcode("http://tongzhuang.moovi-tech.com/index.html#/product_info?id=");
      }
   //end here

  },

   beforeDestroy: function () {
                $('#productCode').remove();
            },
}
</script>

<style scoped>
.ui.header .sub.header{
  margin-top: 30px;
}
.category {
  height: 36px;
  margin-bottom: 20px;
}
#productCode {
  width: 300px;
 left: 50%;
 margin-left: -150px;
}
#closeIcon {
  position: absolute;
  left: 275px;
  top: 10px;
}
</style>
