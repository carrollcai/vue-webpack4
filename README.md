### esop系统

> 咪咕销售管理系统，主要提供数据统计，信息录入功能，销售统一管理，大区权限分配，角色分配。

### 项目扩展功能

> 基于vue-cli搭建的基础项目，下面为扩展功能

> 集成Mock服务，格式为JSON，支持Restful格式的API，基于MockJs

> 基于axios的接口请求

> 集成Vuex的Demo

> 完善eslint配置

> 用scss管理样式

> 添加git hook，在pre-commit触发eslint校验，20180724

### 项目结构介绍（src）

> actions，vuex处理异步请求

> assets，静态资源

> components，公共组件

> config，静态数据

> router，路由配置

> store，vuex相关文件

> utils，api文件和公共方法

> views，容器组件（以页面为单位的组件）

### 项目开发规范

> .vue文件或者.js文件需要控制在300行以内，超过300行就需要优化或者拆分，除公共方法和配置文件外

> vuex在方法中添加后缀，xxxAction代表是一个action，xxxMutation代表是一个mutation

> 修改vuex中数据都需要通过mutation修改

> 公共组件需要写明功能和入参，尽量使用公共组件，保持样式和功能统一

> 多处使用的静态变量需要放在config文件里

### Build Setup

``` bash

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# pull out common package preview
npm run dll
```
安装遇到问题

1. 设置node-sass源

npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/

2. npm 安装 chromedriver 失败的解决办法

npm install chromedriver@2.27.2 --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver

设置之后，再执行npm install


### 注意点
- 测试环境，node打包的时候，不要用npm安装包，用yarn安装包。因为npm打包的时候，会将dll之前打包内容继续打包进去。原因可能是打包的时候，webpack.DllReferencePluginn没有执行成功。或者应该放在后面执行。

- UI框架是Element-ui，地址，http://element-cn.eleme.io/#/zh-CN/component/installation