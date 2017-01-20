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
  editArticle(id, title, text, ids, type){
    return $.ajax({
      url: baseurl+'/editArticle',
      type: 'post',
      data: {
        merchantId: id,
        title: title,
        time:1,
        author:1,
        text:text,
        img:1,
        ids:ids,
        type:type
      }
    })
  }
}