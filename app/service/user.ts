import { Service } from 'egg';

export default class UserService extends Service {
  search({ name = undefined, email = undefined }) {
    return this.app.model.User.find({
      $or: [{name}, {email}],
    });
  }
  signup(payload) {
    return this.app.model.User.create(payload);
  }
  async login(payload) {
    const isEmail = /^.+@.+$/.test(payload.name);
    const res = await this.search(isEmail ? {email: payload.name} : {name: payload.name});
    if (!res.length) {
      this.ctx.throw(payload.name ? '用户名未注册!' : '邮箱未注册!');
    }
    if (res[0].password !== payload.password) {
      this.ctx.throw('密码不匹配，请重试!');
    }
    return res[0];
  }
  info(_id) {
    return this.app.model.User.findById(_id);
  }
};
