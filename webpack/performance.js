const config = {
      development : 'warning',
      production  : false
};

module.exports = config[global.webpack.env];
