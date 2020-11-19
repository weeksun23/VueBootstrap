/*******************************是否发布/*******************************/
var isRelease = process.env.NODE_ENV === 'production';
/**********************************************************************/
var webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const rootPath = process.cwd();
const config = require('./config');
// var now = +new Date();
//react 页面注册
var entryObj = {},
  webpackPlugins = [],
  commonJsName = 'common';
webpackPlugins.push(
  new HtmlWebpackPlugin({
    //根据模板插入css/js等生成最终HTML
    favicon: path.join(rootPath, './examples/favicon.ico'),
    //生成的html存放路径，相对于 path
    filename: 'index.html', 
    template: path.join(rootPath, './examples/index.html'),
    //允许插件修改哪些内容，包括head与body
    inject: true, 
    chunks: [commonJsName, 'index'],
    minify: false
  })
);
webpackPlugins = webpackPlugins.concat([
  new MiniCssExtractPlugin({ filename: 'common.css' }),
  // 启动热替换
  // new webpack.HotModuleReplacementPlugin(),
  new CleanWebpackPlugin(),
  new webpack.IgnorePlugin(/^xhr2$/),
  new VueLoaderPlugin()
  // new copyWebpackPlugin({
  //   patterns: [
  //     // { from: './asset/music', to: './music' },
  //     { from: './asset/image', to: './img' },
  //     { from: './asset/file', to: './file' }
  //   ]
  // })
]);
if (isRelease) {
  webpackPlugins = webpackPlugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
// console.log(webpackPlugins);
module.exports = {
  mode: isRelease ? 'production' : 'development',
  optimization: {
    splitChunks: {
      chunks: 'initial',
      automaticNameDelimiter: '.',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1
        }
      }
    },
    runtimeChunk: {
      name: commonJsName
    }
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias
  },
  entry: {
    index : path.join(rootPath, './examples/index.js')
  },
  output: {
    path: isRelease ? path.join(rootPath, './examples-release') : path.resolve(rootPath, 'examples-build'),
    filename: '[name].build.js',
    publicPath: '/'
    // chunkFilename : "/common/[name]/[name].[ext]"
  },
  module: {
    rules: [
      {
        test: /(base|bootstrap|index)\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.css$/,
        exclude: /(base|bootstrap|index)\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        use: ['file-loader?name=fonts/[name].[ext]']
      },
      {
        test: /\.mp3$/,
        use: ['file-loader?name=music/[name].[ext]']
      },
      {
        test: /\.(jpg|png|gif)\??.*$/,
        use: ['url-loader?limit=1&name=img/[name].[ext]']
      }
    ],
  },
  plugins: webpackPlugins,
  devServer: {
    port: 8082,
    contentBase: path.join(rootPath, './examples-build'),
    hot: false,
    host: '127.0.0.1',
    open: false
  }
}
