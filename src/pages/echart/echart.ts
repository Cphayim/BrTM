// 此文件是由模板文件 ".dtpl/page/$rawModuleName.ts.dtpl" 生成的，你可以自行修改模板
import { pagify, MyPage } from 'base'
import { initChart, chart } from './initChart'

@pagify()
export default class EchartPage extends MyPage {
  data = {
    ec: {
      onInit: initChart
    }
  }

  onLoad() {
    // console.log(await wxp.getUserInfo())
  }

  onReady() {
    setTimeout(function() {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000)
  }

  protected async _init() {}
}
