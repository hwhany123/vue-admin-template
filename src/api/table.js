import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import axios from 'axios'

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
export function postArticle(data) {
  return axios.post(
    '/api/article/',
    data,
    {headers: {Authorization: 'Bearer ' + getToken()}},
  )
}
export function putArticle(id,data) {
  return axios.put(
    '/api/article/'+id+'/',
    data,
    {headers: {Authorization: 'Bearer ' + getToken()}},
  )
}
export function deleteArticle(id) {
  return axios.delete(
    '/api/article/'+id+'/',
    {headers: {Authorization: 'Bearer ' + getToken()}},
  )
}

export function postComment(data) {
  return axios.post(
    '/api/comment/',
    data,
    {headers: {Authorization: 'Bearer ' + getToken()}},
  )
}


