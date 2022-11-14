import * as path from 'path';

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === "development";

export default {
  mode: NODE_ENV ? NODE_ENV : "development",
  entry: './src/client/index.tsx',
  target: 'web',
  output: {
    filename: 'client.bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://localhost:8080/',
    sourceMapFilename: "[name].js.map"
  },
  devtool: 'source-map',
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
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ["@babel/preset-react", {"runtime": "automatic"}],
              '@babel/preset-typescript'
            ]
          },
        }
      },
    ]
  },
  devServer: {
    port: 8080,
    hot: IS_DEV,
    open: false,
    historyApiFallback: true,
  },
}