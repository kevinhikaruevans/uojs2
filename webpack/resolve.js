const { resolve } = require('path');

module.exports = {
    modules : [
        resolve(global.webpack.context, 'src'),
        'node_modules'
    ],
    alias : {
        component   : resolve(global.webpack.context, 'src', 'client', 'components'),
        core        : resolve(global.webpack.context, 'src', 'client', 'core'),
        config      : resolve(global.webpack.context, 'configs')
    },
    enforceExtension : false,
    extensions : [
        '.js',
        '.pcss',
        '.json',
        '.jsx'
    ]
};
