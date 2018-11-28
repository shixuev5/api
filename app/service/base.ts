import { Service } from 'egg';
import { Model } from 'mongoose';

export default class BaseService extends Service {
  db: Model<any, {}>;

  constructor(ctx, name) {
    super(ctx);
    this.db = this.app.model[name];
  }

  total() {
    return this.db.estimatedDocumentCount();
  }

  count(conditions) {
    return this.db.countDocuments(conditions);
  }

  find(conditions = {}, projection = null, options = {}) {
    return this.db.find(conditions, projection, options);
  }

  findById(_id) {
    return this.db.findById(_id);
  }

  update(_id, payload) {
    return this.db.findByIdAndUpdate(_id, payload);
  }

  remove(_id) {
    return this.db.findByIdAndRemove(_id);
  }
};
