// 字符串转数组
export function stringToArray(s:string) {
  if (!s) return []
  return s.replace('[', '').replace(']', '').split(',')
}

// 字符串数组转数组
export function listStringToArray(list:any[], type:string) {
  let res = list.map(item => {
    item[type] = stringToArray(item[type])
    return {
      ...item
    }
  })
  return res
}

// 节流：触发高频事件时设置延迟调用方法，取消前次调用，每次触发只执行一次。
export function throttle(fn:Function, delay:number) {
  let timer:number
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn();
    }, delay)
  }
}

// 小提示弹框
export function toast(title:string) {
  uni.showToast({
    title,
    icon: 'error',
    duration: 2000
  })
}

