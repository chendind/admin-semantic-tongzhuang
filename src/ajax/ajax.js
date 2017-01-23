import $ from 'jquery'
import router from 'src/router.js'
const baseurl = "http://tongzhuang.moovi-tech.com"
$.ajaxSetup({
  cache: false,
  traditional: true,
  xhrFields: {
    withCredentials: true
  },
  beforeSend(xhr){

  },
  success: function(data){
    if(data.state == 1){
      router.push({path: '/login'})
    }
  }
})
export default {
  login(name, password){
    return $.ajax({
      url: baseurl+'/adminLogin',
      type: 'post',
      data: {
        name: name,
        password: password
      }
    })
  },
  getImgForPage(start,length){
    return $.ajax({
      url: baseurl+'/getImgForPage',
      type: 'get',
      data: {
        start, length
      }
    })
  },

  getGoods(start, length,type){
    return $.ajax({
      url: baseurl+'/getProductForPage',
      type: 'get',
      data: {
        start, length, type
      }
    })
  },
  searchGoods(keyWord){
    return $.ajax({
      url: baseurl+'/searchProduct',
      type: 'post',
      data: {
        keyWord
      }
    })
  },
  editGood(id,name,description,score,type,sold,detail,img,state){
    return $.ajax({
      url: baseurl + '/editProduct',
      type: 'post',
      data: {
        id,name,description,score,type,sold,detail,img,state
      }
    })
  },
  upload(file,name,type = 1,img){
    var fd = new FormData();
    fd.append("file",file);
    fd.append("name",name);
    fd.append("type",type);
    fd.append("img",img);
    return $.ajax({
      url: baseurl+'/uploadFile',
      type: 'post',
      data: fd,
      processData: false,
      contentType: false,
      xhrFields: {
          withCredentials: false
      }
    })
  },
  getOrder(start,length,type){
    return $.ajax({
      url: baseurl + '/getOrderForPage',
      type: 'get',
      data: {
        start,length,type
      }
    })
  },
  getBusiness(start,length,type,uId){
    return $.ajax({
      url: baseurl+'/getMerchantForPage',
      type: 'get',
      data: {
        start,length,type,uId
      }
    })
  },
  getBusinessById(id,type){
    return $.ajax({
      url: baseurl+'/getMerchant',
      type: 'post',
      data: {
        id,type
      }
    })
  },
  editBusiness(id,name,headImg,backImg,location,product,phone,introduction,principal){
    return $.ajax({
      url: baseurl+'/editMerchant',
      type: 'post',
      data: {
        id,name,headImg,backImg,location,product,phone,introduction,principal
      }
    })
  },

}



















