import request from '@/utils/request'

// get
export function get(url, params) {
  return request({
    url,
    method: 'get',
    params
  })
}

// post
export function post(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}
