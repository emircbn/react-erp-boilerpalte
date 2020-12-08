const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = {
  devtool: "source-map",
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    // The build folder.
    path: path.resolve(__dirname, "dist"),
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: "assets/js/[name].[hash:8].js",
    chunkFilename: "assets/js/[name].[hash:8].chunk.js",
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: "/",
    hotUpdateChunkFilename: "hot/hot-update.js",
    hotUpdateMainFilename: "hot/hot-update.json"
  },
  devServer: {
    contentBase: "./src/index.js",
    compress: true,
    port: 3000, // port number
    historyApiFallback: true,
    quiet: true
  },
  // resolve alias (Absolute paths)
  resolve: {
    alias: {
      Components: path.resolve(__dirname, "src/components/"),
      Containers: path.resolve(__dirname, "src/containers/"),
      Assets: path.resolve(__dirname, "src/assets/"),
      Util: path.resolve(__dirname, "src/util/"),
      Routes: path.resolve(__dirname, "src/routes/"),
      Constants: path.resolve(__dirname, "src/constants/"),
      Redux: path.resolve(__dirname, "src/redux/"),
      Data: path.resolve(__dirname, "src/data/")
    }
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.json$/,
        type: "javascript/auto",
        use: "json-loader"
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "src/assets/img", to: "assets/img" }, { from: "src/assets/fonts", to: "assets/fonts" }
    ]),
    // new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(["dist", "build"], {
      root: __dirname,
      verbose: false,
      dry: false
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.ico"
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[hash:8].css"
    })
  ]
};
