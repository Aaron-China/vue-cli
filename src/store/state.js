const state = {
  topList: {},
  msgg: '1231321312',
  alertFlag: {state: false, type: ''},
  errorStatus: '',
  alertData: {title: '警告', content: '这是敏感信息，一旦删除，不可再恢复，确认删除吗', operateOk: '确定', operateCan: '取消', time: ''},
  httpError: {
    hasError: false,
    status: '',
    statusText: ''
  },
  tip: {
    tipFlag: false,
    tipMsg: ''
  }
}

export default state