import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/token/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/huangwenhua/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'api-auth/logout/',
    method: 'post'
  })
}
