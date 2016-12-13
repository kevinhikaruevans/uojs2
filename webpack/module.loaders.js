const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = [{
    test: /\.json$/,
    loader: 'json'
},
{
    test    : /\.webm$/,
    loader  : 'file',
    query   : {
        name : global.webpack.production ? '[hash].[ext]' : '[name].[ext]'
    }
}, {
    test    : /\.pcss$/,
    loader  : ExtractTextPlugin.extract({
        fallbackLoader: 'style',
        loader: [{
            loader  : 'css',
            query   : {
                modules         : true,
                autoprefixer    : global.webpack.production,
                minimize        : global.webpack.production,
                sourceMap       : global.webpack.development,
                localIdentName  : global.webpack.production ? '[hash:hex]' : '[local]-[hash:hex:5]'
            }
        }, {
            loader : 'postcss'
        }]
    }),
    include : [
        resolve(global.webpack.context, 'src', 'client')
    ]
}/*, {
    test    : /\.(png|jpe?g|gif|ico|svg)$/,
    loader  : 'url',
    exclude : [
        resolve(global.webpack.context, 'app', 'pages', 'html'),
    ],
    query   : {
        limit   : 10240,
        emitFile: global.webpack.client
    }
}, {
    test    : /\.(eot|woff|ttf)$/,
    loader  : 'file',
    query   : {
        name : '[name].[hash].[ext]'
    }
}, {
    test    : /\.(webm|mp4)$/,
    loader  : 'file'
}*/];

const config = {
    development : [
        ...common,
        {
            test    : /\.jsx?$/,
            include : [
                resolve(global.webpack.context, 'src', 'client')
            ],
            loader  : 'babel',
            query   : {
                sourceMaps : true,
                // cacheDirectory: global.webpack.development,
                plugins : [
                    'transform-es2015-destructuring',
                    'transform-es2015-modules-commonjs',
                    'transform-class-properties',
                    'transform-react-jsx',
                    'transform-decorators-legacy',
                    [
                        'react-transform',
                        {
                            'transforms': [{
                                'transform' : 'react-transform-hmr',
                                'imports'   : [
                                    'react'
                                ],
                                'locals'    : [
                                    'module'
                                ]
                            }, {
                                'transform' : 'react-transform-catch-errors',
                                'imports'   : [
                                    'react',
                                    'redbox-react'
                                ]
                            }]
                        }
                    ]
                ]
            }
        }],
    production  : [
        ...common, {
        test    : /\.jsx?$/,
        include : [
            resolve(global.webpack.context, 'src', 'client')
        ],
        loader  : 'babel',
        query   : {
            sourceMaps : true,
            cacheDirectory: global.webpack.development,
            presets: [
                'react',
                'latest',
                'stage-2'
            ],
            plugins: [
                'transform-decorators-legacy'
            ]
        }
    }]
};

module.exports = config[global.webpack.env];
