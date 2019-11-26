const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/main.tsx",
    output: {
        filename: "[name]-bundle.js",
        path: path.join(__dirname, '/dist'),
        library: "[name]",
    },
    devServer: {
        inline: true,
        port: 8001,
    },

    devtool: "inline-cheap-module-source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "@DataStructures": path.resolve(__dirname, "src/DataStructures"),
        },
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: [/node_modules/, /build/, /__test__/],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: false,
                parallel: false,
                uglifyOptions: {
                    compress: false,
                },
            }),
        ],
    },
};
