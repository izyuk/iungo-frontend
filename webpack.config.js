const HtmlWebPackPlugin = require("html-webpack-plugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
const fontsFileName = `src/static/fonts/[name].[ext]`;
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

module.exports = (env) => {
    const currentPath = path.join(__dirname);
    const basePath = currentPath + '/.env';
    const envPath = basePath + '.' + env.ENVIRONMENT;
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;
    const fileEnv = dotenv.config({ path: finalPath }).parsed;
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});
    return {
        entry: ['babel-polyfill', __dirname + '/src/index.js'],
        output: {
            path: __dirname + "/build/",
            filename: "index.js",
            publicPath: "/"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        },
                    }],
                },
                {
                    test: /\.(css|less|)$/,
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                // modules: true,
                                minimize: true,
                                localIdentName: "[local]___[hash:base64:5]"
                            }
                        },
                        {
                            loader: "less-loader"
                        }
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf|)$/,
                    use: ['file-loader'],
                },
                {
                    test: /\.(pdf|jpg|jpeg|png|gif|svg|ico|)$/,
                    use: [
                        {
                            loader: 'url-loader'
                        },
                    ]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: {minimize: true}
                        }
                    ]
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: "babel-loader"
                        },
                        {
                            loader: "react-svg-loader",
                            options: {
                                jsx: true
                            }
                        }
                    ]
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'build'),
            compress: true,
            historyApiFallback: true,
            port: 9000
        },
        plugins: [
            new HtmlWebPackPlugin({
                favicon: 'src/static/images/favicon.ico',
                template: "./public/index.html",
                filename: "./index.html",
                minify: {
                    collapseWhitespace: true
                }
            }),
            new webpack.DefinePlugin(envKeys)
        ],
        resolve: {
            extensions: ['.js'],
            modules: [
              'node_modules', 
              path.resolve(__dirname + '/src')
            ],
            alias: {
              ['~']: path.resolve(__dirname + '/src')
            }
        }
    }
};
