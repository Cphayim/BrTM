/**
 * Created by Cphayim at 2018-08-06 21:23
 * => /src/store/bill.ts
 */

import { observable, action } from 'mobx'

export class BillStore {
  @observable billList: number[] = []

  @action.bound
  add() {
    this.billList.push(Math.random())
  }
}
