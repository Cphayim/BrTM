/*
 * 字符串操作助手函数
 * @Author: Cphayim 
 * @Date: 2018-03-21 15:30:21 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2018-04-04 00:49:01
 */

/**
 * 去掉首尾空格
 * @params {any} str 
 */
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 转为连字符字符串
 * @param {string} str 
 */
export function hyphenate(str) {
  const reg = /([^-])([A-Z])/g
  return str.replace(reg, '$1-$2').replace(reg, '$1-$2').toLowerCase()
}