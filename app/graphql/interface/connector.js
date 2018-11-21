class interfaceConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.proxy = this.ctx.app.model.Interface;
  }
}

module.exports = interfaceConnector;