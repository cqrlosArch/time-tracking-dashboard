const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.css', '.scss'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.min.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: true,
    }),
  ],
};
