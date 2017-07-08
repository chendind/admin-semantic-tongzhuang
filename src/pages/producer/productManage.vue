<template>

  <div>
    <div class="tagBox">
      <div class="circle"></div>
      <span>产品列表</span>
    </div>  
    <router-link :to="{path:'/producer/productdetail'}">
      <div id="addBtn">
        <i class="iconfont icon-tianjia"></i>
        <span>新增</span>
      </div>
    </router-link>
    <table class="ui table">
      <thead>
        <tr>
          <th class="tableCommonFont four wide table_left">产品ID</th>
          <th class="tableCommonFont six wide">产品详情</th>
          <th class="tableCommonFont six wide">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(good,$index) in products">
          <td class="table_left">
            <span class="tableCommonFont">{{good.id}}</span>
          </td>
          <td>
            <router-link :to="{path:'/producer/productdetail',query:{id:good.id}}" class="ui image header">
              <img class="ui rounded top aligned image avartaPic" :src="good.photo">
              <div class="content">
                <!-- {{good.name}} -->
                <span class="goodName">{{good.name}}</span>
                <div class="sub header tableCommonFont" style="margin-top:14px;">评价次数：{{good.evaluationModel.sum}}</div>
              </div>
            </router-link>
          </td>
          <td>
            <div class="editBtn1" @click="deleteProduct($index)"><span>删除</span></div>
            <router-link :to="{path:'/producer/productRate',query:{id:good.id}}" class="ui">
              <div class="editBtn2"><span>查看评价</span></div>
            </router-link>
            <div class="editBtn2" @click="codeView(good.name,good.id)"><span>二维码</span></div>
          </td>
        </tr>
      </tbody>
      <!-- <tfoot v-if="total">
        <tr>
          <th colspan="4">
            <pagination id="pagination" page="1" :total="total" :show="length" v-on:pageChange="pageChange"></pagination>
          </th>
        </tr>
      </tfoot> -->
    </table>

    <div class="paginationFoot">
      <div class="frontPage" v-if="!(page === 1)" @click="pageChange(page - 1)"><span>上一页</span></div>
      <div class="pointBox" v-if="!(pages[0] === 1)" @click="pageChange(1)">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="pageBox" @click="pageChange(pages[0])" :class="page == pages[0]?'currentPage':''"><span>{{pages[0]}}</span></div>
      <div class="pageBox" @click="pageChange(pages[1])" :class="page == pages[1]?'currentPage':''" v-if="pages[1]"><span>{{pages[1]}}</span></div>
      <div class="pageBox" @click="pageChange(pages[2])" :class="page == pages[2]?'currentPage':''" v-if="pages[2]"><span>{{pages[2]}}</span></div>
      <div class="pointBox" v-if="!(pages[0] === total || pages[1] === total || pages[2] === total)" @click="pageChange(total)">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="nextPage" v-if="!(page === total)" @click="pageChange(page + 1)"><span>下一页</span></div>
    </div>

    <div class="ui modal productCode" id="productCode">
      <!-- <i class="remove link iconfont icon-guanbi1" @click="disableCode" id="closeIcon"></i> -->
      <!-- <i class="remove link icon" @click="disableCode" id="closeIcon"></i> -->
      <div class="qrcodeBox">
          <div class="productName">
            <span>{{qrcodeName}}</span>
          </div>
          <div class="qrcodeBorder">
            <div id="qrcode"></div>
          </div>
          <div class="imgChange">
            <div class="imgChangeBtn" @click="changeIntoPic">
              <span>保存为图片</span>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from 'src/ajax/ajax.js'
