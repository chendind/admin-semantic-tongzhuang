import router from 'src/router.js'
const baseurl = window.baseUrl || "http://tongzhuang.moovi-tech.com"
$.ajaxSetup({
  cache: false,
  traditional: true,
  xhrFields: {
    withCredentials: true
  },
  beforeSend(xhr){

  },
  success: function(data){
    if(data.state == 10011){
      if(window.localStorage.getItem('usertype') == 'back'){
        router.push({path: '/login'})
      }
      else{
        router.push({path: '/businessLogin'})
      }
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
  deleteGood(id){
    return $.ajax({
      url: baseurl + '/deleteProduct',
      type: 'post',
      data: {
        id
      }
    })
  },
  getProductById(id,type){
    return $.ajax({
      url: baseurl+'/getProduct',
      type: 'post',
      data: {
        id,type
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
  editBusiness(id,name,headImg,backImg,location,product,phone,code,introduction,principal){
    return $.ajax({
      url: baseurl+'/editMerchant',
      type: 'post',
      data: {
        id,name,headImg,backImg,location,product,phone,code,introduction,principal
      }
    })
  },
  deleteBusiness(id){
    return $.ajax({
      url: baseurl+'/deleteMerchant',
      type: 'post',
      data: {
        id
      }
    })
  },
  getUser(start,length,type,mId){
    return $.ajax({
      url: baseurl+'/getUserForPage',
      type: 'get',
      data: {
        start,length,type,mId
      }
    })
  },
  getUserById(id,type){
    return $.ajax({
      url: baseurl+'/getUser',
      type: 'post',
      data: {
        id,type
      }
    })
  },
}



















