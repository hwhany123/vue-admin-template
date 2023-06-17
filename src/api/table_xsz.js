import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import axios from 'axios'

export function getList(params) {
  return request({
    url: '/api/article_xsz/',
    method: 'get',
    params
  })
}
export function getPivolt(params) {
  return request({
    url: '/api/article_xsz_pivolt/',
    method: 'get',
    params
  })
}
export function getDetail(id) {
  return request({
    url: '/api/article_xsz/'+id+'/',
    method: 'get'
  })
}
export function postArticle(data) {
  return axios.post(
    '/api/article_xsz/',
    data,
    {headers: {Authorization: 'Bearer ' + getToken()}},
  )
}
export function putArticle(id,data) {
  return axios.put(
    '/api/article_xsz/'+id+'/',
    data,
    {headers: {Authorization: 'Bearer ' + getToken()}},
  )
}
export function deleteArticle(id) {
  return axios.delete(
    '/api/article_xsz/'+id+'/',
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


