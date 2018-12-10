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
    const user = await this.db.findOne(email ? { email } : { name });
    if (!user) {
      this.ctx.throw(404, email ? '邮箱未注册!' : '用户名未注册!');
    }
    const hmac = createHmac('sha256', user.salt);
    hmac.update(password);
    if (user.password !== hmac.digest('hex')) {
      this.ctx.throw(403, '密码不匹配，请重试!');
    }
    return user;
  }
}
