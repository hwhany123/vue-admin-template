import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import axios from 'axios'

export function getList(params) {
  return request({
    url: '/api/store/',
    method: 'get',
    params
  })
}
export function getDetail(id) {
  return request({
    url: '/api/store/'+id+'/',
    method: 'get'
  })
}
export function postStore(data) {
  return axios.post(
    '/api/store/',
    data,
    {headers: {Authorization: 'Bearer ' + getToken()}},
  )
}
export function putStore(id,data) {
  return axios.put(
    '/api/store/'+id+'/',
    data,
    {headers: {Authorization: 'Bearer ' + getToken()}},
  )
}
export function deleteStore(id) {
  return axios.delete(
    '/api/store/'+id+'/',
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
    '/api/store_avatar/',
    data,
    {headers: {
      Authorization: 'Bearer ' + getToken(),
      'Content-Type': 'multipart/form-data',
      },
    },
  )
}


