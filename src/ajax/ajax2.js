import $ from 'jquery'
const baseurl = "http://tongzhuang.moovi-tech.com"
$.ajaxSetup({
  cache: false,
  traditional: true,
  xhrFields: {
    withCredentials: true
  },
  beforeSend(xhr){

  }
})
export default {
  editArticle(popid, id, title, author, time, text, img, ids, type){
    return $.ajax({
      url: baseurl+'/editArticle',
      type: 'post',
      data: {
        id:popid,
        merchantId: id,
        title: title,
        time:time,
        author:author,
        text:text,
        img:img,
        ids:ids,
        type:type
      }
    })
  },
  //获取后台客户列表
  getUserForPage(start, length){
    return $.ajax({
      url: baseurl+'/getUserForPage',
      type: 'GET',
      data: {
        start: start,
        length: length,
        type:'back'
      }
    })
  },
  //获得推送列表
  getArticleForPage(start, length){
    return $.ajax({
      url: baseurl+'/getArticleForPage',
      type: 'GET',
      data: {
        start: start,
        length: length,
        type:'back'
      }
    })
  },
  //获得后台草稿箱
  getDraft(){
    return $.ajax({
      url: baseurl+'/getDraft',
      type: 'POST',
      data: {
        type:'back'
      }
    })
  },
  //获得具体推送
  getArticle(id){
    return $.ajax({
      url: baseurl+'/getArticle',
      type: 'POST',
      data: {
        id:id
      }
    })
  },
  //删除推送
  deleteArticle(id){
    return $.ajax({
      url: baseurl+'/deleteArticle',
      type: 'POST',
      data: {
        id:id
      }
    })
  },
  //修改密码
  adminChangePassword(opass, npass){
    return $.ajax({
      url: baseurl+'/adminChangePassword',
      type: 'POST',
      data: {
        oPassword:opass,
        nPassword:npass
      }
    })
  },
  //获得订单
  getOrderForPage(start, length, type){
    return $.ajax({
      url: baseurl+'/getOrderForPage',
      type: 'POST',
      data: {
        start:start,
        length:length,
        type:type
      }
    })
  },
  //获得具体订单信息
  getOrder(id){
    return $.ajax({
      url: baseurl+'/getOrder',
      type: 'POST',
      data: {
        id:id
      }
    })
  },
  //修改状态
  editOrderState(id,state){
    return $.ajax({
      url: baseurl+'/editOrderState',
      type: 'POST',
      data: {
        id:id,
        state:state
      }
    })
  }
}