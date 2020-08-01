const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

  plugins: [new MiniCssExtractPlugin({
    filename: "[name].[hash].css",
    chunkFilename: "chunks/[id].[hash].css",
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    cache: true,
    hash: true,
    filename: 'index.html'
  })],
  module: {
    rules: [
      {
        test: /\.js$/,

        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.pug$/,
        use: ['html-loader','pug-html-loader']

        
      },
      {
        test: /\.html$/,
        use: ['html-loader']

        
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
        },
      },
    ]
  }
}