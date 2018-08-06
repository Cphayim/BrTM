/**
 * Created by Cphayim at 2018-07-31 22:46
 * => /src/apis/http-request.ts
 */
import { wxp } from 'base'
import config from 'config'

type ReqOptions = {
  /**
   * 请求地址
   * @type {string}
   */
  url: string
  /**
   * 请求方法
   * @type {('GET' | 'POST' | 'PUT' | 'DELETE')}
   */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  /**
   * 请求头
   * @type {Object}
   */
  header?: {
    [propName: string]: string
  }
  /**
   * 发送的数据
   * @type {Object}
   */
  data?: Object
  /**
   * 是否在请求头携带令牌
   * Authorization -> token
   * @type {Boolean}
   */
  token?: Boolean
}

/**
 * 发送 http 请求
 * @export
 * @param {ReqOptions} {
 *   url,
 *   method = 'GET',
 *   header = {},
 *   data = {},
 *   token = false
 * }
 */
export async function httpRequest({
  url,
  method = 'GET',
  header = {},
  data = {},
  token = true
}: ReqOptions) {
  /********************************************/
  if (!/^https?:\/\//.test(url)) {
    url = config.SERVER.HOST + (/^\//.test(url) ? url : '/' + url)
  }
  /********************************************/
  header = Object.assign({ 'Client-Version': config.CLIENT.VERSION }, header)
  token && (header['Authorization'] = wxp.getStorageSync('token'))
  /********************************************/

  try {
    const res = await wxp.request({ url, header })
    if (~~(res.statusCode / 100) === 2) {
      // 2XX
    } else {
      // 异常处理
    }
    // TODO 判断 HTTP 状态码
    // TODO 判断 error_code
  } catch (error) {}
}
httpRequest({ url: '' })
