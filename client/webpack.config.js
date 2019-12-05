const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    return {
        entry: {main: './src/index.js'},
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/' + ('[name].[hash].js')
        },
        optimization: {
            moduleIds: 'hashed',
            runtimeChunk: 'single',
            minimize: argv.mode === 'production',
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                })
            ],
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        //devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader',
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development',
                                reloadAll: true,
                            },
                        }, 'css-loader', 'postcss-loader', 'sass-loader']
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true,
                        },
                    }, 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.(png|svg|jpg|gif|ico)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                                publicPath: '../images'
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'fonts',
                                publicPath: '../fonts'
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/style.[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                // hash: true,
                template: './src/index.html',
                filename: 'index.html'
            }),
            new webpack.HotModuleReplacementPlugin(),
            new WebpackMd5Hash()
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            port: 9000,
            open: true,
            historyApiFallback: true,
            hot: true,
            quiet: true,
            clientLogLevel: 'silent'
        }
    }
};