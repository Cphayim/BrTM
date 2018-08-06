import { observable, autorun, action } from 'mobx'

/**
 * Created by Cphayim at 2018-08-06 19:35
 * => /src/store/global.ts
 */

export class GlobalStore {
  @observable userInfo: null | wx.getUserInfo.ParamPropSuccessParamPropUserInfo = null
  @observable tabBarSwitch: boolean = true
  @observable number = 0

  constructor() {
    bindAuturun(this)
  }

  @action.bound
  setTabBarSwitch(tabBarSwitch: boolean) {
    this.tabBarSwitch = tabBarSwitch
  }
}

function bindAuturun(store: any) {
  autorun(() => {
    if (store.tabBarSwitch !== false) {
      wx.showTabBar({})
    } else {
      wx.hideTabBar({})
    }
  })
}
