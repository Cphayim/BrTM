/******************************************************************
MIT License http://www.opensource.org/licenses/mit-license.php
Author Mora <qiuzhongleiabc@126.com> (https://github.com/qiu8310)
*******************************************************************/

import { appify, MyApp, MyStore } from 'base/'
@appify(new MyStore(), {
  pages: require('./app.cjson?pages'),
  tabBarList: require('./app.cjson?tabBar.list')
})
export default class extends MyApp {
  async onLaunch() {}
}
