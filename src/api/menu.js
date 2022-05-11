import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: '/api/member/menu/route',
    method: 'get'
  })
}
