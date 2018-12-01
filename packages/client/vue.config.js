const path = require("path");

module.exports = {
  outputDir: "../../static",
  chainWebpack: config => {
    config.resolve.alias.set("$root", path.join(__dirname, "../../"));
  },
  devServer: {
    proxy: "http://localhost:7001"
  }
};
