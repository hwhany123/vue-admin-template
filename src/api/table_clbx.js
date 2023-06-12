import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import axios from 'axios'

export function getList(params) {
  return request({
    url: '/api/article_bx/',
    method: 'get',
    params
  })
}
export function getDetail(id) {
  return request({
    url: '/api/article_bx/'+id+'/',
    method: 'get'
  })
}
export function postArticle(data) {
  return axios.post(
    '/api/article_bx/',
    data,
    {headers: {Authorization: 'Bearer ' + getToken()}},
  )
}
export function putArticle(id,data) {
  return axios.put(
    '/api/article_bx/'+id+'/',
    data,
    {headers: {Authorization: 'Bearer ' + getToken()}},
  )
}
export function deleteArticle(id) {
  return axios.delete(
    '/api/article_bx/'+id+'/',
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

export function postImage(data) {
  return axios.post(
    '/api/avatar/',
    data,
    {headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': 'multipart/form-data',
      },
    },
  )
}


