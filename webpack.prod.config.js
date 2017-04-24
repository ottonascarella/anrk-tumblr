const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: './js/bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js(x)$/,
                exclude: /node_modules|public/,
                query: {
                    presets: ['es2015']
                }
            }
        ],
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './css/main.css',
            allChunks: true
        })
    ]
};