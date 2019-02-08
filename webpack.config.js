const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  // resolve alias (Absolute paths)
  resolve: {
    alias: {
      pages: path.resolve(__dirname, 'src/pages/'),
    },
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: __dirname.concat('/public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './public',
    hot: true,
  },
}
