module.exports = {
  '/esop/*':{
    target: 'http://localhost:8090',
    changeOrigin: true,
    pathRewrite: {
      '^/esop': '/'
    },
    secure: false,
  }
};
