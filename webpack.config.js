var path = require('path');

// load the web server settings from package.json
const { devServer } = require('./package.json');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
    module: {
        loaders: [
          { test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    },
    // use the webpack dev server to serve up the web application
    devServer,    
  plugins: [new HtmlWebpackPlugin({
    template: path.join(__dirname, './index.ejs')
    ,inject: false
  })]
,
	externals: {
		'ko': 'ko'
  }
};


module.exports = webpackConfig;