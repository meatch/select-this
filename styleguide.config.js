const path = require("path");

module.exports = {
    webpackConfig: {
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                }
            ]
        }
    },
    title: "Select This Docs",
    styleguideDir: "dist-docs",
    moduleAliases: {
        "select-this": path.resolve(__dirname, "src")
    }
};