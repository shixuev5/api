import { Controller } from 'egg';

export default class UsersController extends Controller {
  /* 条件过滤用户 */
  async index() {
    const { ctx, service } = this;
    let res;
    if (ctx.query.group) {
      res = await service.user.groupUsers(ctx.query.group);
    } else if (ctx.query.project) {
      res = await service.user.projectUsers(ctx.query.project);
    } else {
      res = await ctx.model.User.find(ctx.query).select('-password -salt');
    }
    ctx.helper.success(res);
  }
  /* 检查用户名、邮箱是否已注册 */
  async check() {
    const { ctx } = this;
    const res = await ctx.model.User.find(ctx.query).select('_id');
    ctx.helper.success(res);
  }
  /* 用户注册 */
  async create() {
    const { ctx, service } = this;
    const { _id } = await service.user.create(ctx.request.body);
    ctx.helper.success({ _id });
  }
  /* 用户登陆 生成 token */
  async createToken() {
    const { app, ctx, service } = this;
    const { _id } = await service.user.verify(ctx.request.body);
    const token = await app.jwt.sign({ _id }, app.config.jwt.secret, {
      expiresIn: '1d',
    });
    ctx.helper.success({ token });
  }
  /* 查询单个用户信息 */
  async show() {
    const { ctx } = this;
    const res = await ctx.model.User.findById(ctx.params.id)
      .select('-password -salt');
    ctx.helper.success(res);
  }
  /* 局部更新用户信息 */
  async update() {
    const { ctx } = this;
    await ctx.model.User.update(ctx.params.id, ctx.request.body);
    ctx.helper.success(ctx.request.body);
  }
  /* 删除用户 */
  async remove() {
    const { ctx } = this;
    const { _id } = await ctx.model.User.remove(ctx.params.id);
    ctx.helper.success({ _id });
  }
}
