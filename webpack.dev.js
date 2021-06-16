const path = require("path");

module.exports = {
    entry: ["./dist/320.js", "./dist/BackToTop.js", "./dist/Common.js"],
    output: {
        filename: "[name].[contenthash].js", // this line is the only difference
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
};
