/**
 * index 页面逻辑
 * Create by Cphayim at 2018-03-30 00:18
 */

import {pagify, MyPage, wxp} from 'base/'

@pagify()
export default class extends MyPage {
  data = {

  }

  async onLoad(options) {
    console.log(await wxp.getUserInfo())
  }
}
