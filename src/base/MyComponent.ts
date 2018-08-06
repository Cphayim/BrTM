/**
 * Created by Cphayim at 2018-07-27 15:23
 * => /src/base/MyComponent.ts
 */

import { MobxComponent } from '@minapp/mobx'
import { MyStore } from './MyStore'
import { MyApp } from './MyApp'

export class MyComponent<D = any> extends MobxComponent<D, MyStore, MyApp> {

}
