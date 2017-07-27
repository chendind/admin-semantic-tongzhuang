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
  editArticle(popid,merchantId, title, author, time, text, img, ids, type){
    return $.ajax({
      url: baseurl+'/editArticle',
      type: 'post',
      data: {
        id: popid,
        merchantId,
        title,
        time,
        author,
        text,
        img,
        ids,
        type
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
        type: window.localStorage.getItem('usertype') || 'back',
        mId: window.localStorage.getItem('userid') || 0,
        order: 1
      }
    })
  },
  //获得推送列表
  getArticleForPage(start, length, type){
    return $.ajax({
      url: baseurl+'/getArticleForPage',
      type: 'GET',
      data: {
        start: start,
        length: length,
        type: type,
        order: 1
      }
    })
  },
  //获得后台草稿箱
  getDraft(type){
    return $.ajax({
      url: baseurl+'/getDraft',
      type: 'POST',
      data: {
        type
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
        type:type,
        order:1
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
