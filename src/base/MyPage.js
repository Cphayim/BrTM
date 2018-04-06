/*
 * 页面基类
 * @Author: Cphayim 
 * @Date: 2018-04-07 00:17:11 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2018-04-07 01:17:34
 */
import { BasePage } from '@minapp/core'
import { errorHandle } from 'base/error-handle';

export class MyPage extends BasePage {

  pageName = 'unknown'

  // 下拉刷新延迟时间（毫秒）
  refreshDelay = 600

  /**
   * 生命周期
   * @memberof MyPage
   */
  onLoad() {
    this._origin()
  }

  /**
   * 原点
   * @desc 进行一些统一的前/后置处理，并对后续操作抛出的异常进行统一处理
   * @param {boolean} [isRefresh=false] 
   * @memberof MyPage
   */
  async _origin(isRefresh = false) {
    try {
      /**
       * 前置处理
       * TODO
       */
      await this._init()
      /**
       * 后置处理
       * TODO
       */
    } catch (error) {
      errorHandle(error)
    }
  }

  /**
   * 初始化页面
   * 在子类中重写该方法调用渲染逻辑
   * @memberof MyPage
   */
  async _init() {

  }

  /**
   * 下拉刷新
   * @memberof MyPage
   */
  onPullDownRefresh() {
    setTimeout(async () => {
      await this._origin(true)
    }, this.refreshDelay)
  }

  /**
   * 事件管理器
   * @desc 对事件进行统一管理和派发，并对后续抛出的异常进行统一处理
   * @param {object} e 
   * @memberof MyPage
   * @example
   * ```html
   * <!-- 节点 -->
   * <view bind:tap="$eM" data-tap="$onBtnTap" data-id="123">
   *    点我
   * </view>
   * ```
   * ```javascript
   * // 方法
   * $onBtnTap(e) {
   *    console.log(e.currentTarget.dataset.id) // '123'
   * }
   * ```
   */
  async $eM(e) {
    try {
      const { type, currentTarget: { dataset } } = e
      const methodName = dataset[type]
      if (!methodName) {
        console.warn(`${this.pageName}: 节点没有设置 data-${type} 属性指定处理 "${type}" 事件的方法名`)
      } else if (typeof this[methodName] !== 'function') {
        console.warn(`${this.pageName}: 实例没有找到 data-${type} 所指定处理 "${type}" 事件的 "${methodName}" 方法.`)
      } else {
        await this[methodName](e)
      }
    } catch (error) {
      errorHandle(error)
    }
  }
}
