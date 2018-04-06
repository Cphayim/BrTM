/*
 * 自定义错误类
 * @Author: Cphayim 
 * @Date: 2018-03-20 15:01:59 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2018-03-22 11:05:39
 */
export default class MyError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
    this.isCustom = true
  }
}