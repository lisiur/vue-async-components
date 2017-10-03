const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(common, {
  entry: {
    test: './test/index.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: resolve('dist'),
    compress: true,
    port: 9000
  }
})