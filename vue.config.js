const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost', // 项目运行的ip
    port: 8082, // 项目运行的端口号
  },
  publicPath: './'
})
