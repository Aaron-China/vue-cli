import request from './axios.js'
export function getTest(axiosData) {
  var data = {
    url: '',
    method: 'post',
    data: ''
  }
// 合成请求对象
  Object.assign(data, axiosData)
  return request(data)
}