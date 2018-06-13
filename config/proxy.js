module.exports = {
  '/esop/*': {
    target: 'http://10.21.20.234',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/esop/': '/esop/'
    }
  }
};
