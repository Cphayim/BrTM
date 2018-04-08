/*
 * 组件基类
 * @Author: Cphayim 
 * @Date: 2018-04-07 00:17:32 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2018-04-08 13:45:59
 */
import { BaseComponent } from '@minapp/core'

export class MyComponent extends BaseComponent {

  componentName = 'unknown'

  /**
   * 生命周期
   * @memberof MyComponent
   */
  onAttached() {
    this._origin()
  }

  /**
   * 原点
   * @desc 进行一些统一的前/后置处理，并捕获后续操作抛出的异常
   * @memberof MyComponent
   */
  async _origin() {
    try {
      await _init()  
    } catch (error) {
      errorHandle(error)
    }
  }

  /**
   * 初始化组件
   * 在子类中重写该方法调用渲染逻辑
   * @memberof MyComponent
   */
  async _init() {

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
        console.warn(`${this.componentName}: 节点没有设置 data-${type} 属性指定处理 "${type}" 事件的方法名`)
      } else if (typeof this[methodName] !== 'function') {
        console.warn(`${this.componentName}: 实例没有找到 data-${type} 所指定处理 "${type}" 事件的 "${methodName}" 方法.`)
      } else {
        await this[methodName](e)
      }
    } catch (error) {
      errorHandle(error)
    }
  }
}
