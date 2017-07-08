<template>
  <div>
    <div class="tagBox">
      <div class="circle"></div>
      <span>客户列表</span>
    </div>  
    <router-link :to="{path:'/producer/map'}">
      <div id="mapBtn">
        <span>客户分布</span>
      </div>
    </router-link>

     <table class="ui table">
      <thead>
        <tr>
          <th class="tableCommonFont table_left">头像</th>
          <th class="tableCommonFont">昵称</th>
          <th class="tableCommonFont">评价次数</th>
          <th class="tableCommonFont">关注时间</th>
          <th class="tableCommonFont"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(good,$index) in products">
          <td class="table_left">
            <img class="ui rounded top aligned image avartaPic" :src="good.photo">
          </td>
          <td>
            <span class="tableCommonFont">{{good.name}}</span>
          </td>
          <td>
            <span class="tableCommonFont">{{good.num}}</span>
          </td>
          <td>
            <span class="tableCommonFont">{{good.time}}</span>
          </td>
          <td>
            <router-link :to="{path:'/producer/customerDetail',query:{id:good.id,time:good.time}}" class="ui">
              <div class="editBtn1"><span>查看</span></div>
            </router-link>
          </td>
        </tr>
      </tbody>
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
  </div>
</template>

<script>
import ajax from 'src/ajax/ajax.js'
export default {
  data () {
    return {
      productsBuf: [],
      products: [],
      length: 5,
      total: 0,
      page: 1,
      pages: [],
      qrcodeName: null

    }
  },
  watch: {
   
  },
  methods:{
    //时间戳格式化
    add0(m){return m<10?'0'+m:m },
    getFormTime(shijianchuo)
        {
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
        },

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
       ajax.producerFocusUser().done((data)=>{
        for (var i = 0; i < data.data.length; i++) {
          let buf = {
            id: null,
            photo: null,
            name: null,
            num: null,
            time: null
          }
          buf.id = data.data[i].userId;
          buf.photo = data.data[i].img;
          buf.name = data.data[i].nickName;
          buf.num = data.data[i].evaluationNum;
          buf.time = this.getFormTime(data.data[i].focusTime);
          this.productsBuf.push(buf);
        }
        // this.productsBuf = data.data;
        this.fillProduct();
        this.total = parseInt( (data.data.length - 1 ) / this.length + 1);
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
    }
  },

  beforeCreate(){

  },

  created(){

  },

  mounted(){
    this.page = 1;
    this.getProducts();

  },

  beforeDestroy() {
      
  },
}
</script>

<style scoped>
#mapBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #44bfff;
  border-radius: 100px;
  width: 78px;
  height: 28px;
  position: absolute;
  right: 30px;
  cursor: pointer;
  top: 66px;
}

#mapBtn span {
  font-size: 14px;
  line-height: 20px;
  font-family: PingFangSC-Regular;
  color: #44bfff;
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

/*表格样式*/
.tableCommonFont {
  font-family: PingFangSC-Regular !important;
  font-size: 14px !important;
  line-height: 20px !important;
  color: #777777 !important;
}
table {
  position: relative;
  margin-top: 20px !important;
  border-color: #f3f3f3 !important;
  margin-bottom: 20px !important;
}
.goodName{
  font-family: PingFangSC-Regular !important;
  font-size: 16px !important;
  line-height: 22px !important;
  color: #333333 !important;
}
.editBtn1 {
  margin: 0 auto;
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
.avartaPic {
  width: 60px;
  height: 60px;
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
