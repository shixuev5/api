const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require("path");

module.exports = {
  outputDir: "../../static",
  chainWebpack: config => {
    config.resolve.alias.set("$root", path.join(__dirname, "../../"));
    config.plugin('monaco').use(MonacoWebpackPlugin, {
      languages: ['javascript', 'json', 'markdown', 'typescript', 'yaml']
    });
  },
  devServer: {
    proxy: "http://localhost:7001"
  }
};
