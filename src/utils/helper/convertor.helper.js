import { wxp } from "@minapp/core";
import { hyphenate } from "./string.helper";

/*
 * 转换器助手函数模块
 * @Author: Cphayim 
 * @Date: 2018-03-28 11:24:23 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2018-04-06 23:14:32
 */



/**
 * 将 rpx 根据当前设备转换为 px
 * @param {number} rpx 
 */
const BASE_WIDTH = 750
export function rpx2px(rpx) {
  if (typeof rpx !== 'number') {
    throw TypeError('rpx2px: 需要一个 number 类型的参数')
  }
  const width = wxp.getSystemInfoSync().windowWidth
  return width / BASE_WIDTH * rpx
}

/**
 * 将对象转换为 Style 字符串
 * @params {Object} styleObj
 */
export function obj2StyleStr(styleObj) {
  let styleStr = ''
  if (styleObj) {
    const keys = Object.keys(styleObj)
    keys.forEach(key =>
      styleStr += `${hyphenate(key)}: ${styleObj[key] ? styleObj[key].toString() : 'none'}; `
    )
  }
  return styleStr
}

/**
 * 对象转为查询字符串
 * @params {Object} data
 * @example
 * ```javascript
 * obj2QueryStr({name:'Cphayim', age: 18})
 * // => 'name=Cphayim&age=18'
 * ```
 */
export function obj2QueryStr(data) {
  let str = ''
  if (!data) return str
  const keys = Object.keys(data)
  for (let key of keys) {
    str += `${key}=${data[key].toString()}&`
  }
  return str.slice(0, -1)
}