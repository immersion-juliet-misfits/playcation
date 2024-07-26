const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// const Dotenv = require('dotenv-webpack');
require('dotenv').config();

const { NODE_ENV } = process.env;
const isDev = NODE_ENV.includes('dev');

module.exports = {
  // mode: process.env.NODE_ENV,
  mode: isDev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'client/src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'main.js',
  },
  // devTool: 'eval',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {loader: 'babel-loader', options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }},
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({ template: './client/index.html' }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  watch: process.env.NODE_ENV !== 'production' && true,
  watchOptions: {
    ignored: ['node_modules', 'scripts'],
  },
};
