const { resolve } = require('path');

const env = process.argv.indexOf('--production', 2) !== -1;

global.webpack = {
    context     : resolve(__dirname, '..'),
    dir         : __dirname,
    env         : process.env.NODE_ENV || (env ? 'production' : 'development'),
    production  : env,
    development : !env
};

module.exports = {
    context         : global.webpack.context,
    entry           : require('./entry'),
    devtool         : require('./devtool'),
    target          : require('./target'),
    output          : require('./output'),
    module          : {
        // preLoaders  : require('./module.preLoaders'),
        loaders     : require('./module.loaders')
    },
    resolve         : require('./resolve'),
    resolveLoader   : require('./resolveLoader'),
    plugins         : require('./plugins'),
    // postcss         : require('./postcss'),
    devServer       : require(`./devServer/${global.webpack.env}`)
};
