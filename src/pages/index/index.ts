/**
 * index 页面逻辑
 * Created by Cphayim at 2018-07-26 17:37
 */

import { pagify, MyPage } from 'base/'

@pagify()
export default class IndexPage extends MyPage {

  pageName = 'index'

  data = {

  }

  /**
   * 初始化页面
   * 重写父类的 _init()
   * 异步调用栈 onLoad -> _origin -> _init
   */
  async _init(){

  }
}
