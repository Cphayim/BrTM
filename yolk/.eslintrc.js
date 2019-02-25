module.exports = {
  extends: ['taro'],
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: 'Taro' }],
    // 必须在换行书写的对象和数组中使用尾逗号
    // 配合 Prettier 根据 ES-lint 规则格式化，防止tpl文件模板注入后的尾逗号被删掉
    'comma-dangle': ['error', 'always-multiline'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx', '.ts'] }]
  },
  parser: 'babel-eslint',
  plugins: ['typescript']
}
