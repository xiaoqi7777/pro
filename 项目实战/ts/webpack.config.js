const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    mode:'development',
    entry:'./src/index.tsx',//入口文件
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    },
    devtool:'source-map',
    devServer:{
        hot:true,
        contentBase:path.join(__dirname,'dist'),
        historyApiFallback:true
    },
    resolve:{
        extensions:['.ts','.tsx','.js','.json']
    },
    module:{
        rules:[
            {
                test:/\.tsx?/,
                loader:'ts-loader'
            },
            {
                enforce:'pre',
                test:/\.js?/,
                loader:'source-map-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}