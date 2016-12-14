const { resolve } = require('path');

module.exports = env => {
    if(!env) {
        env = {};
    }

    global.webpack = {
        context     : resolve(__dirname, '..'),
        dir         : __dirname,
        env         : process.env.NODE_ENV || (env.production ? 'production' : 'development'),
        production  : env.production,
        development : !env.production
    };

    return {
        context         : global.webpack.context,
        entry           : require('./entry'),
        devtool         : require('./devtool'),
        target          : require('./target'),
        output          : require('./output'),
        module          : {
            loaders     : require('./module.loaders')
        },
        resolve         : require('./resolve'),
        resolveLoader   : require('./resolveLoader'),
        plugins         : require('./plugins'),
        devServer       : require(`./devServer/${global.webpack.env}`)
    };
};
