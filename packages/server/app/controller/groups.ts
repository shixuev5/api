import { Controller } from 'egg';

export default class GroupsController extends Controller {
  async index() {
    const { ctx, service } = this;
    const res = await service.group.find(ctx.query);
    ctx.helper.success(res);
  }
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
}
