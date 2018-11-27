import { createHmac } from 'crypto';
import { Service } from 'egg';

export default class UserService extends Service {
  search({ name = undefined, email = undefined }) {
    return this.app.model.User.find({
      $or: [{name}, {email}],
    });
  }
  signup(payload) {
    payload.salt = payload.salt || this.app.config.keys;
    const hmac = createHmac('sha256', payload.salt);
    hmac.update(payload.password);
    payload.password = hmac.digest('hex');
    return this.app.model.User.create(payload);
  }
  async login(payload) {
    const isEmail = /^.+@.+$/.test(payload.name);
    const res = await this.search(isEmail ? {email: payload.name} : {name: payload.name});
    if (!res.length) {
      this.ctx.throw(isEmail ? '邮箱未注册!' : '用户名未注册!');
    }
    const hmac = createHmac('sha256', res[0].salt);
    hmac.update(payload.password);
    if (res[0].password !== hmac.digest('hex')) {
      this.ctx.throw('密码不匹配，请重试!');
    }
    // 安全问题？
    return res[0];
  }
  info(_id) {
    return this.app.model.User.findById(_id).select({ password: 0, salt: 0 });
  }
};
