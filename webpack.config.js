var webpack = require('webpack');
var path = require('path');
//var loaders = require('./webpack.loaders');
//var HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "4000";


module.exports = {
    context: path.join(__dirname, 'src/client'),
	entry: [
        `./uojs2.js`,
		`webpack-dev-server/client?http://${HOST}:${PORT}`,
		'webpack/hot/dev-server'
		//`webpack/hot/only-dev-server`
	],
	//devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components|dist)/,
                loader: 'babel',
                query: {
                    "presets": ["react", "react-hmre", "es2015-loose", "stage-1"]
                }
            },
        ]
	},
	devServer: {
		contentBase: "./dist",
		// do not print bundle build stats
		noInfo: true,
		// enable HMR
		hot: true,
        outputPath: path.join(__dirname, 'dist'),
		// embed the webpack-dev-server runtime into the bundle
		//inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	]
};
