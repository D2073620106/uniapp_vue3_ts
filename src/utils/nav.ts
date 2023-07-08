// type urlType = 'navigateBack' | 'redirectTo' | 'reLaunch' | 'switchTab' | 'navigateTo'

/**
 * 解析路径
 * @param {*} url ':back' | 'redirect:' | 'reLaunch:' | 'switch:'
 */
export function parse(url: string): [keyof UniApp.Uni, string] {
  let urlSplit = url.split(':')
  // console.log(urlSplit);
  if (urlSplit.length > 1) {
    if (urlSplit[1] === 'back') {
      return ['navigateBack', '']
    } else if (urlSplit[0] === 'redirect') {
      return ['redirectTo', urlSplit[1]]
    } else if (urlSplit[0] === 'reLaunch') {
      return ['reLaunch', urlSplit[1]]
    } else if (urlSplit[0] === 'switch') {
      return ['switchTab', urlSplit[1]]
    } else {
      return ['navigateBack', '']
    }
  } else {
    return ['navigateTo', url]
  }
}

/**
 * 路由跳转
 * @param {*} url 跳转地址,不传默认navigateBack
 * @param {*} data 携带的参数
 * @returns
 */
export function nav(url: string, data?: any) {
  let [fun, newUrl] = parse(url)
  let params = ''
  newUrl = newUrl.startsWith('/') ? url : '/' + newUrl
  if (data !== undefined && Object.keys(data).length > 0) {
    params = Object.keys(data).reduce((total, cur) => {
      total += total + cur + '=' + data[cur] + '&'
      return total
    }, '')
    params = params.slice(0, -1)
    newUrl = newUrl + '?' + params
  }
  console.log(newUrl, data);
  return new Promise<void>((reslove, reject) => {
    // (uni as any)[fun] 必须这样子写，否则爆红线
    (uni as any)[fun]({
      url: newUrl,
      fail(e: any) {
        reject(e)
      },
      success() {
        reslove()
      }
    });
  })
}
