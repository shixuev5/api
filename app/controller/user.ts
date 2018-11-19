import { Controller } from 'egg';

export default class UserController extends Controller {
  public async create() {
    const { ctx } = this;
    const user = new ctx.model.User({name: 'yh', pass: 'yh1992816', email: '136393414@qq.com', salt: '123'});
    await user.save();
  }
};
