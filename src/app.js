/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import { appify, wxp, MyApp } from 'base/'

@appify({ pages: require('./app.cjson?pages'), tabBarList: require('./app.cjson?tabBar.list') })
export default class extends MyApp {
  async onLaunch() {
    let { code } = await wxp.login()
    console.log('微信 code %o', code) // 发送 code 到后台换取 openId, sessionKey, unionId
    console.log(wxp.getSystemInfoSync())
  }
}

