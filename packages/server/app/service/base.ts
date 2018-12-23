import { Service } from 'egg';
import { Model } from 'mongoose';

export default class BaseService extends Service {
  db: Model<any, {}>;

  constructor(ctx, name) {
    super(ctx);
    this.db = this.app.model[name];
    this.db.schema.path('createdAt').get((v) => new Date(v).getTime());
    this.db.schema.path('updatedAt').get((v) => new Date(v).getTime());
    this.db.schema.set('toJSON', { getters: true });
    this.db.schema.plugin(require('mongoose-autopopulate'));
  }

  total() {
    return this.db.estimatedDocumentCount();
  }

  count(conditions = {}) {
    return this.db.countDocuments(conditions);
  }
}
