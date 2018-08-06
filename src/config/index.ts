/**
 * Created by Cphayim at 2018-07-27 16:22
 * => /src/config/index.ts
 */
const env = process.env.NODE_ENV
const isDev = env === 'development'
const schema = isDev ? 'http://' : 'https://'

export default {
  CLIENT: {
    // 模式
    MODE: env,
    // 客户端版本
    VERSION: '0.0.1',
    APPID: 'wx561b09146fe96582',
    // 是否启动时清除缓存，只在 MODE 为 development 时有效
    CLEAN: true
  },
  SERVER: {
    HOST: schema + isDev ? 'local.api.cphayim.top' : 'api.cphayim.top'
  }
}
