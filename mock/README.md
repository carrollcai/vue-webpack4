### 前端模拟后端数据

> mock数据是前端不变的需求。那怎么才能轻松的本地模拟后端数据。本文通过在npm start的起一个mock服务，前端可通过http请求的方式，获取模拟的json文件的内容。最关键的是，mock可以模拟和后端一样的接口路径，最终只需要改域名地址，就可以实现前端模拟接口和后端接口的无缝切换。本文以vue为例子，讲解前后端如何交互。

#### 原理
利用express起一个服务（端口3618），通过`glob`库获取`json文件`的内容，添加到`apiContArr`数组中，同时用`fs.watchFile`实现文件的监听，最后通过express里的`res.json`函数将json内容以json格式传输给前台。

#### 代码

- 前端代码
> 通过`axios`这个库，实现restful风格的请求
```js
import axios from 'axios';

const fetch = (url, params, method) => {
  return new Promise((resolve, reject) => {
    let ajx;
    if (method === 'get') {
      ajx = axios.get(url, params);
    } else if (method === 'delete') {
      ajx = axios.delete(url, params);
    } else if (method === 'put') {
      ajx = axios.put(url, params);
    } else {
      ajx = axios.post(url, params);
    }
    ajx.then(res => {
      if (res.code === 1) {
        reject(res);
      } else {
        resolve(res);
      }
    }).catch((err) => {
      if (err) return err;
    });
  });
};

const development = 'http://localhost:3618';
const API = (url, method) => params => fetch(development + url, params, method);

// 调用getDemoAPI即可请求数据
export default {
  getDemoAPI: API('/demo', 'post');
};
```
- 后端代码
> json内容读取和实时监听文件变化
```js
const path = require('path');
const fs = require('fs');
const app = require('express')();
const mock = require('mockjs');
const glob = require('glob');

// 存放所有api内容
let apiContArr = []; 

async function init() {
  const apiPath = path.join(__dirname, './*.json');
  let apiPathArr = await getPath(apiPath);
  await getApis();

  // 监听JSON文件的变化
  apiPathArr.forEach(async val => {
    await fs.watchFile(val, curr => {
      console.log('API is updated.', curr.mtime);
      getApis();
    });
  });

  // 将json里的内容添加到apiContArr当中
  function getApis() {
    apiPathArr.forEach(async val => {
      await fs.readFile(val, 'utf-8', (err, cont) => {
        if (err) throw err;
        if (!cont) throw 'content must exsit.';

        apiContArr.push(JSON.parse(cont));
      });
    });
  };
};

init();
```

> 通过请求的url发送相关报文
```js
app.use((req, res) => {
  let data;
  let delay = 0;
  apiContArr.forEach(val => {
    val.forEach(reqData => {
      if (reqData.regexp) {
        if (!new RegExp(reqData.url).test(req.originalUrl)) {
          return false;
        }
      } else if (req.originalUrl.indexOf(reqData.url) !== 0) {
        return false;
      }

      let apiRes = reqData.res;
      data = reqData.mock ? mock.mock(apiRes) : apiRes;
      delay = reqData.delay || 0;
      return true;
    });
  });

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  data !== undefined ? setTimeout(() => res.json(data), delay) : res.sendStatus(404);
});

app.listen('3618', () => {
  console.info('Mock server is listening at 3618');
});
```

> 辅助函数
```js
// 获取某一目录下所有文件名
function getPath(path, options = {}) {
  return new Promise((resolve, reject) => {
    glob(path, options, (er, files) => {
      if (er) {
        reject(er);
      } else {
        resolve(files);
      }
    });
  });
};
```

> 在package.json中添加mock服务。
```js
{
  "name": "vue-common-template",
  "version": "1.0.0",
  "description": "common template",
  "author": "carroll",
  "scripts": {
    "start": "npm run mock | npm run dev",
    "mock": "node mock/app.js"
  }
}
```

#### 呈现效果


#### 地址
我通过vue-cli搭建了一个vue开箱即用的模板，其中实现了mock功能，[https://github.com/carrollcai/vue-template]()。

======
当然这个mock还有很多不完善的地方，但是本地调试基本够用。如果错误请指出，谢谢。


// https://zhidao.baidu.com/question/305838709.html 省份链接