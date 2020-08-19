const path = require("path");

module.exports = {
  mode: "development",
  entry: "./server/index.ts",
  module: {
    rules: [
      { test: /\.ts?$/, loader: "ts-loader" },
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    publicPath: "./",
    path: path.resolve(__dirname, "dist/server"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  target: "node",
};
