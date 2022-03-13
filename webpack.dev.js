const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin');

// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// import html from "./file.html";

module.exports = {
    entry: "./src/client/index.js",
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                // use: [
                //     {
                //       loader: 'url-loader',
                //       options: {
                //         limit: 8192,
                //       }
                //     },
                //   ],
                type: 'asset/resource',
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: "file-loader",
                options: {
                    name: '[name].[hash:6].[ext]',
                    outputPath: 'images',
                    publicPath: 'images',
                    emitFile: true,
                    esModule: false
                }
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/client/media', to: 'dist' } 
            ]
        }),
    ]

}

