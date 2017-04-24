// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/js/main.js',
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: './public',
        filename: './js/bundle.js'
    },
    devServer: {
        inline: true,
        contentBase: './public',
        port: 8000
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
        rules: [{
            test: /\.scss$/,
            use: [
                {
                    loader: 'style-loader' // creates style nodes from JS strings
                },
                {
                    loader: 'css-loader' // translates CSS into CommonJS
                },
                {
                    loader: 'sass-loader' // compiles Sass to CSS
                }
            ]
        }]
        // rules: [
        //     {
        //         test: /\.scss$/,
        //         use: ExtractTextPlugin.extract({
        //             fallback: 'style-loader',
        //             use: 'css-loader!sass-loader'
        //         })
        //     }
        // ]
    },
    // plugins: [
    //     new ExtractTextPlugin({
    //         filename: 'main.css',
    //         allChunks: true,
    //         publicPath: './public/css'
    //     })
    // ]
};