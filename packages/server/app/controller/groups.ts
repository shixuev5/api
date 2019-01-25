import { Controller } from 'egg';

export default class GroupsController extends Controller {
  /* 根据 tab 显示分类列表 */
  async index() {
    const { ctx, service } = this;
    const { tab, ...args } = ctx.query;
    let groups;
    if (tab) {
      groups = await service.group[tab](args);
    } else {
      groups = await ctx.app.model.Group.find(args);
    }
    const res = await service.group.countProject(groups);
    ctx.helper.success(res);
  }
  /* 群组名称检查 */
  async check() {
    const { ctx } = this;
    const group = await ctx.app.model.Group.findOne({ name: ctx.query.name });
    ctx.helper.success(group && group._id);
  }
  /* 创建群组 */
  async create() {
    const { ctx, service } = this;
    const res = await service.group.create(ctx.request.body);
    ctx.helper.success(res);
  }
  /* 查询单个群组 */
  async show() {
    const { ctx } = this;
    const res = await ctx.model.Group
      .findById(ctx.params.id);
    ctx.helper.success(res);
  }
  /* 更新群组 */
  async update() {
    const { ctx } = this;
    await ctx.model.Group.update(ctx.params.id, ctx.request.body);
    ctx.helper.success(ctx.request.body);
  }
  /* 删除群组 */
  async remove() {
    const { ctx } = this;
    const { _id } = await ctx.model.Group.findByIdAndRemove(ctx.params.id);
    ctx.helper.success({ _id });
  }
  /* 获取可添加的用户列表 */
  async groupUsers() {
    const { ctx, service } = this;
    const users = await service.group.groupUsers(ctx.params.id, ctx.query);
    ctx.helper.success(users);
  }
  /* 添加群组成员 */
  async createMember() {
    const { ctx, service } = this;
    const groupRole = await service.group.getGroupRole(ctx.params.id);
    if (!Array.isArray(ctx.request.body)) {
      ctx.request.body = [ctx.request.body];
    }
    ctx.request.body.forEach((item) => service.group.checkPermission(groupRole, item.role));
    const res = await service.group.createMember(ctx.params.id, ctx.request.body);
    ctx.helper.success(res);
  }
  /* 更新群组成员 */
  async updateMember() {
    const { ctx, service } = this;
    service.group.checkPermission(await service.group.getGroupRole(ctx.params.id), ctx.request.body.role);
    await service.group.updateMember(ctx.params.id, ctx.params.member_id, ctx.request.body);
    ctx.helper.success(ctx.request.body);
  }
  /* 删除群组成员 */
  async removeMember() {
    const { ctx, service } = this;
    service.group.checkPermission(await service.group.getGroupRole(ctx.params.id), ctx.request.body.role);
    const { _id } = await service.group.removeMember(ctx.params.id, ctx.params.member_id);
    ctx.helper.success({ _id });
  }
}
