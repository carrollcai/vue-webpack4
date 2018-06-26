/** 
 * @author carro
 * 实现第三库单独打包压缩，加入hash防止缓存。打包中如果vendor内容没有改变，hash不变改变。
 * webpack也会自动剔除已打包，不需要手动配置externals。
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
      'element-ui',
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
