import MyError from 'utils/error/MyError';

/**
 * 自定义请求错误类
 * @Author: Cphayim 
 * @Date: 2018-03-20 15:01:59 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2018-04-07 01:26:07
 */
export default class HttpError extends MyError {
  constructor(message, httpStatus, resCode) {
    super(message)
    this.httpStatus = httpStatus
    this.resCode = resCode
  }
}