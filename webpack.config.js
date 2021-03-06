const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
var path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },

      {
        test: /\.(gif|jpe?g|png|svg|jpg)$/,
        loader: "url-loader?limit=25000",
        query: {
          limit: 10000,
          name: "static/media/images/[name].[hash:8].[ext]"
        }
      }
    ]
  },

  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,

    proxy: {
      "/": "http://localhost:4000"
    }
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve("./dist/index.html")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
