const config = {
    development : 'inline-source-map',
    production  : null
};

module.exports = config[global.webpack.env];
