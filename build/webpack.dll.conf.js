/** 
 * @author carro
 * 实现第三库单独打包压缩，加入hash防止缓存。打包中如果vendor内容没有改变，hash值不变。
 * webpack打包的时候，也会自动剔除dll已打包文件，不需要手动配置externals（排除某些文件的打包）。
 * 每次跟新执行 `yarn run dll`，详情可查看package.json配置
*/
const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
module.exports = {
  entry: {
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      /* element-ui打包的时候有问题，是element-ui不兼容当前vue.esm.js版本，解决方式，应该是指定打包版本  */
      // 'element-ui',
      'axios',
      '@antv/g2',
      '@antv/data-set',
      'moment',
      'vue-clipboard2'
    ]
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: 'dll.[name]_[hash:6].js',
    library: '[name]_[hash:6]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_[hash:6]'
    }),
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: path.join(__dirname, '/')
    })
  ]
};
