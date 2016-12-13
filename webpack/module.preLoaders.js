const { resolve } = require('path');

const common = [/*, {
    test    : /\.(png|jpe?g|gif|ico|svg)$/,
    loader  : 'img',
    query   : {
        minimize            : global.webpack.production,
        progressive         : true,
        optimizationLevel   : 5
    }
}*/];

const config = {
    development : [
        ...common
    ],
    production  : [
        ...common
    ]
};

module.exports = config[global.webpack.env];
