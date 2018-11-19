const path = require("path");

module.exports = {
  outputDir: 'static',
  chainWebpack: config => {
    config
      .entry("app")
      .clear()
      .add("./client/main.js");
    config.resolve.alias.set("@", path.join(__dirname, "client"));

    config.module
      .rule("gql")
      .include.clear()
      .add(path.join(__dirname, "client"))
      .add(path.join(__dirname, "test/client"))
      .end();
  }
};
