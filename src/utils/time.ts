/**
 * 计算当前时间和传入日期的差值
 * @param date
 */
export function countDown(date:any) {
  let now = Date.now()
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    throw '请传入时间对象'
  }
  if (date < now) {
    return null
  }
  let diff = (date - now) / 1000
  let day = Math.floor(diff / (60 * 60 * 24))
  let hour = Math.floor((diff - (day * 60 * 60 * 24)) / (60 * 60))
  let minute = Math.floor((diff - (day * 60 * 60 * 24) - (hour * 60 * 60)) / 60)
  let res = ''
  if (day > 0) {
    res += day + '日'
  }
  if (day > 0 || hour > 0) {
    res += hour + '时'
  }
  if (day > 0 || hour > 0 || minute > 0) {
    res += minute + '分'
  }
  return res
}

/**
 * 时间对象转字符串格式，可以自定义格式，默认yyyy-MM-dd HH:mm:ss
 * @param date
 * @param fmt
 */
export function timeToStr(date:Date, fmt:string = 'yyyy-MM-dd HH:mm:ss') {
  if (!date) return ''
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    date = new Date(date)
  }
  const o:any = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
