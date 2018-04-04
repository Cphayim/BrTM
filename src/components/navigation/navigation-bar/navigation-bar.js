/**
 * navigation-bar 组件逻辑
 * Create by Cphayim at 2018-04-03 23:09
 */
import { MyComponent, comify, wxp } from 'base'
import { toast } from 'utils/notice';
import { obj2StyleStr } from 'utils/helper';

const DEF_TITLE = require('app.cjson?window.navigationBarTitleText')
const systemInfo = wxp.getSystemInfoSync()

/**
 * 注意：
 * 需要模拟一个原生的 navigation-bar
 * 该组件下所有单位为 px
 * 因 scss 中配置了 px2rpx 转换规则，所以样式在 js 中处理
 * 
 * --------------------------
 *     status-bar: 高度不定
 * --------------------------
 *     navigation-bar: 44px
 * --------------------------
 */

@comify()
export default class extends MyComponent {
  /**
   * 组件的属性列表
   */
  properties = {
    // 导航栏标题，默认为小程序名
    title: { type: String, value: DEF_TITLE },
    // 背景色，默认白色
    bgColor: { type: String, value: '#fff' },
    // 状态栏背景色
    statusBgColor: { type: String },
    // 是否添加 border-bottom，默认 false
    hasBorder: { type: Boolean, value: false }
  }

  /**
   * 组件的初始数据
   */
  data = {
    // 系统平台 ['ios' | 'android']
    platform: getPlatFormName(),
    // 组件样式
    componentStyle: '',
    // 状态条样式
    statusBarStyle: '',
    // 导航条样式
    navigationBarStyle: ''
  }

  /**
   * 组件属性值有更新时会调用此函数，不需要在 properties 中设置 observer 函数
   */
  onPropUpdate(prop, newValue, oldValue) {

  }


  onAttached() {
    this._setComponentStyle()
    this._setStatusBarStyle()
    this._setNavigationBarStyle()
  }

  /**
   * 组件样式
   */
  _setComponentStyle() {
    const style = {
      backGroundColor: this.data.bgColor || 'none'
    }
    this.setDataSmart({ componentStyle: obj2StyleStr(style) })
  }

  /**
   * 设置状态栏样式
   */
  _setStatusBarStyle() {
    const style = {
      height: `${systemInfo.statusBarHeight}px`,
      backGroundColor: this.data.statusBgColor || 'none'
    }
    this.setDataSmart({ statusBarStyle: obj2StyleStr(style) })
  }

  /**
   * 设置导航栏组件样式
   */
  _setNavigationBarStyle() {
    const style = {
      height: `44px`,
      fontSize: `18px`
    }
    this.setDataSmart({ navigationBarStyle: obj2StyleStr(style) })
  }
}

/**
 * 获取平台名
 */
function getPlatFormName() {
  const { system } = wxp.getSystemInfoSync()
  let plateFormName = 'ios'
  if (/android/i.test(system)) {
    plateFormName = 'android'
  }
  return plateFormName
}
