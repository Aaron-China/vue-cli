import * as types from './mutation-types'

const mutations = {
  // 显示弹窗
  [types.SET_ALERT_FLAG](state, data) {
    state.alertFlag = data
  },
  // 设置弹窗内容
  [types.SET_ALERT_DETAIL](state, data) {
    Object.assign(state.alertData, data)
  },
  [types.ON_HTTP_ERROR](state, payload) {
    state.httpError = payload
  },
  // 设置提示弹层
  [types.SET_TIP_INFOR](state, data) {
    state.tip = data
  }
}

export default mutations