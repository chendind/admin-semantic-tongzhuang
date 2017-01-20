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
  }
}



















