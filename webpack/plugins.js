const webpack               = require('webpack');
const ExtractTextPlugin     = require("extract-text-webpack-plugin");
/*
// @TODO: PROD
new webpack.optimize.CommonsChunkPlugin('vendors', '[name]-[chunkhash].js'),
new webpack.optimize.DedupePlugin(),
new webpack.optimize.OccurenceOrderPlugin(),
new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
})

*/

module.exports = [
    new webpack.DefinePlugin({
        __PRODUCTION__          : global.webpack.production,
        __DEVELOPMENT__         : global.webpack.development,
        'process.env.NODE_ENV'  : JSON.stringify(global.webpack.env)
    }),
    new ExtractTextPlugin({
        filename    : '[name]-[contenthash].css',
        allChunks   : true,
        disable     : global.webpack.development
    }),
];
