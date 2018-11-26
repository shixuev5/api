const path = require("path");

module.exports = {
  outputDir: 'static',
  chainWebpack: config => {
    config
      .entry("app")
      .clear()
      .add("./client/main.js");
    config.resolve.alias.set("@", path.join(__dirname, "client"));
  },
  devServer: {
    proxy: 'http://localhost:7001'
  }
};
