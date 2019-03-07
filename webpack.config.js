var webpack = require('webpack');
var path = require('path');
var WebpackAutoInject = require('webpack-auto-inject-version');

var config = {
    entry: {
        app: [
            './src/wizard.client.module'
        ]
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: /\.css$|\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.html$/,
                loader: 'angular-templatecache-loader?module=wiwi.wizard'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        }),
        new WebpackAutoInject({
            // options
            // example:
            components: {
                AutoIncreaseVersion: false,
                InjectAsComment: true
            },
            InjectAsComment: {
                tag: 'Build version: {version} - {date}', // default
                dateFormat: 'dddd, mmmm dS, yyyy, h:MM:ss TT', // default
                multiLineCommentType: false, // default
            }
        })
    ]
};

module.exports = config;