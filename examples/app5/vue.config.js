const { defineConfig } = require('@vue/cli-service')

const WebpackAssetsManifest = require('webpack-assets-manifest');


module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/static/app5',
  css: {
    extract: true
  },
  configureWebpack: {
    optimization: {
      runtimeChunk: false
    },
    devtool: 'source-map',
    devServer: {
      port: 4005
    },
    plugins: [
      new WebpackAssetsManifest()
    ]
  }
})
