const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const version = require('../package.json').version

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    'vue-async-components': './src/index.js'
  },
  output: {
    path: resolve('dist'),
    filename: `[name]@${version}.js`,
    library: 'vue-async-components',
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: resolve('dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new CleanWebpackPlugin(['dist'],{root: resolve('./')}),
    new HtmlWebpackPlugin({
      title: 'Test',
      template: './index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      '@': resolve('src')
    }
  },
  externals: {
    // ramda: {
    //   commonjs: 'ramda',
    //   commonjs2: 'ramda',
    //   amd: 'ramda',
    //   root: 'R'
    // }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      include: [resolve('src')],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ['file-loader']
    }]
  }
}