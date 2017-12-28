var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

// module.exports
var config = {
    entry: ['babel-polyfill', './app/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: 'babel-loader'
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        //   historyApiFallback: true,
        proxy: {
            "**": "http://192.168.99.100:1337"
        }
    },
    plugins: [new HtmlWebpackPlugin({template: 'app/index.html'})]
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    }), new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
