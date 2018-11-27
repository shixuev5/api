import { Controller } from 'egg';

export default class UserController extends Controller {
  async search() {
    const { ctx, service } = this;
    const res = await service.user.search(ctx.query);
    ctx.helper.success({ exist: !!res.length });
  }
  async signup() {
    const { ctx, service } = this;
    const { _id } = await service.user.signup(ctx.request.body);
    ctx.helper.success({ _id });
  }
  async login() {
    const { app, ctx, service } = this;
    const { _id } = await service.user.login(ctx.request.body);
    const token = await app.jwt.sign({ _id }, app.config.jwt.secret, {
      expiresIn: '1d',
    });
    ctx.helper.success({ token });
  }
  async info() {
    const { ctx, service } = this;
    const res = await service.user.info(ctx.params.id);
    ctx.helper.success(res);
  }
}
