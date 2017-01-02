const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let plugins = [];

if(global.webpack.development) {
    plugins = [
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
    ];
}

module.exports = [{
    test    : /\.(webm|cur|gif)$/,
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
}, {
    test    : /\.jsx?$/,
    include : [
        resolve(global.webpack.context, 'src', 'client')
    ],
    loader  : 'babel',
    query   : {
        sourceMaps      : global.webpack.development,
        cacheDirectory  : global.webpack.development,
        presets         : [
            'react',
            'latest'
        ],
        plugins         : [
            'transform-class-properties',
            'transform-decorators-legacy',
            'transform-object-rest-spread',
            ...plugins
        ]
    }
}];
