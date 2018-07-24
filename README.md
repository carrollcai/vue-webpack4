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

### Build Setup

``` bash

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```