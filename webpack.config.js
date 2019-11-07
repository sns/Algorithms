const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PORT = process.env.PORT || 8001

module.exports = {
    entry: "./main.tsx",
    output: {
        filename: "[name]-bundle.js",
        path: __dirname + "/../dist",
        library: "[name]",
    },
    devServer: {
        inline: true,
        port: PORT,
    },

    devtool: "inline-cheap-module-source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            "@DataStructures": path.resolve(__dirname, "DataStructures"),
        },
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: "true",
                },
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
            template: "./index.html",
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
