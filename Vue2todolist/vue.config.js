const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: { // 自定义服务配置
    open: true, // 自动打开浏览器
    port: 8081
  },
  transpileDependencies: true,
  lintOnSave: false//自己加的,是程序不会报文件名必须是多字段的错误，不进行语法检查
})
