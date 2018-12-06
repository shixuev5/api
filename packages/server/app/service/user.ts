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
    return super.create(payload);
  }
  async verify({ name, email, password }) {
    const res = await this.find(email ? { email } : { name });
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
};
