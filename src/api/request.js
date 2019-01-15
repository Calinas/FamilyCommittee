import wepy from 'wepy'

export function requestPost(options) {
  const obj = Object.assign({}, {method: 'post'},options)
  return wepy.request(obj)
}

export function requestGet(options) {
  const obj = Object.assign({}, {method: 'get'}, options)
  return wepy.request(obj)
}
