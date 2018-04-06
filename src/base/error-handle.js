/*
 * @Author: Cphayim 
 * @Date: 2018-04-07 01:01:53 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2018-04-07 01:09:16
 */

import { modal } from "utils/notice";

/**
 * 全局错误处理函数
 * @export
 * @param {object} error 
 */
export function errorHandle(error) {
  if (!(error instanceof Error)) return
  /**
   * 如果是自定义错误向用户展示错误消息
   * 注：
   * 此处为什么不使用 error instanceof MyError 判断自定义错误?
   * 因为编译为 ES5 后运行上面始终会得到 false，原因暂不明
   */
  const message = error.isCustom ? error.message : '发生未知错误'
  modal.alert({ content: message })

  /**
   * 如果不是自定义错误，向服务器端上报错误堆栈信息
   * (需判断当前是否有网络)
   * TODO
   */
}