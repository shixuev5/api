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

  async paging({ num = 0, size = 10, sort = { createdAt: 'desc' }}) {
    const total = await this.total();
    const list = await this.db.find({}).skip(num * size).limit(size).sort(sort);
    return {
      total,
      num,
      size,
      list,
    };
  }

  find(...args) {
    return this.db.find(...args);
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
