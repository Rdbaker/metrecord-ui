const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '..', 'build')
  },
  devServer: {
    contentBase: path.join(__dirname, '..', 'public'),
    compress: true,
    inline: true,
    port: 3200,
    disableHostCheck: true,
    index: path.join(__dirname, '..', 'public', 'index.html'),
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, '..', 'src'),
        exclude: /(node_modules)/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(scss|sass)$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }]
      }
    ]
  },
  resolve: {
    alias: {
      'actions': path.resolve(__dirname, '..', `src/actions`),
      'api': path.resolve(__dirname, '..', `src/api`),
      'audio': path.resolve(__dirname, '..', `src/audio`),
      'components': path.resolve(__dirname, '..', `src/components`),
      'config': path.resolve(__dirname, '..', `src/config`),
      'constants': path.resolve(__dirname, '..', `src/constants`),
      'containers': path.resolve(__dirname, '..', `src/containers`),
      'images': path.resolve(__dirname, '..', `src/images`),
      'modules': path.resolve(__dirname, '..', `src/modules`),
      'utils': path.resolve(__dirname, '..', `src/utils`),
      'views': path.resolve(__dirname, '..', `src/views`),
    }
  }
};
