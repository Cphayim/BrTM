/**
 * Created by Cphayim at 2018-07-25 19:31
 * => /src/app.ts
 */

import { appify, MyApp, wxp } from 'base'
import config from 'config'
import store from 'base/MyStore'

@appify(store, {
  pages: require('./app.cjson?pages'),
  tabBarList: require('./app.cjson?tabBar.list')
})
export default class extends MyApp {
  onLaunch() {
    this.init()
  }

  init() {
    this.envPrepare()
  }

  /**
   * 环境准备
   */
  envPrepare() {
    const info = wxp.getSystemInfoSync()
    this.logger(`当前正以 '${config.CLIENT.MODE}' 模式启动`)
      .logger(`appid：${config.CLIENT.APPID}`)
      .logger(`版本：${config.CLIENT.VERSION}`)
      .logger(`运行平台：${info.platform}`)
      .logger(`微信版本：${info.version}`)
      .logger(`基础库版本：${info.SDKVersion}`)

    if (config.CLIENT.MODE === 'development' && config.CLIENT.CLEAN) {
      wxp.clearStorageSync()
    }
  }

  logger(msg: string) {
    console.log(`%c${msg}`, 'color:#6699cc')
    return this
  }
}
