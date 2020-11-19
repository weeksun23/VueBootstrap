const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./config');

module.exports = {
  mode: 'production',
  entry: {
    app : ['./src/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './dist'),
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias
  },
  module: {
    rules: [
      {
        test: /\.css$/,
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
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        use: ['file-loader?name=fonts/[name].[ext]']
      },
      {
        test: /\.(jpg|png|gif)\??.*$/,
        use: ['url-loader?limit=1&name=img/[name].[ext]']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};