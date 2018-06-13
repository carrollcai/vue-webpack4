module.exports = {
  '/esop/*':{
    target: 'http://10.21.24.128:8080',
    // changeOrigin: true,
    secure: false,
    // pathRewrite: {
    //   '^/esop/' : '/esop/'
    // }
  }
};
