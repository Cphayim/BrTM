/*
 * Modal
 * @Author: Cphayim 
 * @Date: 2018-03-21 16:11:49 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2018-04-04 15:39:25
 */
import { toast } from "utils/notice/toast.notice";

function _showModal({
  title = '提示',
  content = '提示内容',
  showCancel = true,
  cancelText = '取消',
  cancelColor = '#333',
  confirmText = '确认',
  confirmColor = '#54b4ef'
}) {
  // 隐藏 toast 层
  toast.hide()
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      showCancel,
      cancelText,
      cancelColor,
      confirmText,
      confirmColor,
      // 用户点击确定按钮返回 Promise.resolve(true)
      // 用户点击取消或点击遮罩层(安卓)返回 Promise.reject(false)
      success: res => resolve(res.confirm),
      fail: err => reject(err)
    })
  })
}

export const modal = {
  /**
   * 显示 alert 弹窗
   * @params {object} opts
   * @params {string} opts.title
   * @params {string} opts.content
   * @params {string} opts.confirmText
   * @return 
   */
  async alert({
      title = '提示',
    content = '提示内容',
    confirmText = '确认'
      }) {
    return _showModal({
      title,
      content,
      showCancel: false,
      confirmText
    })
  },

  /**
   * 显示 confirm 弹窗
   * @params {object} opts
   * @params {string} opts.title
   * @params {string} opts.content
   * @params {string} opts.confirmText
   * @params {string} opts.cancelText
   * @return Promise.state
   */
  async confirm({
      title = '提示',
    content = '提示内容',
    confirmText = '确认',
    cancelText = '取消'
    }) {
    return _showModal({
      title,
      content,
      confirmText,
      cancelText
    })
  }
}

