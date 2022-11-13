import path from 'path';
import webpack from 'webpack';
import {join, resolve} from 'path';

const nodeExternals = require('webpack-node-externals');
// const CopyWebpackPlugin = require("copy-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === "development";

export default {
  mode: NODE_ENV ? NODE_ENV : "development",
  entry: './src/server/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'server.bundle.js',
    path: path.join(__dirname, 'server-dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // { loader: "style-loader" },
          { loader: "css-modules-typescript-loader"},
          { loader: "css-loader", options: { modules: true } },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|mp3)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      // {
      //   test: /\.tsx$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         '@babel/preset-env',
      //         ["@babel/preset-react", {"runtime": "automatic"}],
      //         '@babel/preset-typescript'
      //       ]
      //     },
      //   }
      // },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },

    ],

  },
  plugins: [
    new webpack.ProvidePlugin({
      window: resolve(join(__dirname, './mock/window.mock')),
      localStorage: resolve(join(__dirname, './mock/localStorage.mock')),
      document: 'global/document',
    }),
  ],
}