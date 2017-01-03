module.exports = {
    maxAssetSize        : 320000,
    maxEntrypointSize   : 10000000,
    hints               : global.webpack.development ? 'warning' : false
};
