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
  getGoods(start, length,type){
    return $.ajax({
      url: baseurl+'/getProductForPage',
      type: 'get',
      data: {
        start, length, type
      }
    })
  }
}
