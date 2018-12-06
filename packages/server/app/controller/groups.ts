import { Controller } from 'egg';

export default class GroupsController extends Controller {
  /* 根据 type 显示分类列表 */
  async index() {
    const { ctx, service } = this;
    const { type, ...args } = ctx.query;
    const groups = await service.group[type ? type : 'find'](args);
    const res = await service.group.countProject(groups);
    ctx.helper.success(res);
  }
  /* 创建群组 */
  async create() {
    const { ctx, service } = this;
    const res = await service.group.create(ctx.request.body);
    ctx.helper.success(res);
  }
  async show() {
    const { ctx, service } = this;
    const res = await service.group
      .findById(ctx.params.id);
    ctx.helper.success(res);
  }
  async update() {
    const { ctx, service } = this;
    await service.group.update(ctx.params.id, ctx.request.body);
    ctx.helper.success(ctx.request.body);
  }
  async remove() {
    const { ctx, service } = this;
    const { _id } = await service.group.remove(ctx.params.id);
    ctx.helper.success({ _id });
  }
  async createMember() {

  }
  async updateMember() {

  }
  async removeMember() {

  }

}
