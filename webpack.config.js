/*******************************是否发布/*******************************/
var isRelease = process.env.NODE_ENV === 'production';
/**********************************************************************/
var webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
// var now = +new Date();
var entries = [
  
];
var entryObj = {
  'vuebootstrap' : './src/index.js'
},
webpackPlugins = [],
commonReactJsName = "commonReact",
commonJsName = 'common';
entries.forEach(function (value) {
  //入口JS
  entryObj[value] = ['./asset/business/' + value + '/' + value + '.js'];
  //入口html插件配置
  webpackPlugins.push(
    new HtmlWebpackPlugin({
      //根据模板插入css/js等生成最终HTML
      favicon: './asset/favicon.ico', //favicon存放路径
      filename: value + '.html', //生成的html存放路径，相对于 path
      template: './asset/business/' + value + '/' + value + '.html', //html模板路径
      inject: true, //允许插件修改哪些内容，包括head与body
      chunks: [commonJsName, value],
      minify: false
    })
  );
});
// entryObj["react"] = ['./asset-react/index.js'];
// webpackPlugins.push(
//   new HtmlWebpackPlugin({
//     favicon: './asset/favicon.ico', //favicon存放路径
//     filename: "./react",
//     template: "./asset-react/index.html",
//     inject: true,
//     chunks: [commonReactJsName, "react"],
//     minify: false
//   })
// );
webpackPlugins = webpackPlugins.concat([
  // 启动热替换
  // new webpack.HotModuleReplacementPlugin(),
  new CleanWebpackPlugin(),
  new webpack.IgnorePlugin(/^xhr2$/)
  // new copyWebpackPlugin({
  //   patterns: [
  //     { from: './asset/music', to: './music' }
  //   ]
  // })
])
if (isRelease) {
  webpackPlugins = webpackPlugins.concat([
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    }),
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
  devtool: 'source-map',
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
  entry: entryObj,
  output: {
    path: isRelease ? path.join(__dirname, './asset-release') : path.resolve(__dirname, 'asset-build'),
    filename: '[name].build.js',
    publicPath: '/'
    // chunkFilename : "/common/[name]/[name].[ext]"
  },
  module: {
    rules: [
      {
        test: /(base|bootstrap|antd)\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        // test: /(asset[\\/]business|avalonui|asset[\\/]lib|business[\\/]common).*\.css$/, 
        test: /\.css$/,
        exclude: /(base|bootstrap|antd)\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /asset-react[\\/].*\.js$/,
        use: ['babel-loader']
      },
      // {
      //   test: /(avalonui|lib|business.{1}common).*\.css$/,
      //   use : ['style-loader']
      // },
      // { test: /asset\/lib\/.*\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
      // { test: /asset\/avalon\/.*\.css$/,loader: "style!css"},
      // { test: /\.css$/, loader: 'style!css'},
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
    contentBase: path.join(__dirname, './asset-build'),
    hot: false,
    host: '127.0.0.1',
    open: false
  }
}
