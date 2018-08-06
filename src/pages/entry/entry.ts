/**
 * entry 页面逻辑
 * Created by Cphayim at 2018-08-05 03:47
 */

import { pagify, MyPage } from 'base/'

@pagify()
export default class EntryPage extends MyPage {

  readonly pageName = 'entry'
  readonly when: 'load' | 'ready' = 'load'

  // 页面数据
  data = {

  }

  /**
   * 初始化页面逻辑
   * 重写父类的 init()
   * 异步调用栈 onLoad/onReady -> origin -> init
   */
  async init(){
    this.app.$url.index.go()
    return true
  }
}
