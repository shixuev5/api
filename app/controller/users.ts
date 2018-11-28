import { Controller } from 'egg';

export default class UsersController extends Controller {
  /* 条件过滤用户 */
  async index() {
    const { ctx, service } = this;
    const res = await service.user.index(ctx.query);
    ctx.helper.success({ exist: !!res.length });
  }
  /* 用户注册 */
  async create() {
    const { ctx, service } = this;
    const { _id } = await service.user.signup(ctx.request.body);
    ctx.helper.success({ _id });
  }
  /* 用户登陆 */
  async login() {
    const { app, ctx, service } = this;
    const { _id } = await service.user.login(ctx.request.body);
    const token = await app.jwt.sign({ _id }, app.config.jwt.secret, {
      expiresIn: '1d',
    });
    ctx.helper.success({ token });
  }
  /* 查询单个用户信息 */
  async show() {
    const { ctx, service } = this;
    const res = await service.user.info(ctx.params.id);
    ctx.helper.success(res);
  }
  /* 局部更新用户信息 */
  async update() {

  }
  /* 删除用户 */
  async remove() {

  }
}
