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
    switch (data.state) {
      case 1:
        xy.toast('操作失败')
        break;
      case 10001:
        xy.toast('系统异常')
        break;
      case 10002:
        xy.toast('文件上传失败')
        break;
      case 10003:
        xy.toast('账号不存在')
        break;
      case 10004:
        xy.toast('用户名已被使用')
        break;
      case 10005:
        xy.toast('密码错误')
        break;
      case 10006:
        xy.toast('登录超时，请重新登录')
        break;
      case 10007:
        xy.toast('商家不存在')
        break;
      case 10008:
        xy.toast('已关注该商家')
        break;
      case 10009:
        xy.toast('积分不足')
        break;
      case 10010:
        xy.toast('商品库存不足')
        break;
      case 10011:
        if(window.localStorage.getItem('usertype') == 'back'){
          router.push({path: '/login'})
        }
        else{
          router.push({path: '/businessLogin'})
        }
        break;
      case 10012:
        xy.toast('图片url过长')
        break;
      default:
        break;
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
  logout(){
    return $.ajax({
      url: baseurl+'/logout',
      type: 'get'
    })
  },
  getCarouselList(){
    return $.ajax({
      url: baseurl + '/getCarouselList',
      type: 'get'
    })
  },
  editCarousel(id,img,productId,order){
    return $.ajax({
      url: baseurl + '/editCarousel',
      type: 'post',
      data: {
        id,img,productId,order
      }
    })
  },
  deleteCarousel(id){
    return $.ajax({
      url: baseurl + '/deleteCarousel',
      type: 'post',
      data: {
        id
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
        start, length, type,
        order: 1
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
        keyWord,
        order: 1
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
  recommendProductOrNot(id){
    return $.ajax({
      url: baseurl+'/recommendProductOrNot',
      type: 'post',
      data: {
        id
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
        start,length,type,
        order: 1
      }
    })
  },
  getBusiness(start,length,type,uId){
    return $.ajax({
      url: baseurl+'/getMerchantForPage',
      type: 'get',
      data: {
        start,length,type,uId,
        order: 1
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
        start,length,type,mId,
        order: 1
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
  getProductInfo(id){
    return $.ajax({
      url: baseurl+'/goods/get',
      type: 'post',
      data: {
        id
      }
    })
  }, 
  deleteProduct(id){
    return $.ajax({
      url: baseurl+'/goods/delete',
      type: 'post',
      data: {
        id
      }
    })
  },
  getProducerInfo(){
    return $.ajax({
      url: baseurl+'/factory/my',
      type: 'post',
      data: {
       
      }
    })
  },
  getProducerList() {
     return $.ajax({
      url: baseurl+'/factory/list',
      type: 'post',
      data: {
       
      }
    })
  },
  getProducerById(id) {
  	return $.ajax({
      url: baseurl+'/factory/get',
      type: 'post',
      data: {
       id
      }
    })
  },
  buildProducer(id,name,address,principal,contact,detail,photo){
    return $.ajax({
      url: baseurl+'/factory/saveOrUpdate',
      type: 'post',
      data: {
       id,name,address,principal,contact,detail,photo
      }
    })
  },
  deleteProducer(id) {
     return $.ajax({
      url: baseurl+'/factory/delete',
      type: 'post',
      data: {
       id
      }
    })
  },
  buildProcuct(id,name,photo,material,detail){
    return $.ajax({
      url: baseurl+'/goods/saveOrUpdate',
      type: 'post',
      data: {
        id,name,photo,material,detail
      }
    })
  },
  getEvaluation(evaluationModel_id,start,rows,orders){
    return $.ajax({
      url: baseurl+'/evaluation/get',
      type: 'post',
      data: {
       evaluationModel_id,start,rows,orders
      }
    })
  },
  producerPsd(oPassword,nPassword){
    return $.ajax({
      url: baseurl+'/factory/changePassword',
      type: 'post',
      data: {
        oPassword,nPassword
      }
    })
  },
}



















