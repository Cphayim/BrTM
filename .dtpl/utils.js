/**
 * Created by Cphayim at 2018-06-10 17:03
 */
const path = require('path')
const os = require('os')
const childProcess = require('child_process')
// ========================================================================
const assetsPath = path.resolve(__dirname, '..', 'src/assets')

/**
 * 返回指定路径(绝对路径)和 assets 目录的相对路径
 * @param {Object} { currentPath, isDirectory }
 * @returns
 */
exports.getAssetsRelativePath = ({ currentPath, isDirectory }) => {
  if (typeof currentPath === 'undefined') throw ReferenceError('需要参数 currentPath')
  // 路径解析
  if (path.parse(currentPath).ext) {
    currentPath = path.parse(currentPath).dir
  }
  // 计算相对路径
  let relativePath = path.relative(currentPath, assetsPath)
  return relativePath.replace(/\\/g, '/')
}

/**
 * 获取当前的 git 用户名
 * 若找不到则返回系统用户名
 * @returns
 */
exports.getGitUsername = () => {
  let username
  try {
    // 获取 git 用户名
    username = childProcess
      .execSync('git config user.name')
      .toString()
      .trim()
    if (!username) {
      throw new Error('未配置 git user')
    }
  } catch (error) {
    // 如果出错（未安装 git 或未配置 git user）则获取系统用户名
    username = os.userInfo().username
  }
  return username
}

exports.camelCase = str => {
  return str.replace(/[-_](\w)/g, camelCaseReplacer)
}

function camelCaseReplacer(r, k) {
  return k.toUpperCase()
}
