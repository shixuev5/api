class groupConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.proxy = this.ctx.app.model.Group;
  }
}

module.exports = groupConnector;
