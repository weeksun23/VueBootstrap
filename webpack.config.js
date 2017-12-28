//webpack.config.js
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var pageCss = new ExtractTextPlugin('[name].css');
var commonCSS = new ExtractTextPlugin('common.css');
// var businessPublicCss = new ExtractTextPlugin("[name].css");
var copyWebpackPlugin = require('copy-webpack-plugin');
var entries = ["index",'test'];
//是否发布
var isRelease = process.env.NODE_ENV === 'production';
var entryObj = {},
  webpackPlugins = [];
entries.forEach(function(value){
  //入口JS
  entryObj[value] = ["./asset/page/"+value+"/"+value+".js"];
  //入口html插件配置
  webpackPlugins.push(new HtmlWebpackPlugin({//根据模板插入css/js等生成最终HTML
    favicon:'./asset/favicon.ico', //favicon存放路径
    filename: value + '.html',    //生成的html存放路径，相对于 path
    template:'./asset/page/'+value+'/'+value+'.html',    //html模板路径
    inject:true,    //允许插件修改哪些内容，包括head与body
    chunks:['vuebootstrap.js',value],
    minify : false
  }));
});
webpackPlugins = webpackPlugins.concat([
  commonCSS,
  pageCss,
   // 启动热替换
  new webpack.HotModuleReplacementPlugin(),
  new CleanPlugin(['release',"build"]),
  new webpack.IgnorePlugin(/^xhr2$/),
  new CommonsChunkPlugin("vuebootstrap.js"),
  new copyWebpackPlugin([
    { from: './asset/page/_components/tree/data.json',to : './treedata.json'}
  ])
]);
if(isRelease){
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
  ]);
}
module.exports = {
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  // devtool: 'source-map',
  entry:  entryObj,
  output: {
    path : isRelease ? "./release" : "./build",
    filename : "[name].js"
    // chunkFilename : "/common/[name]/[name].[ext]"
  },
  module: {
    loaders: [
      { test : /(bootstrap)\.css$/,loader : commonCSS.extract('style', 'css')},
      { test : /(index|demo)\.css$/,loader : pageCss.extract('style', 'css')},
      { test: /vuebootstrap.*\.css$/, loader: "style!css"},
      // { test: /asset\/avalon\/.*\.css$/,loader: "style!css"},
      // { test: /\.css$/, loader: 'style!css'},
      { test: /\.html$/,loader : 'html',query : {minimize : false}},
      { test : /\.(woff|svg|eot|ttf)\??.*$/,loader:"url",query:{limit : 1,name : "fonts/[name].[ext]"}},
      { test : /\.(jpg|png|gif)\??.*$/,loader:"url",query:{limit : 1,name : "image/[name].[ext]"}},
      { test : /\.json$/,loader : "url",query:{limit : 1,name : "[name].json"}}
    ]
  },
  plugins : webpackPlugins,
  devServer : {
    disableHostCheck: true,
    port: 8083,
    // contentBase: './asset-release',
    hot: true,
    host : "0.0.0.0",
    historyApiFallback: true,
    publicPath: "",
    stats: {
      colors: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
};