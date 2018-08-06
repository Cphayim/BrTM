/**
 * Created by Cphayim at 2018-07-27 15:23
 * => /src/base/MyStore.ts
 */

import { MobxStore } from '@minapp/mobx'
import { observable } from 'mobx'
import { GlobalStore, BillStore } from 'stores/'

export class MyStore extends MobxStore {
  @observable global = new GlobalStore()
  @observable bill = new BillStore()
}
