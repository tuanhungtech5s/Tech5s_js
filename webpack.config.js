const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        Tech: "./ts/Tech.ts",
        BackToTop: "./ts/BackToTop.ts",
        Form: "./libraries/Form/ts/main.ts",
        Common: "./libraries/Common/ts/main.ts",
        Tech5sMenu: "./libraries/Menu/ts/main.ts",
        Keen: "./libraries/Keen/ts/Keen.ts",
        KeenNavigation: "./libraries/Keen/ts/KeenNavigation.ts",
        KeenFader: "./libraries/Keen/ts/KeenFader.ts",
        KeenLazy: "./libraries/Keen/ts/KeenLazy.ts",
        KeenZoom: "./libraries/Keen/ts/KeenZoom.ts",
        KeenAutoplay: "./libraries/Keen/ts/KeenAutoplay.ts",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    optimization: {
        splitChunks: {
            // include all types of chunks
            chunks: "all",
        },
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        library: "[name]",
        libraryTarget: "var",
    },
};
