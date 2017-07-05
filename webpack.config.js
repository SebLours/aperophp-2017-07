var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var express = require('express');

const pageTitle = require(path.resolve('./package.json')).description;
const port = require(path.resolve('./package.json')).config.port;

module.exports = {
    context: path.join(__dirname),
    entry: {
        app: './index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    externals: {
        'Reveal': 'Reveal'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                },
            },
            { test: /\.md$/, loaders: ["html-loader", "markdown-loader"] },
            { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['file-loader'] }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: pageTitle
        }),
    ],
    devServer: {
        port: port,
        setup (app) {
           app.use('/revealjs/', express.static(path.join(__dirname, 'node_modules', 'reveal.js')));
           app.use('/headjs/', express.static(path.join(__dirname, 'node_modules', 'headjs', 'dist', '1.0.0')));
        }
    }
};