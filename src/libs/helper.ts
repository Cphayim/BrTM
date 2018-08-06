/**
 * Created by Cphayim at 2018-08-03 03:17
 * => /src/libs/helper.ts
 */

import { wxp } from 'base'
// ====================================================================================================
/**
 * @export
 * @class StringHelper
 */
export class StringHelper {
  /**
   * 转为连字符字符串
   * @static
   * @param {string} str
   * @returns {string}
   * @memberof StringHelper
   */
  static hyphenate(str: string): string {
    const reg = /([^-])([A-Z])/g
    return str
      .replace(reg, '$1-$2')
      .replace(reg, '$1-$2')
      .toLowerCase()
  }
}
// ===================================================================================================

namespace ConverHelper {
  export type StyleObj = {
    [styleName: string]: string
  }
  export type DataObj = {
    [key: string]: number | string | boolean
  }
}

/**
 * @export
 * @class ConverHelper
 */
export class ConverHelper {
  /**
   * 将 rpx 根据当前设备转换为 px
   * @static
   * @param {number} rpx
   * @returns {number}
   * @memberof ConverHelper
   */
  static rpx2px(rpx: number): number {
    const BASE_WIDTH = 750
    if (typeof rpx !== 'number') {
      throw TypeError('rpx2px: 需要一个 number 类型的参数')
    }
    const width = wxp.getSystemInfoSync().windowWidth
    return (width / BASE_WIDTH) * rpx
  }

  /**
   * 将对象转换为 Style 字符串
   * @static
   * @param {ConverHelper.StyleObj} styleObj
   * @returns {string}
   * @memberof ConverHelper
   */
  static obj2StyleStr(styleObj: ConverHelper.StyleObj): string {
    let styleStr = ''
    if (styleObj) {
      const keys = Object.keys(styleObj)
      keys.forEach(
        key =>
          (styleStr += `${StringHelper.hyphenate(key)}: ${
            styleObj[key] ? styleObj[key].toString() : 'none'
          }; `)
      )
    }
    return styleStr
  }

  /**
   * 对象转为查询字符串
   * @param {ConverHelper.DataObj} data
   * @returns
   * @memberof ConverHelper
   * @example
   * ```javascript
   * obj2QueryStr({name:'Cphayim', age: 18})
   * // => 'name=Cphayim&age=18'
   * ```
   */
  obj2QueryStr(data: ConverHelper.DataObj) {
    let str = ''
    if (!data) return str
    const keys = Object.keys(data)
    for (let key of keys) {
      str += `${key}=${data[key].toString()}&`
    }
    return str.slice(0, -1)
  }
}
// ===================================================================================================

namespace WXMLHelper {
  export type SelectorName = string
}

export class WXMLHelper {
  static querySelector(selectorName: WXMLHelper.SelectorName) {}
  static querySelectorAll(selectorName: WXMLHelper.SelectorName) {}
}

type QueryOpts = {
  selector: string
  _this: any
  multi: boolean
}

const defaultOpts = {
  selector: '',
  _this: null,
  multi: false
}

/**
 * @params {Object} opts 配置项
 */
function $_$__$____$__$_$(opts: QueryOpts) {
  opts = { ...defaultOpts, ...opts }

  if (!opts.selector || typeof opts.selector !== 'string') {
    throw TypeError('wxml.helper: 选择器节点查询必须传入一个 string 类型的 selector 参数')
  }

  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery()
    // 有传递 _this，将选择器的选取范围更改为自定义组件的上下文
    opts._this && query.in(opts._this)

    const wxml = opts.multi ? query.selectAll(opts.selector) : query.select(opts.selector)
    wxml
      .boundingClientRect(function(res: any) {
        resolve(res)
      })
      .exec()
  })
}

/**
 * 获取单个节点信息
 * @function querySelectorInfo
 * @params {string} selector 选择器名
 * @params {object} [_this]  组件上下文
 * @returns {Promise<any>}
 */
export async function querySelectorInfo(selector: string, _this = null) {
  return await $_$__$____$__$_$({ selector, _this, multi: false })
}
/**
 * 获取多个节点信息
 * @function querySelectorInfo
 * @params {string} selector 选择器名
 * @params {object} [_this]  组件上下文
 * @return {Promise<any>}
 */
export async function querySelectorInfoAll(selector: string, _this = null) {
  return await $_$__$____$__$_$({ selector, _this, multi: true })
}
