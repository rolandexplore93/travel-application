const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
// const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin')



module.exports = {
    mode: "production",
    entry: "./src/client/index.js",
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
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset",
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin(),
        new WorkboxPlugin.GenerateSW()
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({}), 
            new CssMinimizerWebpackPlugin(), 
        ],
    },

}