const path = require("path");
module.exports = {
    devtool: "source-map",
    context: path.resolve(__dirname),
    entry: {
        main: path.resolve(__dirname, "./src/main.ts")
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: "ts-loader",
                }],
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader'
                    },
                    'sass-loader?sourceMap'
                ]
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
        modules: [
            "node_modules",
        ],
        mainFields: ['browser', 'module', 'main']
    },
    node: {
        fs: 'empty',
        child_process: "empty"
    }
};
