import { Controller } from 'egg';

export default class UserController extends Controller {
  async search() {
    const { ctx, service } = this;
    const data = await service.user.search(ctx.query);
    ctx.helper.success({ ctx, data });
  }
  async signup() {
    const { ctx, service } = this;
    const { _id } = await service.user.signup(ctx.request.body);
    ctx.helper.success({ ctx, data: { _id } });
  }
  async login() {
    const { ctx, service } = this;
    const { _id } = await service.user.login(ctx.request.body);
    const token = await ctx.app.jwt.sign({ _id }, ctx.app.config.jwt.secret, {
      expiresIn: '1d',
    });
    ctx.helper.success({ ctx, data: { token } });
  }
}
