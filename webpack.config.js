const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')
require('babel-polyfill')


const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  // resolve alias (Absolute paths)
  resolve: {
    alias: {
      actions: path.resolve(__dirname, 'src/actions/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      components: path.resolve(__dirname, 'src/components/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      helpers: path.resolve(__dirname, 'src/helpers/'),
      api: path.resolve(__dirname, 'src/api/'),
      services: path.resolve(__dirname, 'src/services/'),
    },
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // Css compiler
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // TODO: separate into dev webpack config only!
          'css-loader',
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
      // Scss compiler
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  output: {
    path: __dirname.concat('/public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].vendor.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
  },
}
