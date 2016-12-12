const { resolve } = require('path');
const config = require('./../../configs/development.json');

module.exports = {
    host        : config['dev-server.host'] || '0.0.0.0',
    port        : config['dev-server.port'] || 8080,
    contentBase : resolve(global.webpack.context, 'public'),
/*
    proxy       : [
        ...config['dev-server.proxy']/!*,
        {
            path    : [
                '**',
                '!/!*.webapp',
                '!/icon-*x*.png',
                '!/!*.ico',
                '!/widget.html'
            ],
            target  : `http://${config['server.host']}:${config['server.port']}`
        }*!/
    ],
*/
    hot                 : true,
    inline              : true,
    historyApiFallback  : false,
    compress            : true,
    lazy                : false,
    quiet               : false,
    noInfo              : false,
    stats               : {
        hash        : false,
        version     : false,
        timings     : true,
        assets      : true,
        chunks      : true,
        chunkModules: false,
        modules     : false,
        children    : true,
        cached      : true,
        reasons     : false,
        source      : true,
        errorDetails: true,
        chunkOrigins: true,
        colors      : true
    }
};
