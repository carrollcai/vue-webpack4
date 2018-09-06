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
      /* 这里不能使用vue打包，因为vue打包默认的是使用vue.js文件， 基于 UMD 的完整构建，在版本上会和element-ui组件冲突
      * 参考链接 https://forum.vuejs.org/t/vue-warn-attrs-is-readonly/18053/7
      * 用vue打包，最终webpack build的时候，还是会把vue.esm.js（31KB）打包进去。基于 ES Module 的完整构建
      * 用vue.esm.js打包，这里vue.esm.js比正常打包vue多了31kb，等于提前用ES Module构建。所以两者没有区别，打包体积没有任何变化。
      */

      /* 
      * vue2核心文件介绍，主要分为https://mmxiaowu.com/article/58482558d4352863efb55475
      */
      'vue/dist/vue.esm.js',
      /* 
      * time 20180709
      * element-ui放入dll打包，el-tooltip会失效，暂时没找到问题原因，https://segmentfault.com/q/1010000011981465
      *  */
      // 'element-ui',
      'vue-router',
      'vuex',
      'axios',
      '@antv/g2',
      '@antv/data-set',
      'moment'
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
