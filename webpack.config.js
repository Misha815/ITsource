const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module:
    {

        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',

                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                parser: {
                    dataUrls: {
                        maxSize: 8 * 1024, // 8kb
                    },
                },
                generator: {
                    filename: '[name].[ext]',
                },
            },


        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/images', to: 'images' },
            ],
        }),
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 8080,

    },
};