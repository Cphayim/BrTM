/**
 * Created by Cphayim at 2018-08-03 03:15
 * => /src/libs/notice.ts
 */
import { wxp } from 'base'

namespace Toast {
  export type Options = {
    title: string
    icon?: string
    image?: string
    duration?: number
    mask?: boolean
  }
}

export class Toast {
  static MAX_DURATION = 6000
  /**
   *
   * @static
   * @param {string} title
   * @param {boolean} [mask=true]
   * @memberof Toast
   */
  static loading(title: string, mask = true) {
    Toast.show({ title, mask, icon: 'loading', duration: Toast.MAX_DURATION })
  }

  /**
   *
   * @static
   * @param {string} title
   * @param {number} [duration=2500]
   * @param {boolean} [mask=false]
   * @memberof Toast
   */
  static success(title: string, duration = 2500, mask = false) {
    Toast.show({ title, duration, mask, icon: 'success' })
  }

  /**
   *
   * @static
   * @param {Toast.Options} {
   *     title,
   *     icon = 'none',
   *     image = undefined,
   *     duration = 2500,
   *     mask = false
   *   }
   * @memberof Toast
   */
  static show({
    title,
    icon = 'none',
    image = undefined,
    duration = 2500,
    mask = false
  }: Toast.Options) {
    wxp.showToast({
      title,
      icon,
      image,
      duration,
      mask
    })
  }

  /**
   *
   * @static
   * @memberof Toast
   */
  static hide() {
    wxp.hideToast()
  }
}

export class Modal {
  /**
   * @static
   * @param {*} { title = '提示', content = '提示内容', confirmText = '确认' }
   * @returns
   * @memberof Modal
   */
  static alert({ title = '提示', content = '提示内容', confirmText = '确认' }) {
    return Modal._showModal({
      title,
      content,
      showCancel: false,
      confirmText
    })
  }

  /**
   * @static
   * @param {*} {
   *     title = '提示',
   *     content = '提示内容',
   *     confirmText = '确认',
   *     cancelText = '取消'
   *   }
   * @returns
   * @memberof Modal
   */
  static confirm({
    title = '提示',
    content = '提示内容',
    confirmText = '确认',
    cancelText = '取消'
  }) {
    return Modal._showModal({
      title,
      content,
      confirmText,
      cancelText
    })
  }

  /**
   * @private
   * @static
   * @param {*} {
   *     title = '提示',
   *     content = '提示内容',
   *     showCancel = true,
   *     cancelText = '取消',
   *     cancelColor = '#333',
   *     confirmText = '确认',
   *     confirmColor = '#54b4ef'
   *   }
   * @returns {Promise<boolean>}
   * @memberof Modal
   */
  private static _showModal({
    title = '提示',
    content = '提示内容',
    showCancel = true,
    cancelText = '取消',
    cancelColor = '#333',
    confirmText = '确认',
    confirmColor = '#54b4ef'
  }): Promise<boolean> {
    // 隐藏 toast 层
    Toast.hide()
    return new Promise((resolve, reject) => {
      wxp
        .showModal({
          title,
          content,
          showCancel,
          cancelText,
          cancelColor,
          confirmText,
          confirmColor
        })
        .then(res => res.confirm)
    })
  }
}
