module.exports = {
  '/esop/*': {
    target: 'http://10.21.20.234',
    // target: 'http://10.21.20.234:8090',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/esop/': '/esop/'
    }
  },
  '/esop-web-1.0.1/*': {
    target: 'http://10.21.20.234:8080',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/esop-web-1.0.1/': '/esop-web-1.0.1/'
    }
  }
};
