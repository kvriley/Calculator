var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
  plugins: [new HtmlWebpackPlugin()]
};

module.exports = webpackConfig;