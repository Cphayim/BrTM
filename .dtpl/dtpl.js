#!/usr/bin/env node
/**
 * Created by Cphayim at 2018-06-09 16:50
 */

const path = require('path')
const utils = require('./utils')
const child = require('child_process')

module.exports = function(source) {
  return {
    // 模板注入
    templates: [
      {
        // 自动注入页面模板
        name: './page',
        matches: () => {
          return source.isDirectory && /^pages?$/.test(source.basicData.dirName)
        },
        inject: () => {
          let { rawModuleName, dirName, dirPath } = source.basicData
          let page = [dirName, rawModuleName, rawModuleName].join('/')

          // 向 app.json 和 base/MyApp.ts 中注入内容
          let appJson = path.resolve(dirPath, '..', 'app.cjson')
          let MyAppTs = path.resolve(dirPath, '..', 'base', 'MyApp.ts')

          return [
            { file: appJson, data: { page: '"' + page + '",' }, tags: 'loose', append: true },
            {
              file: MyAppTs,
              data: { pagesMap: utils.camelCase(rawModuleName) + ': Url' },
              tags: 'loose',
              append: true
            }
          ]
        }
      },
      {
        // 自动注入组件模板
        name: './component/',
        matches: () => {
          child.execSync(`echo ${source.basicData.dirPath} > ~/demo/dtpl`)
          return (
            source.isDirectory &&
            /components(\/|\\)(layout|content|feature)$/.test(source.basicData.dirPath)
          )
        }
      },
      {
        // 自动注入脚本模板
        name: './common/script.$fileExt.dtpl',
        matches: () => {
          return (
            source.isFile &&
            !/(\/|\\)(pages|components)/.test(source.basicData.filePath) &&
            /^\.[jt]s?$/.test(source.basicData.fileExt)
          )
        }
      },
      {
        // 自动注入样式模板
        name: './common/style.$fileExt.dtpl',
        matches: () => {
          return (
            source.isFile &&
            !/(\/|\\)(pages|components)/.test(source.basicData.filePath) &&
            /^\.(css|less|sass|scss|styl(us)?)?$/.test(source.basicData.fileExt)
          )
        }
      }
    ],
    // 模板数据
    globalData: {
      dollar: '$',
      style: 'scss',
      // 项目名称
      projectName: source.basicData.pkg.name,
      // 当前文件(目录) -> src/assets 目录的相对路径（用于自动注入样式文件引用）
      assetsRelativePath: utils.getAssetsRelativePath({
        currentPath: source.basicData.filePath,
        isDirectory: source.isDirectory
      }),
      // 连字符模块名（用于自动注入根样式类名）
      hyphenModuleName: source.basicData.module_name.replace(/_/g, '-'),
      // 地图路径（从项目根目录到文件的路径）
      mapPath: `=> ${source.basicData.filePath
        .replace(source.basicData.rootPath, '')
        .replace(/\\/g, '/')}`,
      // 用户名（从 git 配置中获取）
      username: utils.getGitUsername()
    }
  }
}
