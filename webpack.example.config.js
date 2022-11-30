
const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const resolve = (src) => path.join(__dirname, src);

module.exports = {
  mode: 'development',
  entry: resolve('./example/index.tsx'),
  output: {
    clean: true,
    filename: '[name].js',
  },
  devServer: {
    watchFiles: '../dist',
    host: '0.0.0.0',
    port: 8888,
    open: true,
    historyApiFallback: true,
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{
          loader: "ts-loader",
          options: { allowTsInNodeModules: true }
        }]
      }, {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: [
          'ts-loader'
        ]
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      }, {
        test: /\.scss$/,
        exclude: /.module.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      }, {
        test: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                getLocalIdent: getCSSModuleLocalIdent
              }
            }
          },
          'sass-loader'
        ]
      }, {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': resolve('./src'),
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('./example/index.html'),
      inject: true,
      minify: {
        collapseInlineTagWhitespace: true
      },
    })
  ]
};
