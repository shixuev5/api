import { Service } from 'egg';

export default class UserService extends Service {
  async search({ name, email }) {
    const res = await this.app.model.User.find({
      $or: [{name}, {email}],
    });
    return { exist: !!res.length };
  }
  signup(payload) {
    return this.app.model.User.create(payload);
  }
  async login(payload) {
    let res;
    if(payload.name) {
      res = await this.app.model.User.findOne({name: payload.name});
    } else {
      res = await this.app.model.User.findOne({email: payload.email});
    }
    if(!res) {
      this.ctx.throw(payload.name ? '用户名未注册!' : '邮箱未注册!');
    }
    if(res.password !== payload.password) {
      this.ctx.throw('密码不匹配，请重试!');
    }
    return res;
  }
};
