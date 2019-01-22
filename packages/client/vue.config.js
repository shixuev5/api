const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const path = require("path");

module.exports = {
  outputDir: "../../static",
  chainWebpack: config => {
    config.resolve.alias.set("$root", path.join(__dirname, "../../"));
    config.plugin("monaco").use(MonacoWebpackPlugin, [
      {
        languages: ["javascript", "json", "markdown", "yaml"]
      }
    ]);
    config.plugin("compress").use(CompressionWebpackPlugin, [
      {
        test: /\.(js|css)$/,
        cache: true,
        threshold: 8192
      }
    ]);
  },
  devServer: {
    proxy: "http://localhost:7001"
  }
};
