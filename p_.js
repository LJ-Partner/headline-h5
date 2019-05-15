var path = require('path');
var webpack = require('webpack');
var vue = require('vue-loader');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HandlebarsPlugin = require("handlebars-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
//释放路径
var dist = path.join(__dirname, '../LJweb/Headline_h5/Headline_h5', 'assert', 'dist');
//hbs公共资源编译路径

var vue = path.join(__dirname, 'libs',  'vue-v2.1.8.js');
var vueRouter = path.join(__dirname, 'libs', 'vue-router-v2.1.1.js');
var vueResource = path.join(__dirname,'libs','vue-resource.js');
var Frozen = path.join(__dirname,'libs','FrozenUI','css','frozen.css');

function rdom() {
    var rdm = Math.floor(Math.random() * 20 + 1);
    if (rdm < 10) {
        rdm = 'http://cdn' + '0' + rdm.toString() + '.ttpaicdn.com';
    }
    else {
        rdm = 'http://cdn' + rdm.toString() + '.ttpaicdn.com';
    }
    return '';
}
module.exports = {
     entry: {

         main:['babel-polyfill','./main.js']
    },
    output: {
        path: path.resolve(dist),
        filename: 'js/[name].js',
        publicPath: '/assert/dist/'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },{ 
            test: /\.js$/,
            exclude: /node_modules/, 
            loader: 'babel'

        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=10000&name=images/[name].[ext]'
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?name=fonts/[name].[ext]"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?name=fonts/[name].[ext]"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?name=fonts/[name].[ext]"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?name=fonts/[name].[ext]"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?name=svg/[name].[ext]"
        }, {
            test: /\.vue/,
            loader: 'vue'
        }]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract("css"),
            less: ExtractTextPlugin.extract("css!less-loader")
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime','transform-object-rest-spread','babel-polyfill']
    },
    resolve:{
        alias: {
            'vue': vue,
            'vue-router': vueRouter,
            'vue-resource':vueResource,
            'frozen-css':Frozen
        }
        
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new AssetsPlugin({
                filename: 'headline_h5.map.json',
                path: dist,
                prettyPrint: true,
                fullPath: true,
                processOutput: function(assets) {
                    var now = Date.now();
                     
                    for (var i in assets) {
                       
                        for (var j in assets[i]) {
                            
                             assets[i][j] = assets[i][j] + "?v="+now.toString();
                        }

                    }
                    return JSON.stringify(assets);
                }
            }),
        
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            output: {
                comments: false
            },
            mangle: {
                except: ['$', 'exports', 'require']
            }
        })
    ]
}
