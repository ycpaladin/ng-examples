const { defineConfig } = require('@vue/cli-service')
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: '/static/app6',
  css: {
    extract: true
  },
  configureWebpack: {
    optimization: {
      runtimeChunk: false
    },
    devtool: 'source-map',
    devServer: {
      port: 4006
    },
    plugins: [
      new WebpackAssetsManifest()
    ]
  }
})
