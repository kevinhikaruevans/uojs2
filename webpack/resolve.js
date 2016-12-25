const { resolve } = require('path');

module.exports = {
    modules : [
        resolve(global.webpack.context, 'src'),
        'node_modules'
    ],
    alias : {
        component   : resolve(global.webpack.context, 'src', 'client', 'components'),
        page        : resolve(global.webpack.context, 'src', 'client', 'pages'),
        core        : resolve(global.webpack.context, 'src', 'client', 'core'),
        datapack    : resolve(global.webpack.context, 'src', 'client', 'datapack'),
        package     : resolve(global.webpack.context, 'src', 'client', 'packages'),
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
