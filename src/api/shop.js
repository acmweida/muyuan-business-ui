import request from '@/utils/request'

export function getShop() {
  return request({
    url: '/api/member/user/getUserInfo',
    method: 'get'
  })
}

export function createShop(data) {
  return request({
    url: '/api/shop/shop/create',
    method: 'post',
    data: data
  })
}
