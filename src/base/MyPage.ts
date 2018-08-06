/**
 * Created by Cphayim at 2018-07-27 15:23
 * => /src/base/MyPage.ts
 */

import { MobxPage } from '@minapp/mobx'
import { MyStore } from './MyStore'
import { MyApp } from './MyApp'

class BasePage<D = any> extends MobxPage<D, MyStore, MyApp> {}

export class MyPage extends BasePage {
  // 初始化时机
  readonly when: 'load' | 'ready' = 'load'
  isFirst: boolean = true

  onLoad() {
    if (this.when !== 'ready') this.origin()
  }

  onReady() {
    if (this.when === 'ready') this.origin()
  }

  public async origin() {
    // 前置处理
    this.setLoaded(false)
    // ...
    try {
      const result = await this.init()
      if (result) {
        this.setLoaded(true)
        this.isFirst = false
      }
    } catch (error) {
      // 异常处理
    }
    // 后置处理
    // ...
  }

  private setLoaded(loaded: boolean) {
    this.setDataSmart({ loaded })
  }

  protected async init(): Promise<Boolean> {
    return true
  }
}
