module.exports = {
    plugins : [
        require('stylelint')({
            configBasedir : global.webpack.context
        }),
        require('postcss-nested')
    ]
};
