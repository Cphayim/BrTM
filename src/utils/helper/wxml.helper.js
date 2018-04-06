/*
 * WXML 节点查询助手函数
 * @Author: Cphayim 
 * @Date: 2018-03-21 11:47:53 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2018-03-26 15:39:48
 */
const defaultOpts = {
  selector: '',
  _this: null,
  multi: false
}

/**
 * @params {Object} opts 配置项
 */
function $_$__$____$__$_$(opts) {
  opts = { ...defaultOpts, ...opts }

  if (!opts.selector || typeof opts.selector !== 'string') {
    throw TypeError('wxml.helper: 选择器节点查询必须传入一个 string 类型的 selector 参数')
  }

  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery()
    // 有传递 _this，将选择器的选取范围更改为自定义组件的上下文
    opts._this && query.in(opts._this)

    const wxml = opts.multi ? query.selectAll(opts.selector) : query.select(opts.selector)
    wxml.boundingClientRect(function (res) {
      resolve(res)
    }).exec()
  })
}

/**
 * 获取单个节点信息
 * @function querySelectorInfo
 * @params {string} selector 选择器名
 * @params {object} [_this]  组件上下文
 * @returns {Promise<any>}
 */
export async function querySelectorInfo(selector, _this = null) {
  return await $_$__$____$__$_$({ selector, _this, multi: false })
}
/**
 * 获取多个节点信息
 * @function querySelectorInfo
 * @params {string} selector 选择器名
 * @params {object} [_this]  组件上下文
 * @return {Promise<any>}
 */
export async function querySelectorInfoAll(selector, _this = null) {
  return await $_$__$____$__$_$({ selector, _this, multi: true })
}