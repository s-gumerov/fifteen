// const isDev = process.env.NODE_ENV === 'development';

import { join, resolve } from "path";
import webpack from 'webpack';

export default {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
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
        test: /\.mp3$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      window: resolve(join(__dirname, '../mock/window.mock')),
      localStorage: resolve(join(__dirname, '../mock/localStorage.mock')),
      document: resolve(join(__dirname, '../mock/document.mock'))
    }), 
  ],
}
