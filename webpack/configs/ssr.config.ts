import common from './common.config';
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

export default {
  ...common,
  entry: path.join(__dirname, '../../client/src/ssr.tsx'),
  target: 'node',
  output: {
    path: path.join(__dirname, '../../bundle'),
    filename: 'ssr.client.js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              "@babel/preset-react"
            ]
          },
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  externals: [nodeExternals()]
} as webpack.Configuration;
