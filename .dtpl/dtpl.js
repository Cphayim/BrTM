const path = require('path');

module.exports = function (source) {
  return {
    templates: [
      {
        // 向 pages/*/ 下注入页面 tpl
        matches: () => {
          return source.isDirectory && /^pages?$/.test(source.basicData.dirName);
        },
        name: './page',
        inject: () => {
          let { rawModuleName, dirName, dirPath } = source.basicData
          let page = [dirName, rawModuleName, rawModuleName].join('/')

          // 向 app.cjson 中注入内容
          let appJson = path.resolve(dirPath, '..', 'app.cjson')

          return [
            { file: appJson, data: { page: "\"" + page + "\"," }, tags: 'loose', append: true }
          ]
        }
      },
      {
        // 向 components/*/*/ 下注入组件 tpl
        matches: () => {
          return source.isDirectory && /\/components\/([-\w]+)$/.test(source.basicData.dirPath);
        },
        name: './component/'
      }
    ],
    globalData: {
      dollar: '$',
      style: 'scss'
    }
  }
}
