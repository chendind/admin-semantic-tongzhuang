import router from 'src/router.js'

const factory = (ajax_) => (url) => {
  var ajax
  if (ajax_ == 'get')
    ajax = $.get
  else
    ajax = $.post

  return Promise.resolve(ajax('http://tongzhuang.moovi-tech.com' + url)).then((res)=>{
    if (res.state == 0 || res.state === undefined) {
      return Promise.resolve(res)
    }
    else if(res.state == 10011){
      if(window.localStorage.getItem('usertype') == 'back'){
        router.push({path: '/login'})
      }
      else{
        router.push({path: '/producerLogin'})
      }
      return Promise.reject(new Error(res.detail))
    }
    else {
      return Promise.reject(new Error(res.detail))
    }
  }).catch((e)=>{
    return Promise.reject(e)
  })
}

const get = factory('get')
const post = factory('post')

export const login = (name, password) => {
  return post('/factory/login' + `?code=${name}&password=${password}`)
}

export const logout = ()=>{
  return post('/logout')
}

export const getMerchant = () => {
  return post('/getMerchant')
}

export const editMerchant = (data) => {
  return post('/editMerchant?' + $.param(JSON.parse(JSON.stringify(data))))
}

export const merchantChangePassword = (pwd, newpwd) => {
  return post(`/merchantChangePassword?oPassword=${pwd}&nPassword=${newpwd}`)
}

export const getUserForPage = (start, id)=>{
  return get(`/getUserForPage?start=${start}&length=10&type=merchant&mId=${id}&order=1`)
}
