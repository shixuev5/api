import { createHmac } from 'crypto';
import BaseService from './base';

export default class UserService extends BaseService {
  constructor(ctx) {
    super(ctx, 'User');
  }
  create(payload) {
    payload.salt = payload.salt || this.app.config.keys;
    const hmac = createHmac('sha256', payload.salt);
    hmac.update(payload.password);
    payload.password = hmac.digest('hex');
    return this.db.create(payload);
  }
  async verify({ name, email, password }) {
    const res = await this.db.find(email ? { email } : { name });
    if (!res.length) {
      this.ctx.throw(email ? '邮箱未注册!' : '用户名未注册!');
    }
    const hmac = createHmac('sha256', res[0].salt);
    hmac.update(password);
    if (res[0].password !== hmac.digest('hex')) {
      this.ctx.throw('密码不匹配，请重试!');
    }
    return res[0];
  }
  async groupUsers(_id) {
    const group = await this.app.model.Group.find({
      _id,
      members: {
        _id: this.ctx.state.user._id,
        role: 'owner',
      },
    });

    if (!group.length) {
      this.ctx.throw('只有群组拥有者才允许新增群组成员!');
    }

    return this.db.find({
      _id: {
        $not: group[0].members.map((item) => item._id),
      },
    }).select('-password -salt');
  }
  async projectUsers(_id) {
    const group = await this.app.model.Group.find({
      _id,
      members: {
        _id: this.ctx.state.user._id,
        role: 'owner',
      },
    });

    const project = await this.app.model.Project.find({
      _id,
      members: {
        _id: this.ctx.state.user._id,
        role: 'owner',
      },
    });

    if (!group.length || !project.length) {
      this.ctx.throw('只有群组、项目拥有者才允许新增项目成员!');
    }

    const memberIds = group[0].members
      .map((item) => item._id)
      .concat(project[0].members.map((item) => item._id));

    return this.db.find({
      _id: {
        $not: memberIds,
      },
    }).select('-password -salt');
  }
}
