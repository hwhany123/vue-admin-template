import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/article/',
    method: 'get',
    params
  })
}
export function getDetail(id) {
  return request({
    url: '/api/article/'+id+'/',
    method: 'get'
  })
}
