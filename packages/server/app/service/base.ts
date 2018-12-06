import { Service } from 'egg';
import { zipObject } from 'lodash';
import { Model } from 'mongoose';

export default class BaseService extends Service {
  db: Model<any, {}>;

  constructor(ctx, name) {
    super(ctx);
    this.db = this.app.model[name];
    this.db.schema.path('createdAt').get((v) => new Date(v).getTime());
    this.db.schema.path('updatedAt').get((v) => new Date(v).getTime());
    this.db.schema.set('toJSON', { getters: true });
  }

  total() {
    return this.db.estimatedDocumentCount();
  }

  count(conditions = {}) {
    return this.db.countDocuments(conditions);
  }

  find({ offset = 0, limit = 10, sort = 'createdAt', order = 'desc', ...args }) {
    const sortArgs = zipObject(sort.split(','), order.split(','));
    return this.db.find(args).skip(offset).limit(limit).sort(sortArgs);
  }

  findById(_id) {
    return this.db.findById(_id);
  }

  create(payload) {
    return this.db.create(payload);
  }

  update(_id, payload) {
    return this.db.findByIdAndUpdate(_id, payload);
  }

  remove(_id) {
    return this.db.findByIdAndRemove(_id);
  }
}
