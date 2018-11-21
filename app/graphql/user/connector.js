const DataLoader = require("dataloader");

class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.proxy = this.ctx.app.model.User;
    this.loader = new DataLoader(this.fetch.bind(this));
  }

  create(args) {
    return this.proxy.create(args);
  }

  fetch(ids) {
    return this.ctx.app.model.User.find({
      id: {
        $in: ids
      }
    });
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  fetchById(id) {
    return this.loader.load(id);
  }

  update(id, args) {
    this.loader.clear(id);
    return this.proxy.findByIdAndUpdate(id, args);
  }

  remove(id) {
    this.loader.clear(id);
    return this.proxy.remove({ id });
  }
}

module.exports = UserConnector;
