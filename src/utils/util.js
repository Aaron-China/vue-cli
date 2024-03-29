// 遍历路由，获取左侧主菜单, 精简字段，并按照权限过滤
export const filterMenu = (l, p) => {
  let arr = [];
  for(let i = 0; i < l.length; i++) {
    // 校验权限,权限存储底层路由即可，父级菜单自动通过
    let able = p.some(item => item.path.indexOf(l[i].path) === 0)
    if (!l[i].hidden && able) {
      let obj = {...l[i]};
      delete obj.component
      if (l[i].children && l[i].children.length) {
        obj.children = filterMenu(l[i].children, p)
      }
      arr.push(obj)
    }
  }
  return arr
}

// url传参，处理参数
export function makeQuery (obj = {}) {
  let arr = [], str = '';
  for (let key in obj) {
      if (obj[key] || obj[key] === 0 || obj[key] === false) {
          arr.push(`${key}=${obj[key]}`)
      }
  }
  str = arr.join('&')
  return str ? `?${str}` : ''
}