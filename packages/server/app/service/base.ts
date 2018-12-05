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
  }

  total() {
    return this.db.estimatedDocumentCount();
  }

  count(conditions = {}) {
    return this.db.countDocuments(conditions);
  }

  async paging({ conditions = {}, page = 0, per_page = 10, sort = 'createdAt', order = 'desc' }) {
    const total = await this.count(conditions);
    const list = await this.db.find(conditions).skip(page * per_page).limit(per_page).sort({
      [sort]: order,
    });
    return {
      total,
      page,
      per_page,
      list,
    };
  }

  find(...args) {
    return this.db.find(...args);
  }

  findAndSort({ sort = 'createdAt', order = 'desc', ...args }) {
    return this.db.find(args).sort({
      [sort]: order,
    });
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
