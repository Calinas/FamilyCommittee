import wepy from 'wepy'

export function requestPost(options) {
  const obj = Object.assign({}, {method: 'post'}, {data: options})
  return wepy.request(obj)
}

export function requestGet(options) {
  const obj = Object.assign({}, {method: 'get'}, {data: options})
  return wepy.request(obj)
}
