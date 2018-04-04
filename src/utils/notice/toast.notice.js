/*
 * Toast
 * @Author: Cphayim 
 * @Date: 2018-03-21 16:08:28 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2018-04-04 15:39:30
 */

/**
 * 显示等待
 * @params {string} text 显示文字 [default='加载中...']
 */
function loading(text = '加载中...') {
  wx.showToast({
    title: text,
    icon: 'loading',
    duration: 60000,
    mask: true
  })
}
/**
 * 显示成功
 * @params {string} text 显示文字 [default='']
 */
function success(text = '', duration = 3000) {
  wx.showToast({
    title: text,
    icon: 'success',
    duration,
    mask: true
  })
}
/**
 * 显示无图标
 * @params {string} text 显示文字 [default='']
 */
function show(text = '', duration = 3000) {
  wx.showToast({
    title: text,
    icon: 'none',
    duration,
    mask: true
  })
}
/**
 * 隐藏
 */
function hide() {
  wx.hideToast()
}

export const toast = {
  loading,
  success,
  show,
  hide
}