// import Pagination from 'src/components/Pagination.vue'
export default {
  name: 'goods',
  // components: {
  //   Pagination: Pagination
  // },
  data () {
    return {
      productsBuf: [],
      products: [],
      length: 6,
      total: 0,
      page: 1,
      pages: [],
      qrcodeName: null

    }
  },
  watch: {
   
  },
  methods:{
    pageChange(index){
      this.page = index;
      this.fillProduct();
      this.adjustPages();
    },

    adjustPages() {
      if (this.total <= 3) {
        for (var i = 0; i < this.total; i++) {
          this.pages[i] = i + 1; 
        }
      }
      else
      {
        if (this.page < this.total) {
          if (this.page === 1) {
            this.pages = [1,2,3];
          }
          else
          {
            this.pages = [this.page - 1, this.page, this.page + 1];
          }
        }
        else if (this.page === this.total)
        {
          this.pages = [this.page - 2, this.page - 1, this.page];
        }
      }
    },

    fillProduct() {
      this.products = [];
      for (var i = 0; i < this.length; i++) {
        let index = (this.page - 1) * this.length + i;
        if (index < this.productsBuf.length) {
          this.products[i] = this.productsBuf[index];
        }
      }
    },

    getProducts() {
       ajax.getProducerInfo().done((data)=>{
        console.log(data);
        window.localStorage.setItem('producerId',data.data.id)
        this.productsBuf = data.data.goods;
        this.fillProduct();
        this.total = parseInt( ( data.data.goods.length - 1 ) / this.length + 1);
        this.adjustPages();
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
              this.pageChange(this.page)
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
        this.qrcodeName = name;
        $('#qrcode').empty();
        let buf = {
          type: "product",
          url: "http://tongzhuang.moovi-tech.com/index.html#/product_info?id=" + index
        };// JSON.parse();
        buf = JSON.stringify(buf);
        // $('#qrcode').qrcode(buf);
        $("#qrcode").qrcode({ 
            render: "canvas", //canvas方式 另有table方式 
            width: 300, //宽度 
            height: 300, //高度 
            text: buf //任意内容 
        }); 
    },

    changeIntoPic() {
        $("canvas").attr('id',"canvas1");
        let oCanvas = document.getElementById('canvas1');
        let strDataURI = oCanvas.toDataURL();
        console.log(strDataURI);

        function download(href, title) {
            const a = document.createElement('a');
            a.setAttribute('href', href);
            a.setAttribute('download', title);
            a.click();
        }

        download(strDataURI,"产品二维码");
        $("canvas").attr('id',"");
    }
  },

  beforeCreate(){

  },

  created(){

  },

  mounted(){
    this.page = 1;
    this.getProducts();

      $('#qrcode').empty();
    //just for an UI bug
      if(!$('#qrcode').html()){
        $('#qrcode').qrcode("http://tongzhuang.moovi-tech.com/index.html#/product_info?id=");
      }
   //end here

  },

  beforeDestroy() {
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
#addBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #44bfff;
  border-radius: 100px;
  width: 80px;
  height: 30px;
  position: absolute;
  right: 30px;
  cursor: pointer;
  top: 66px;
}

#addBtn span {
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  margin-left: 6px;
}

#addBtn i {
  width: 16px;
  height: 16px;
  color: #ffffff;
}

.tagBox {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.circle {
  background: #ffffff;
  border: 1px solid #44bfff;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  position: absolute;
}

.tagBox span{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  line-height: 22px;
  color: #44bfff;
  margin-left: 16px;
}

.avartaPic {
  width: 58px !important;
  height: 58px !important;
}

/*悬浮窗部分*/
.qrcodeBox {
  background: #f3f3f3;
  border-radius: 10px;
  width: 420px;
  height: 522px;
  padding: 20px 0 0 0;
}
.productName {
  margin-left: 30px;
}
.productName span {
  font-size: 16px;
  line-height: 22px;
  color: #333333;
  font-family: PingFangSC-Regular;
}
.qrcodeBorder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  width: 360px;
  height: 360px;
  margin: 20px 0 0 30px;
}
.imgChange {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 420px;
}
.imgChangeBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #44bfff;
  border-radius: 100px;
  width: 120px;
  height: 40px;
  cursor: pointer;
}
.imgChangeBtn span {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 22px;
  color: #ffffff;
}
/*表格样式*/
.tableCommonFont {
  font-family: PingFangSC-Regular !important;
  font-size: 14px !important;
  line-height: 20px !important;
  color: #777777 !important;
}
table {
  border-color: #f3f3f3 !important;
  margin-bottom: 20px !important;
  position: relative;
  margin-top: 20px !important;
}
.goodName{
  font-family: PingFangSC-Regular !important;
  font-size: 16px !important;
  line-height: 22px !important;
  color: #333333 !important;
}
.editBtn1 {
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #44bfff;
  border-radius: 100px;
  width: 72px;
  height: 26px;
  cursor: pointer;
}
.editBtn1 span{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 20px;
  color: #44bfff;
}

.editBtn2 {
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  background: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 100px;
  width: 72px;
  height: 26px;
  cursor: pointer;
}
.editBtn2 span{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  line-height: 20px;
  color: #999999;
}
.table_left {
  padding-left: 20px !important;
}
/*分页部分*/
.paginationFoot {
  display: flex;
  align-items: center;
  justify-content: center;
}
.paginationFoot span {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 22px;
  color: #999999;
}
.pageBox {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #eeeeee;
  width: 28px;
  height: 28px;
  cursor: pointer;
}
.current_page {
  background: #e3f0f6;
  border: 1px solid #44bfff;
}
.paginationFoot div {
  margin-left: 11px;
}
.frontPage,.nextPage {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #eeeeee;
  width: 73px;
  height: 28px;
  cursor: pointer;
}
.pointBox div{
  background: #999999;
  width: 4px;
  height: 4px;
  border-radius: 100%;
  margin-left: 6px;
}
.pointBox {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.currentPage {
  background: #e3f0f6 !important;
  border: 1px solid #44bfff !important;
}
.currentPage span {
  color: #44bfff !important;
}
</style>
