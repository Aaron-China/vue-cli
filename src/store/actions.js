import * as types from './mutation-types'
import { getTest } from '../server/index.js'

export const getData = function ({commit, state}, {list, index}) {
  commit(types.SET_TIP_INFOR, {tipFlag: false, tipMsg: ''})
}

// dispatch里面直接掉axios，所谓异步，就是自定义函数，自己写axios，实现异步操作，请求成功了，然后commit修改state
export const actionTest = function ({commit, state}, data) {
  getTest({
    url: 'getPhoneCode.php',
    data: JSON.stringify({
      'phone': '18862533985'
    })
  })
  .then(response => {
    console.log(response.data)
    commit(types.SET_ALERT_DETAIL, {title: '提示', content: '您确定要还款吗？'})
    commit(types.SET_ALERT_FLAG, {state: true, type: ''})
  })
}