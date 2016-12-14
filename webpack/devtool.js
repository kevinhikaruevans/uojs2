const config = {
    development : 'inline-source-map',
    production  : false
};

module.exports = config[global.webpack.env];
