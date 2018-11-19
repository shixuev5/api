const DataLoader = require('dataloader');

class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
  }

  create(args) {
    const user = new this.ctx.app.model.User(args);
    return user.save();
  }

  fetch() {
    return this.ctx.app.model.User.find({});
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  fetchById(id) {
    return this.loader.load(id);
  }
}

module.exports = UserConnector;
