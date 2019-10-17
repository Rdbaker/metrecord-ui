const WebpackChunkHash = require('webpack-chunk-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const common = require('./base.config.js');

module.exports = merge(common, {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'deploys/app.[chunkhash].js',
    sourceMapFilename: 'deploys/app.[chunkhash].js.map',
    publicPath: '/',
  },
  plugins: [
    new WebpackChunkHash({
      additionalHashContent: () => {
        return new Date().toString()
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '..', 'dist', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],

});
