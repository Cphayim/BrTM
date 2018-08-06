/**
 * Created by Cphayim at 2018-08-06 22:03
 * => /src/libs/pullute.ts
 */
import { toJS } from 'mobx'

/**
 * 生成 pagify 装饰器配置项的 mapStoreToData 回调函数
 * @export
 * @param {InjectStoreOptions} options
 */
export function injectStoreHandle(modules: 'all' | string[] = 'all'): (store: any) => any {
  return (store: any) => {
    let data: any = {}
    if (modules === 'all') {
      // 导出所有模块
      data = toJS(store) as any
      if (data.__MOBX__) {
        delete data.constructor
        delete data.__MOBX__
      }
    } else {
      // 导出指定模块
      modules.forEach(name => {
        if (store[name] === undefined) {
          console.warn(`store 实例不存在 ${name} 属性，以忽略`)
          return
        }
        data[name] = toJS(store[name])
      })
    }
    return data
  }
}
