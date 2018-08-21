module.exports = {
  '/esop/*': {
    target: 'http://10.21.20.234',
    // target: 'http://10.21.20.234:8090',
    // target: 'http://pt.miguai.top:8115',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/esop/': '/esop/'
    }
  }
};
