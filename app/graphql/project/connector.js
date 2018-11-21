class projectConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.proxy = this.ctx.app.model.Project;
  }
}

module.exports = projectConnector;