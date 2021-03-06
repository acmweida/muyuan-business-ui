import request from '@/utils/request'

// 登录方法
export function login(account, password, code, uuid,type) {
  const data = {
    account,
    password,
    code,
    uuid,
    type
  }
  return request({
    url: '/user/accountLogin',
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/user/captchaImage',
    method: 'get'
  })
}
